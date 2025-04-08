import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const bookHotelService = async (data, res) => {
  const { userId, roomId, checkInDate, checkOutDate, guests } = data;

  try {
    const booking = await prisma.booking.create({
      data: {
        userId: parseInt(userId),
        roomId: parseInt(roomId),
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        guests: {
          create: guests.map((guest) => ({
            name: guest.name,
            age: parseInt(guest.age),
          })),
        },
      },
      include: {
        guests: true,
      },
    });

    res.json({
      message: "Hotel details saved successfully.",
      success: true,
      booking,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getAllHotelService = async (res) => {
  try {
    const allHotels = await prisma.user.findMany({
      include: {
        rooms: true,
      },
    });
    return res.status(200).json({ success: true, hotels: allHotels });
  } catch (error) {
    console.error(`[Error]: ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export default { bookHotelService, getAllHotelService };
