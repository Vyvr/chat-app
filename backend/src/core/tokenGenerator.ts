import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export const generateToken = (user: User): string => {
  const secret = process.env.JWT_SECRET;
  // something is fucking wrong over here. jwt.sign don't let me get value from .env
  const expires = process.env.JWT_EXPIRES_IN
    ? process.env.JWT_EXPIRES_IN
    : "1h";
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not defined.");
  }

  const payload = { userId: user.id, nickname: user.nickname };

  return jwt.sign(payload, secret as string, { expiresIn: "1M" });
};
