import { LoginRequest, RegisterRequest } from "@/types/authModels";
import { AuthApiService } from "@/services/authApiService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "./authSliceTypes";

const initialState: IAuthState = {
  id: 0,
  isAuthenticated: false,
  nickname: undefined,
  token: undefined,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.nickname = undefined;
      state.token = undefined;
      state.isAuthenticated = false;
      sessionStorage.clear();
      localStorage.clear();
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.status === "failure") {
          state.error = action.payload.error;
          state.isAuthenticated = false;
          return;
        }

        state.id = action.payload.id;
        state.nickname = action.payload.nickname;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload.status === "success" ? null : action.payload.error;
      });
  },
});

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: LoginRequest) => {
    const res = await AuthApiService.login(payload.nickname, payload.password);

    return {
      id: res.id,
      nickname: res.nickname,
      token: res.token,
      error: res.error,
      status: res.status,
    };
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload: RegisterRequest) => {
    const res = await AuthApiService.register(
      payload.nickname,
      payload.email,
      payload.password
    );

    return { status: res.status, error: res.error };
  }
);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
