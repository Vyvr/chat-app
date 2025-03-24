export interface LoginRequest {
  nickname: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  nickname: string;
  token: string;
  status: "success" | "failure";
  error: string | null;
}

export interface RegisterRequest {
  nickname: string;
  password: string;
  email: string;
}

export interface RegisterResponse {
  status: "success" | "failure";
  error: string | null;
}
