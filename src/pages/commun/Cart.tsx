import { useEffect } from "react";
import Lottie from "lottie-react";
import { useAppDispatch, useAppSelector } from "@/components/store/hooks";
import { actGetProductsByItems } from "@/components/store/cart/cartSlice";
import Loading from "@/components/feedback/Loading/Loading";
import CartItemList from "@/components/ecomerce/CartItemList/CartItemList";
import emptyCartAnimation from '@/assets/lottieFiles/empty.json'
import { CartSubtotalPrice } from "@/components/ecomerce";


const ShoppingCart = () => {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, loading, error } = useAppSelector((state) => state.cart);
   //const userAccessToken=useAppSelector((state)=>state.auth.accessToken);
  
  useEffect(() => {
    const controller = new AbortController();
    dispatch(actGetProductsByItems({ signal: controller.signal }));
    return () => controller.abort();
  }, [dispatch]);

  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));

  return (
    <div className="h-screen py-8">
      <div className="container px-4 mx-auto">
        <h1 className="mb-4 text-2xl font-semibold">Panier d'achats</h1>
        <Loading status={loading} error={error}>
          {products.length ? (
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="md:w-3/4">
                <div className="p-6 mb-4 bg-white rounded-lg shadow-md">
                  <CartItemList products={products} />
                </div>
              </div>
              <div className="md:w-1/4">
                <CartSubtotalPrice
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Lottie animationData={emptyCartAnimation} className="w-64 h-64" />
              <p className="mt-4 text-lg font-semibold text-red-600">Votre panier est vide</p>
            </div>
          )}
        </Loading>
      </div>
    </div>
  );
};

export default ShoppingCart;
