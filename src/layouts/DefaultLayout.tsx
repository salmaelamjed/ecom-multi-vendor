import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/shared/Header";
import Categories from "@/pages/commun/Categories";

const DefaultLayout = () => {
  const location = useLocation();
  const hideHeader = ["/login", "/register","/register-as-vendor"].includes(location.pathname);
  const showCategories = location.pathname === "/" || location.pathname.startsWith("/categories/products");

  return (
    <div>
      {!hideHeader && <Header role="guest" />}
      <hr className="border-t border-gray-300 shadow-sm" />
      {showCategories && <Categories />}
      <div className="container p-4 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
