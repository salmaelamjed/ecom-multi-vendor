import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { isaxiosErrorHandler } from "@/Util";

const actAuthLogout = createAsyncThunk(
  "auth/actAuthLogout",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return;   
      }

      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      localStorage.removeItem("accessToken");
    } catch (error) {
      return rejectWithValue(isaxiosErrorHandler(error));
    }
  }
);

export default actAuthLogout;
