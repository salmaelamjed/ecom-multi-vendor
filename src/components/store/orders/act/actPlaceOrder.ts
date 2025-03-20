import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { isaxiosErrorHandler } from "@/Util";

const actPlaceOrder = createAsyncThunk(
  "orders/actPlaceOrder",
  async (subtotal: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { cart } = getState() as RootState;

    const orderItems = cart.productsFullInfo.map((el) => ({
      id: el.id,
      title: el.name,
      price: el.price,
      img: el.image,
      quantity: cart.items[el.id],
    }));

    try {
      const response = await axios.post("/orders", {
        items: orderItems,
        subtotal,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(isaxiosErrorHandler(error));
    }
  }
);

export default actPlaceOrder;
