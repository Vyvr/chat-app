import { PrismaClient, User } from "@prisma/client";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "../types/authModels";
import bcrypt from "bcrypt";
import { generateToken } from "../core/tokenGenerator";

const prisma = new PrismaClient();

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const { nickname, password } = data;
  const nicknameLowerCase = nickname.toLowerCase();

  return prisma.user
    .findFirst({
      where: {
        nickname: nicknameLowerCase,
      },
    })
    .then((user: User | null) => {
      if (!user) {
        throw new Error("User not found");
      }

      return bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          throw new Error("Invalid password");
        }

        const token = generateToken(user);

        return {
          id: user.id,
          nickname: user.nickname,
          token,
          status: "success",
          error: null,
        };
      });
    });
};

export const registerUser = async (data: RegisterRequest) => {
  const { nickname, email, password } = data;
  const nicknameLowerCase = nickname.toLowerCase();

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await prisma.user.create({
    data: {
      nickname: nicknameLowerCase,
      email,
      password: hashedPassword,
    },
  });
};
