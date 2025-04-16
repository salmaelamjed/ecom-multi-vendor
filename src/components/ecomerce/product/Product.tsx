import { Link } from "react-router-dom";
import { TProduct } from "../../../types/product";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react"; 
import { addToCart } from "@/components/store/cart/cartSlice";
import { useAppDispatch } from "@/components/store/hooks";


const Product = ({ name, price, image, id,brand }: TProduct) => {
  const dispatch = useAppDispatch();
  const [isBtnClicked, setBtnClicked] = useState(false); // True if the button is clicked
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const addToCartHandler = () => {
    dispatch(addToCart(id));
    setBtnClicked(true); 
  };

  useEffect(() => {
    if (!isBtnClicked) {
      return;
    }
    setIsBtnDisabled(true);
    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
      setBtnClicked(false); 
    }, 500);
    return () => clearTimeout(debounce);
  }, [isBtnClicked]);

  return (
    <div className="p-4 border border-blue-200 rounded-lg shadow-md w-60">
      <div className="relative">
        
        {/* Wishlist Icon */}
        <button className="absolute flex items-center justify-center w-8 h-8 bg-white rounded-full shadow top-2 right-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
            />
          </svg>
        </button>
        {/* Product Image */}
        <div>
          <Link to={`productDetails/${id}`}>
            <img
              src={image}
              alt={name}
              className="object-contain w-full h-[270px]"
            />
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-4">
        <h3 className="text-base font-medium text-gray-800">{name}</h3>
        <p className="text-xs font-medium text-green-600 uppercase">{brand}</p>
        {/* Pricing */}
        <div className="flex items-end justify-between mt-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-semibold text-blue-600">
              ${price.toFixed(2)}
            </span>
          </div>
          <button
            className={`w-10 h-10 rounded-full transition-all duration-300 ease-in-out ${
              isBtnClicked ? "bg-green-500" : "bg-blue-600"
            } flex items-center justify-center shadow text-white`}
            onClick={addToCartHandler}
            disabled={isBtnDisabled}
          >
            {isBtnClicked ? (
              <div className="flex items-center justify-center">
                <Loader className="animate-spin" size={20} />
              </div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;