import { useAppSelector } from "@/components/store/hooks";
import { Link } from "react-router-dom";

const CartSubtotalPrice = () => {
  const { productsFullInfo, items } = useAppSelector((state) => state.cart);
  const accessToken=useAppSelector((state)=>state.auth.accessToken)
  // Calcul du sous-total
  const subtotal = productsFullInfo.reduce((sum, product) => {
    const quantity = items[product.id] || 0;
    return sum + product.price * quantity;
  }, 0);

  // Frais de livraison ( gratuit si subtotal > 1000 MAD)
  const shipping = subtotal > 1000 ? 0 : 20;

  // Total final
  const total = subtotal + shipping;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-lg font-semibold">Résumé</h2>
      <div className="flex justify-between mb-2">
        <span>Sous-total</span>
        <span>{subtotal.toFixed(2)} MAD</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Livraison</span>
        <span className={shipping === 0 ? "text-green-600" : ""}>
          {shipping === 0 ? "gratuit" : shipping.toFixed(2)}
        </span>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between mb-2">
        <span className="font-semibold">Total</span>
        <span className="font-semibold">{total.toFixed(2)} MAD</span>
      </div>
      {
        accessToken ?(
       <Link to={'/payment'}>
       <button className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg">
        Commander
       </button>
       </Link>
        ):(
       <Link to={'/login'}>
       <button className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg">
        Commander
       </button>
       </Link>
        )
      }
    </div>
  );
};

export default CartSubtotalPrice;
