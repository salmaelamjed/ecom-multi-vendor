import { TProduct } from "@/types/product";
import { isaxiosErrorHandler } from "@/Util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = TProduct[];

const actGetAllProducts = createAsyncThunk(
  "products/actGetAllProducts",
  async ({ signal }: { signal: AbortSignal }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        `http://localhost:5005/products`,
        { signal }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(isaxiosErrorHandler(error));
    }
  }
);

export default actGetAllProducts;
