import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { isaxiosErrorHandler } from "@/Util";

type TForgotPasswordVerifyOtpData = {
  email: string;
  otp: string;
};

const actForgotPasswordVerifyOtp = createAsyncThunk(
  "auth/actForgotPasswordVerifyOtp",
  async ({ email, otp }: TForgotPasswordVerifyOtpData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/reset-password/verify-otp",
        { email, otp }
      );
      return response.data; // Retourne un message de succès
    } catch (error) {
      return rejectWithValue(isaxiosErrorHandler(error));
    }
  }
);

export default actForgotPasswordVerifyOtp;
