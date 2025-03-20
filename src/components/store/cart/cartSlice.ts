import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByItems from "./act/actGetProductsByItems";
import { TProduct } from "@/types/product";
import { TLoading } from "@/types/shared";
import { isString } from "@/types/guard";
import { getCartTotalQuantitySelector } from "./selectors";
interface ICartState {
  items: { [key: string]: number };
  productsFullInfo: TProduct[];
  loading: TLoading;
  error: null | string;
}

const initialState: ICartState = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: { payload: number }) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    cartItemChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    cartItemRemove: (state, action) => {
      delete state.items[action.payload];
      state.productsFullInfo = state.productsFullInfo.filter(
        (el) => el.id != action.payload
      );
    },
    productsCartFullInfoCleanUp: (state) => {
      state.productsFullInfo = [];
    },
    clearCartAfterPlaceOrder: (state) => {
      state.items = {};
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetProductsByItems.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { actGetProductsByItems, getCartTotalQuantitySelector };

export const {
  addToCart,
  cartItemChangeQuantity,
  cartItemRemove,
  productsCartFullInfoCleanUp,
  clearCartAfterPlaceOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
