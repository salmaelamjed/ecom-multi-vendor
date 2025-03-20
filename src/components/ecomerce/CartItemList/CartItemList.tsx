import { TProduct } from "@/types/product";
import CartItem from "../CartItem/CartItem";


type CartItemListProps = {
  products:TProduct[]
};
const CartItemList = ({products,
  
}:CartItemListProps) => {
   const renderList=products.map((el)=>(
   <CartItem key={el.id} 
   {...el}  
   quantity={el.max ?? 0}
   />));

  return (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="font-semibold text-left">Product</th>
                    <th className="font-semibold text-left">Price</th>
                    <th className="font-semibold text-left">Quantity</th>
                    <th className="font-semibold text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                {renderList}
                </tbody>
              </table>
  )
}

export default CartItemList
