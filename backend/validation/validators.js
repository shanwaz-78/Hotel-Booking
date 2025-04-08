export const validateLoginDetails = (data, res) => {
  const emailValidator = /^\w+\.?\w+[0-9]?(@gmail.com)$/gi;
  const { email, password } = data;
  if (!email || !password) {
    return res.status(400).json({ message: `Please provide all credentials.` });
  }
  const isValidMail = emailValidator.test(email);
  if (!isValidMail) {
    return res.status(400).json({ message: `Please provide valid mail.` });
  }
  return true;
};

export const validateHotelBooking = (data, res) => {
  const { userId, roomId, checkInDate, checkOutDate, guests } = data;

  if (!userId || !roomId || !checkInDate || !checkOutDate || !guests) {
    return res
      .status(400)
      .json({ message: "Please provide all required booking details." });
  }

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
    return res
      .status(400)
      .json({ message: "Invalid check-in or check-out date format." });
  }

  if (checkOut <= checkIn) {
    return res
      .status(400)
      .json({ message: "Check-out date must be after check-in date." });
  }

  if (!Array.isArray(guests) || guests.length === 0) {
    return res
      .status(400)
      .json({ message: "At least one guest must be provided." });
  }

  for (const guest of guests) {
    if (!guest.name || typeof guest.age !== "number" || guest.age < 0) {
      return res
        .status(400)
        .json({ message: "Each guest must have a valid name and age." });
    }
  }

  return true;
};
