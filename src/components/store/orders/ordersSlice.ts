import { createSlice } from "@reduxjs/toolkit";
import actGetOrders from "./act/actGetOrders";
import { TOrederItem } from "@/types/order.type";
import { TLoading } from "@/types/shared";
import { isString } from "@/types/guard";

interface IOrdersState {
  records: TOrederItem[];
  loading: TLoading;
  error: string | null;
}

const initialState: IOrdersState = {
  records: [],
  loading: "idle",
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    CleanUpOrdersRecords: (state) => {
      state.records = [];
    },
    addOrder: (state, action) => {
      state.records.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetOrders.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetOrders.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetOrders.rejected, (state, action) => {
      state.loading = "failed";
      state.error = isString(action.payload) ? action.payload : "Unknown error";
    });
  },
});

export const { CleanUpOrdersRecords, addOrder } = ordersSlice.actions;
export { actGetOrders };
export default ordersSlice.reducer;
