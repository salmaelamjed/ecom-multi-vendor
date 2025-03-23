import { createSlice } from "@reduxjs/toolkit";
import actForgotPasswordSendOtp from "./act/actForgotPasswordSendOtp";
import actForgotPasswordVerifyOtp from "./act/actForgotPasswordVerifyOtp";
import actForgotPasswordReset from "./act/actForgotPasswordReset";
import { TLoading } from "@/types/shared";
import { isString } from "@/types/guard";

interface IForgotPasswordState {
  email: string;
  otp: string;
  loading: TLoading;
  error: string | null;
  success: boolean;
}

const initialState: IForgotPasswordState = {
  email: "",
  otp: "",
  loading: "idle",
  error: null,
  success: false,
};

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    resetForgotPasswordUI: (state) => {
      state.loading = "idle";
      state.error = null;
      state.success = false;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updateOtp: (state, action) => {
      state.otp = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Envoyer OTP
    builder.addCase(actForgotPasswordSendOtp.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actForgotPasswordSendOtp.fulfilled, (state) => {
      state.loading = "succeeded";
      state.success = true;
    });
    builder.addCase(actForgotPasswordSendOtp.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // Vérifier OTP
    builder.addCase(actForgotPasswordVerifyOtp.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actForgotPasswordVerifyOtp.fulfilled, (state) => {
      state.loading = "succeeded";
      state.success = true;
    });
    builder.addCase(actForgotPasswordVerifyOtp.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // Réinitialiser le mot de passe
    builder.addCase(actForgotPasswordReset.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actForgotPasswordReset.fulfilled, (state) => {
      state.loading = "succeeded";
      state.success = true;
    });
    builder.addCase(actForgotPasswordReset.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { resetForgotPasswordUI, updateEmail, updateOtp } =
  forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
