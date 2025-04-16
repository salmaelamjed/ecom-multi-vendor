import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.svg';
import { Gavel, ShoppingBag } from 'lucide-react';
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getCartTotalQuantitySelector } from "../store/cart/selectors";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import SearchForm from "./inputs/Search";
import { toast } from "sonner";
import { actAuthLogout } from "../store/auth/authSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { accessToken, user } = useAppSelector((state) => state.auth);
  const totalQuantity = useAppSelector(getCartTotalQuantitySelector);
  const { productsFullInfo, items } = useAppSelector((state) => state.cart);

  // sous-total
  const subtotal = productsFullInfo.reduce((sum, product) => {
    const quantity = items[product.id] || 0;
    return sum + product.price * quantity;
  }, 0);

  const handleLogout = async () => {
    try {
      await dispatch(actAuthLogout()).unwrap();
      navigate('/');
      toast.success("You are logged out");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to={user?.role ? `/${user.role}` : "/"}>
          <img className="h-12" src={logo} alt="tradefusion" />
        </Link>

        {/* Search Bar */}
        <div className="items-center justify-center flex-1 hidden md:flex">
          <SearchForm />
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          {/* Cart */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative">
                <ShoppingBag size={24} />
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
                <span className="text-info">Subtotal: {subtotal} MAD</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/cart" className="w-full">
                  <Button className="w-full hover:bg-white">View cart</Button>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* If authenticated */}
          {accessToken ? (
            <>
              {user?.role === "customer" && (
                <Link to="/customer/auctions">
                  <Button variant="ghost" className="relative">
                    <Gavel size={28} strokeWidth={1.5} />
                    <span className="absolute top-0 right-0 px-1 text-xs text-white bg-red-500 rounded-full">
                      new
                    </span>
                  </Button>
                </Link>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <img
                    alt="Profile"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                  <DropdownMenuItem>
                    <Link to={`/${user?.role}/profile`} className="w-full">
                      {user?.name || "Profile"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={handleLogout} className="w-full text-left">
                      Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            // Guest
            <>
              <Link to="/login">
                <Button variant="outline" className="w-24 h-10 border-blue-500">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="w-24 h-10 text-white bg-blue-500 hover:bg-blue-600">
                  Register
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
