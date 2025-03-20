import { TProduct } from "./product";

export type TOrederItem = {
  id: number;
  items: TProduct[];
  subtotal: number;
};
