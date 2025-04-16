import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { isaxiosErrorHandler } from "@/Util";

type TForgotPasswordResetData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const actForgotPasswordReset = createAsyncThunk(
  "auth/actForgotPasswordReset",
  async (
    { email, password, confirmPassword }: TForgotPasswordResetData,
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/reset-password/reset",
        { email, password, password_confirmation: confirmPassword }
      );
      return response.data; // Retourne un message de succès
    } catch (error) {
      return rejectWithValue(isaxiosErrorHandler(error));
    }
  }
);

export default actForgotPasswordReset;
