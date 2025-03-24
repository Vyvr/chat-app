// src/endpoints/authEndpoints.ts
import { Router, Request, Response } from "express";
import {
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types/authModels";
import { login, registerUser } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/login", async (req, res: Response<LoginResponse>) => {
  try {
    const loginData = await login(req.body);

    res.send(loginData);
  } catch (error) {
    res.status(500).json({
      id: 0,
      nickname: "",
      token: "",
      status: "failure",
      error: (error as Error).message,
    });
  }
});

authRouter.post("/register", async (req, res: Response<RegisterResponse>) => {
  try {
    await registerUser(req.body);

    res.send({ status: "success", error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failure", error: (error as Error).message });
  }
});

export default authRouter;
