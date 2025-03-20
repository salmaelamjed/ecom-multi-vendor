import { createSlice } from "@reduxjs/toolkit";
import actAuthRegister from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";
import { TLoading } from "@/types/shared";
import { isString } from "@/types/guard";

interface IAuthState {
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  } | null;
  accessToken: string | null;
  loading: TLoading;
  error: string | null;
}

const initialState: IAuthState = {
  user: null,
  accessToken: null,
  loading: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUI: (state) => {
      state.loading = "idle";
      state.error = null;
    },
    logoutUser: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(actAuthRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthRegister.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      localStorage.setItem("accessToken", action.payload.accessToken);
    });
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // Login
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      localStorage.setItem("accessToken", action.payload.accessToken);
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { resetUI, logoutUser } = authSlice.actions;
export { actAuthRegister };
export default authSlice.reducer;
