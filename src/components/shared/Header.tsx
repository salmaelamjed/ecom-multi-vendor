import { Link } from "react-router-dom";
import logo from '../../assets/logo.svg';
import {  ShoppingBag } from 'lucide-react';
import { useAppSelector } from "../store/hooks";
import { getCartTotalQuantitySelector } from "../store/cart/selectors";
import { Button } from "@/components/ui/button"; 
// import { Input } from "@/components/ui/input"; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; 
// import { Gavel } from 'lucide-react';
import SearchForm from "./inputs/Search";


type HeaderRole = {
  role: string;
};

const Header = ({ role }: HeaderRole) => {
  const totalQuantity = useAppSelector(getCartTotalQuantitySelector);
  const { productsFullInfo, items } = useAppSelector((state) => state.cart);

  // Calcul du sous-total
  const subtotal = productsFullInfo.reduce((sum, product) => {
    const quantity = items[product.id] || 0;
    return sum + product.price * quantity;
  }, 0);

  const GuestNavigation = () => (
    <div className="flex items-center gap-4">
     
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative">
           <ShoppingBag size={24}/>
            <span className="absolute top-0 right-0 px-1 text-xs text-white bg-red-500 rounded-full">
              {totalQuantity}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
          <DropdownMenuItem>
            <span className="text-lg font-bold">{totalQuantity} Items</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="text-info">Subtotal: {subtotal}MAD</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/cart" className="w-full">
              <Button className="w-full bg-blue-500 hover:bg-white hover:text-black hover:outline-blue-500">View cart</Button>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
         {/* <Link to={'/'}>
      <Button variant="ghost" className="relative">
            <Gavel size={28} strokeWidth={1.5} className="auction-icon" />
              <span className="absolute top-0 right-0 px-1 text-xs text-white bg-red-500 rounded-full">
               new
            </span>
          </Button>
      </Link> */}
      <Link to="/login">
        <Button variant="outline" className="p-4 rounded-lg w-24 h-10 border-blue-500">
          Login
        </Button>
      </Link>
      <Link to="/register">
        <Button variant="outline" className="p-4 rounded-lg bg-blue-500 w-24 h-10 ">
          Register
        </Button>
      </Link>
    </div>
  );

  const CustomerNavigation = () => (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative">
           <ShoppingBag size={24}/>
            <span className="absolute top-0 right-0 px-1 text-xs text-white bg-red-500 rounded-full">
              {totalQuantity}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
          <DropdownMenuItem>
            <span className="text-lg font-bold">{totalQuantity} Items</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="text-info">Subtotal: {subtotal}MAD</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/cart" className="w-full">
              <Button className="w-full hover:bg-white">View cart</Button>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-full">
            <img
              alt="Profile"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              className="w-10 h-10 rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
          <DropdownMenuItem>
            <Link to="/customer/profile" className="w-full">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/customer" className="w-full">
              Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/">
          <img className="h-12" src={logo} alt="tradefusion" />
        </Link>

        {/* Search Bar */}
        <div className="items-center justify-center flex-1 hidden md:flex">
          <SearchForm/>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          {role === "guest" && <GuestNavigation />}
          {role === "customer" && <CustomerNavigation />}
        </nav>
      </div>
    </header>
  );
};

export default Header;