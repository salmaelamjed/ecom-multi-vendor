import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../..";
const getCartTotalQuantitySelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    const totalQuantity = (Object.values(items) as number[]).reduce(
      (accumulator: number, currentValue: number) => accumulator + currentValue,
      0
    );
    return totalQuantity;
  }
);

export { getCartTotalQuantitySelector };
