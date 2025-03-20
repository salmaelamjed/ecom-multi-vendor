export type TProduct = {
  id: number;
  name: string;
  price: number;
  description: string;
  store_id: number;
  cat_prefix?: string;
  image: string;
  max: number;
  isLiked?: boolean;
  isAuthenticated?: boolean;
  colors?: string[];
  brand?: string;
  images?: string[];
};
