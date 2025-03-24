export interface IAuthState {
  id: number;
  isAuthenticated: boolean;
  nickname?: string;
  token?: string;
  isLoading: boolean;
  error: string | null;
}
