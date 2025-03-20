import { LoginForm } from "@/components/forms/login-form";
import { RegisterForm } from "@/components/forms/register-form";
import { RegisterVendorForm } from "@/components/forms/RegisterAsASaller-form";
import DefaultLayout from "@/layouts/DefaultLayout";
import Categories from "@/pages/commun/Categories";
import Error from "@/pages/commun/Error";
import Home from "@/pages/commun/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 🛠 Fonction pour la route "categories/products/:prefix" afin d'éviter la duplication
// const validateCategoryLoader = ({ params }) => {
//   const prefix = params.prefix;

//   if (!prefix || !/^[a-z]+$/i.test(prefix)) {
//     throw redirect("/error", {
//       status: 400,
//       statusText: "Category not Found",
//     });
//   }

//   return null;
// };

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
    //   { path: "forgotPassword", element: <ForgotPassword /> },
      { path: "categories", element: <Categories /> },
    //   { path: "cart", element: <Cart /> },
    //   { path: "categories/products/:prefix", element: <Products />, loader: validateCategoryLoader },
    //   { path: "categories/products/:prefix/productDetails/:id", element: <ProductDetails /> },
    ],
  },

  // Routes admin (AdminLayout)
//   {
//     path: "/admin",
//     element: (
//       <ProtectedRoute requiredRole="admin">
//         <AdminLayout />
//       </ProtectedRoute>
//     ),
//     errorElement: <Error />,
//     children: [
//       { path: "settings", element: <Settings /> },
//       {
//         path: "dashboard",
//         element: <AdminDashboard />, // Layout du dashboard
//         children: [
//           { index: true, element: <h1>all element </h1> },
//           { path: "list-vendors", element: <UserList /> },
//           { path: "list-customers", element: <h2>Liste des clients</h2> },
//           { path: "products-management", element: <h2>Gestion des produits</h2> },
//           { path: "auctions-management", element: <h2>Gestion des produits</h2> },
//         ],
//       },
//       { path: "categories/products/:prefix", element: <Products />, loader: validateCategoryLoader },
//     ],
//   },

  // Routes vendeur (VendorLayout)
//   {
//     path: "/vendor",
//     element: (
//       <ProtectedRoute requiredRole="vendor">
//         <VendorLayout />
//       </ProtectedRoute>
//     ),
//     errorElement: <Error />,
//     children: [
//       { index: true, element: <VendorDashboard /> },
//       { path: "vendor-notifications", element: <VenderNotification /> },
//       { path: "add-product", element: <AddProduct /> },
//       { path: "orders", element: <Orders /> },
//       { path: "settings", element: <Settings /> },
//       {
//         path: "dashboard",
//         element: <VendorDashboard />,
//         children: [
//           { path: "orders-management", element: <Orders /> },
//           { path: "products-management", element: <ProductsManagement /> },
//           { path: "customers-management", element: <h1>gestion des acheteurs</h1> },
//           { path: "auction-management", element: <Auctions /> },
//         ],
//       },
//       { path: "categories/products/:prefix", element: <Products />, loader: validateCategoryLoader },
//       { path: "categories/products/:prefix/productDetails/:id", element: <ProductDetails /> },
//     ],
//   },

  // Routes client authentifié (CustomerLayout)
//   {
//     path: "/customer",
//     element: (
//       <ProtectedRoute requiredRole="customer">
//         <CustomerLayout />
//       </ProtectedRoute>
//     ),
//     errorElement: <Error />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "orders", element: <CustomerOrders /> },
//       { path: "profile", element: <CustomerProfile /> },
//       { path: "categories/products/:prefix", element: <Products />, loader: validateCategoryLoader },
//       { path: "categories/products/:prefix/productDetails/:id", element: <ProductDetails /> },
//       { path: "cart", element: <Cart /> },
//     ],
//   },

  // Page "Non autorisé"
//   { path: "/unauthorized", element: <Unauthorized /> },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;