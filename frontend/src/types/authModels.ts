export interface LoginRequest {
  nickname: string;
  password: string;
}

export interface LoginResponse extends StatusInfo {
  id: number;
  nickname: string;
  token: string;
}

export interface RegisterRequest {
  nickname: string;
  password: string;
  email: string;
}

export interface RegisterResponse extends StatusInfo {}

interface StatusInfo {
  status: "success" | "failure";
  error: string | null;
}
