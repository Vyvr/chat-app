import { LoginResponse, RegisterResponse } from "@/types/authModels";

export class AuthApiService {
  private static API_URL = "http://localhost:5000/api/auth";
  public static async login(
    nickname: string,
    password: string
  ): Promise<LoginResponse> {
    console.log("making request....");
    const response = await fetch(`${this.API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname, password }),
    });

    return response.json();
  }

  public static async register(
    nickname: string,
    email: string,
    password: string
  ): Promise<RegisterResponse> {
    const response = await fetch(`${this.API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname, email, password }),
    });

    return response.json();
  }
}
