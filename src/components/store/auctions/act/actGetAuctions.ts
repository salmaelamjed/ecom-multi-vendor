import { TAuction } from "@/types/auction";
import { isaxiosErrorHandler } from "@/Util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = TAuction[];

const actGetAuctions = createAsyncThunk(
  "auctions/actGetAuctions",
  async ({ signal }: { signal: AbortSignal }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        `http://localhost:5005/auctions`,
        { signal }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(isaxiosErrorHandler(error));
    }
  }
);

export default actGetAuctions;