import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { isaxiosErrorHandler } from "@/Util";



const actForgotPasswordSendOtp = createAsyncThunk(
  "auth/actForgotPasswordSendOtp",
  async (email: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/reset-password/send-otp",
        { email }
      );
      return response.data; // Retourne un message de succès
    } catch (error) {
      return rejectWithValue(isaxiosErrorHandler(error));
    }
  }
);

export default actForgotPasswordSendOtp;
