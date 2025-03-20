import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { isaxiosErrorHandler } from "@/Util";
import { TProduct } from "@/types/product";

type TResponse = TProduct[];

const actGetOrders = createAsyncThunk(
  "products/actGetOrders",
  async ({ signal }: { signal: AbortSignal }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        `http://localhost:5005/orders`,
        { signal }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(isaxiosErrorHandler(error));
    }
  }
);

export default actGetOrders;
