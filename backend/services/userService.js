import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const loginService = async (data, res) => {
  try {
    data.password = bcrypt.hash(data.password, process.env.SALT_OF_ROUNDS);
    const createdUser = await prisma.user.create({ data });
    return res
      .status(200)
      .json({ status: true, message: `Login Successfully.`, createdUser });
  } catch (error) {
    console.error(`[Error]: while login user ${error.message}`);
    return res.status(500).json({ message: `Internel Server Error.` });
  }
};

export default { loginService };
