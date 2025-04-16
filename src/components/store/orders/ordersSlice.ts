import { TOrederItem } from "@/types/order.type";
import { TLoading } from "@/types/shared";
import { createSlice } from "@reduxjs/toolkit";
import actPlaceOrder from "./act/actPlaceOrder";
import { isString } from "@/types/guard";
import actGetOrders from "./act/actGetOrders";

interface IOrderSlice {
  orderList: TOrederItem[];
  loading: TLoading;
  error: string | null;
}

const initialState: IOrderSlice = {
  orderList: [],
  loading: "idle",
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    //reset
    resetOrderStatus: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //place Order
    builder.addCase(actPlaceOrder.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actPlaceOrder.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actPlaceOrder.rejected, (state, action) => {
      state.loading = "failed";
      state.error = isString(action.payload) ? action.payload : "Unknown error";
    });
    //get Orders
    builder.addCase(actGetOrders.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetOrders.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.orderList = action.payload;
    });
    builder.addCase(actGetOrders.rejected, (state, action) => {
      state.loading = "failed";
      state.error = isString(action.payload) ? action.payload : "Unknown error";
    });
  },
});

export { actGetOrders, actPlaceOrder };
export const { resetOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
