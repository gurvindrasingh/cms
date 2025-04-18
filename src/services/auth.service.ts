import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { signJwt } from "../utils/jwt";

const prisma = new PrismaClient();

export const signupUser = async ({ name, email, password }: any) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  const token = signJwt({ id: user.id, email: user.email });

  return { user, token };
};

export const loginUser = async ({ email, password }: any) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = signJwt({ id: user.id, email: user.email });

  return { user, token };
};
