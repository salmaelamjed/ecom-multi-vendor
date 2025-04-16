import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { isaxiosErrorHandler } from "@/Util";
import { User } from "@/types/user";

type TResponse = User[];

const actGetUsers = createAsyncThunk(
  "users/actGetUsers",
  async ({ signal }: { signal: AbortSignal }, thunkAPI) => {
    // Supprimé `prefix: string`
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        `http://localhost:5005/users`,
        { signal }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(isaxiosErrorHandler(error));
    }
  }
);

export default actGetUsers;
