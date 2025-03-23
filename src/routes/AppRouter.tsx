import { redirect } from 'react-router-dom';
import { LoginForm } from "@/components/forms/login-form";
import { RegisterForm } from "@/components/forms/register-form";
import { RegisterVendorForm } from "@/components/forms/RegisterAsASaller-form";
import DefaultLayout from "@/layouts/DefaultLayout";
import Categories from "@/pages/commun/Categories";
import Error from "@/pages/commun/Error";
import Home from "@/pages/commun/Home";
import Products from "@/pages/commun/Products";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from '@/layouts/AdminLayout';
// import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import AdminDashboard from '@/pages/admin/Dashboard';
import Unauthorized from '@/pages/commun/Unauthorized';
import ShoppingCart from '@/pages/commun/Cart';
import CustomerLayout from '@/layouts/CustomerLayout';
import VendorLayout from '@/layouts/VendorLayout';
import { ResetPwdSendOtpForm } from '@/components/forms/ResetPwdSendOtpForm-form';
import ResetPwdVerifyOtpForm from '@/components/forms/ResetPwdVerifyOtpForm-form';
import ResetPasswordReset from '@/components/forms/ResetPasswordReset-form';
// import ProtectedRoute from '@/components/Auth/ProtectedRoute';

// Fonction pour la route "categories/products/:prefix" afin d'éviter la duplication
const validateCategoryLoader = ({ params }) => {
  const prefix = params.prefix;

  if (!prefix || !/^[a-z]+$/i.test(prefix)) {
    throw redirect("/error", {
      status: 400,
      statusText: "Category not Found",
    });
  }

  return null;
};

const router = createBrowserRouter([
  // Routes publiques (DefaultLayout)
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
     { path: "register-as-vendor", element: <RegisterVendorForm /> },
     { path: "reset-password/send-otp", element: <ResetPwdSendOtpForm /> },
     {path:"reset-password/verify-otp",element:<ResetPwdVerifyOtpForm/>},
     {path:"reset-password/reset",element:<ResetPasswordReset/>},

      { path: "categories", element: <Categories /> },
      { path: "cart", element: <ShoppingCart /> },
      { path: "categories/products/:prefix", element: <Products />, loader: validateCategoryLoader },
    //  { path: "categories/products/:prefix/productDetails/:id", element: <ProductDetails /> },
    ],
  },

  // Routes admin (AdminLayout)
   {
     path: "/admin",
     element: (
        <AdminLayout />
     ),
    errorElement: <Error />,
    children: [
      // { path: "settings", element: <Settings /> },
      {
        path: "dashboard",
        element: <AdminDashboard />, // Layout du dashboard
        children: [
          { index: true, element: <h1>all element </h1> },
          // { path: "list-vendors", element: <UserList /> },
          { path: "list-customers", element: <h2>Liste des clients</h2> },
          { path: "products-management", element: <h2>Gestion des produits</h2> },
          { path: "auctions-management", element: <h2>Gestion des produits</h2> },
        ],
      },
      { path: "categories/products/:prefix", element: <Products />, loader: validateCategoryLoader },
    ],
  },

  // Routes vendeur (VendorLayout)
  {
    path: "/vendor",
    element: (
        <VendorLayout />
    ),
    errorElement: <Error />,
    children: [
      { index: true, element: <h1>hello, Welcome with us as a saller</h1> },
      // { path: "vendor-notifications", element: <VenderNotification /> },
      // { path: "add-product", element: <AddProduct /> },
      // { path: "orders", element: <Orders /> },
      // { path: "settings", element: <Settings /> },
      // {
      //   path: "dashboard",
      //   element: <VendorDashboard />,
      //   children: [
      //     { path: "orders-management", element: <Orders /> },
      //     { path: "products-management", element: <ProductsManagement /> },
      //     { path: "customers-management", element: <h1>gestion des acheteurs</h1> },
      //     { path: "auction-management", element: <Auctions /> },
      //   ],
      // },
      { path: "categories/products/:prefix", element: <Products />, loader: validateCategoryLoader },
      // { path: "categories/products/:prefix/productDetails/:id", element: <ProductDetails /> },
    ],
  },

  // Routes client authentifié (CustomerLayout)
  {
    path: "/customer",
    element: (
        <CustomerLayout />
    ),
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      // { path: "orders", element: <CustomerOrders /> },
      // { path: "profile", element: <CustomerProfile /> },
      { path: "categories/products/:prefix", element: <Products />, loader: validateCategoryLoader },
      // { path: "categories/products/:prefix/productDetails/:id", element: <ProductDetails /> },
      { path: "cart", element: <ShoppingCart /> },
    ],
  },

  // Page "Non autorisé"
  { path: "/unauthorized", element: <Unauthorized /> },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;