import { TProduct } from "@/types/product";
import { isaxiosErrorHandler } from "@/Util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";

type TResponse = TProduct[];

const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",
  async ({ signal }: { signal: AbortSignal }, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);

    if (!itemsId.length) {
      return fulfillWithValue([]);
    }

    try {
      const concatenatedIds = itemsId.map((el) => `id=${el}`).join("&");
      const response = await axios.get<TResponse>(
        `http://localhost:5005/products?${concatenatedIds}`,
        {
          signal,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(isaxiosErrorHandler(error));
    }
  }
);

export default actGetProductsByItems;
