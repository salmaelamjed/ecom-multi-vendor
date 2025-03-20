import { memo } from "react";
import { TProduct } from "@/types/product";
import { useAppDispatch, useAppSelector } from "@/components/store/hooks";
import { cartItemChangeQuantity, cartItemRemove } from "@/components/store/cart/cartSlice";

type CartItemProps = TProduct & { quantity: number };

const CartItem = memo(({ id, name, image, price ,max=0}: CartItemProps) => {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector(state => state.cart.items[id]);  
  const total = price * quantity;

  const handleIncrease = () => {
    if(quantity<max){
          dispatch(cartItemChangeQuantity({ id, quantity: quantity + 1 }));
    }

  };

  const handleDecrease = () => {
    if (quantity > 1 ) {
      dispatch(cartItemChangeQuantity({ id, quantity: quantity - 1 }));
    }
  };

  const handleRemove = () => {
    dispatch(cartItemRemove(id));
  };

  return (
    <tr className="border-b border-gray-200">
      <td className="py-4">
        <div className="flex items-center">
          <img className="w-16 h-16 mr-4" src={image} alt={name} />
          <span className="font-semibold text-gray-900"> {name}</span>
        </div>
      </td>
      <td className="py-4 text-gray-700">{price.toFixed(2)} MAD</td>
      <td className="py-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDecrease}
            disabled={quantity === 1}
            className={`px-4 py-2 transition duration-200 ease-in-out bg-gray-100 rounded-lg shadow-sm 
              ${quantity === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
          >
            -
          </button>
          <span className="w-12 font-semibold text-center text-gray-800">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="px-4 py-2 text-gray-600 transition duration-200 ease-in-out bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            +
          </button>
        </div>
      </td>
      <td className="py-4 text-gray-700">{total.toFixed(2)} MAD</td>
      <td className="py-4">
        <button
          onClick={handleRemove}
          className="text-red-500 transition duration-150 hover:text-red-600 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </td>
    </tr>
  );
});

export default CartItem;
