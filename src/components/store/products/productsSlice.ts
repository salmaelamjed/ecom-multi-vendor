import { TProduct } from "@/types/product";
import { TLoading } from "@/types/shared";
import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCatPrefix from "./act/actGetProductsByCatPrefix";
import { isString } from "@/types/guard";
import actGetAllProducts from "./act/actGetAllProducts";


interface IProductsState {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: IProductsState = {
  records: [],
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    CleanUpProductsRecords: (state) => {
      state.records = [];
    },
    addProduct: (state, action) => {
      state.records.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByCatPrefix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByCatPrefix.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetProductsByCatPrefix.rejected, (state, action) => {
      state.loading = "failed";
      state.error = isString(action.payload) ? action.payload : "Unknown error";
    });

    builder.addCase(actGetAllProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetAllProducts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetAllProducts.rejected, (state, action) => {
      state.loading = "failed";
      state.error = isString(action.payload) ? action.payload : "Unknown error";
    });
  },
});

export const { CleanUpProductsRecords, addProduct } = productsSlice.actions;
export { actGetProductsByCatPrefix, actGetAllProducts };
export default productsSlice.reducer;
