// src/router/AppRouter.tsx
import Lottie from "lottie-react";
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import PublicRoute from "@/components/Auth/PublicRoute"; // Import PublicRoute
import loading from "@/assets/lottieFiles/loading.json";

// Layouts (Lazy-loaded)
const DefaultLayout = lazy(() => import("@/layouts/DefaultLayout"));
const VendorLayout = lazy(() => import("@/layouts/VendorLayout"));
const CustomerLayout = lazy(() => import("@/layouts/CustomerLayout"));
const DashboardLayout = lazy(() => import("@/layouts/dashboard-layout"));

// Pages (Lazy-loaded)
const Home = lazy(() => import("@/pages/commun/Home"));
const Categories = lazy(() => import("@/pages/commun/Categories"));
const Products = lazy(() => import("@/pages/commun/Products"));
const ShoppingCart = lazy(() => import("@/pages/commun/Cart"));
const Unauthorized = lazy(() => import("@/pages/commun/Unauthorized"));
const LoginForm = lazy(() => import("@/components/forms/login-form"));
const RegisterForm = lazy(() => import("@/components/forms/register-form"));
const RegisterVendorForm = lazy(
  () => import("@/components/forms/RegisterAsASaller-form")
);
const ResetPwdSendOtpForm = lazy(
  () => import("@/components/forms/ResetPwdSendOtpForm-form")
);
const ResetPwdVerifyOtpForm = lazy(
  () => import("@/components/forms/ResetPwdVerifyOtpForm-form")
);
const ResetPasswordReset = lazy(
  () => import("@/components/forms/ResetPasswordReset-form")
);
const Payment = lazy(() => import("@/components/forms/Payment"));
const DashboardPage = lazy(() => import("@/pages/dashboard/index"));
const NotFound = lazy(() => import("@/pages/commun/not-found"));
const UsersManagement = lazy(
  () => import("@/pages/admin/Dashboard/users-management")
);
const OrdersManagement = lazy(
  () => import("@/pages/admin/Dashboard/orders-management")
);
const ProductsManagement = lazy(
  () => import("@/pages/admin/Dashboard/products-management")
);
const AuctionManagement = lazy(
  () => import("@/pages/admin/Dashboard/auction-management")
);
const AuctionsPage = lazy(() => import("@/pages/commun/Auctions"));
const ForgotPasswordForm = lazy(
  () => import("@/components/forms/ResetPasswordReset-form")
);

// Fallback loading component
const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <div className="flex flex-col items-center justify-center h-screen">
      <Lottie animationData={loading} className="w-64 h-64" />
      <h3 className="mt-4 text-lg font-semibold">Please wait ...</h3>
    </div>
  </div>
);

// Loader to validate category prefix
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
  // Public Routes (DefaultLayout)
  {
    path: "/",
    element: (
        <Suspense fallback={<LoadingFallback />}>
        <DefaultLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFound />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <PublicRoute >
            <Suspense fallback={<LoadingFallback />}>
              <Home />
            </Suspense>
          </PublicRoute>
        ),
      },
      {
        path: "login",
        element: (
            <PublicRoute>
            <Suspense fallback={<LoadingFallback />}>
              <LoginForm />
            </Suspense>
            </PublicRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicRoute>
            <Suspense fallback={<LoadingFallback />}>
              <RegisterForm />
            </Suspense>
          </PublicRoute>
        ),
      },
      {
        path: "register-as-vendor",
        element: (
          <PublicRoute>
            <Suspense fallback={<LoadingFallback />}>
              <RegisterVendorForm />
            </Suspense>
          </PublicRoute>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <PublicRoute>
            <Suspense fallback={<LoadingFallback />}>
              <ForgotPasswordForm />
            </Suspense>
          </PublicRoute>
        ),
      },
      {
        path: "reset-password/send-otp",
        element: (
          <PublicRoute>
            <Suspense fallback={<LoadingFallback />}>
              <ResetPwdSendOtpForm />
            </Suspense>
          </PublicRoute>
        ),
      },
      {
        path: "reset-password/verify-otp",
        element: (
          <PublicRoute>
            <Suspense fallback={<LoadingFallback />}>
              <ResetPwdVerifyOtpForm />
            </Suspense>
          </PublicRoute>
        ),
      },
      {
        path: "reset-password/reset",
        element: (
          <PublicRoute>
            <Suspense fallback={<LoadingFallback />}>
              <ResetPasswordReset />
            </Suspense>
          </PublicRoute>
        ),
      },
      { path: "categories", element: <Suspense fallback={<LoadingFallback />}><Categories /></Suspense> },
      { path: "cart", element: <Suspense fallback={<LoadingFallback />}><ShoppingCart /></Suspense> },
      {
        path: "categories/products/:prefix",
        element: <Suspense fallback={<LoadingFallback />}><Products /></Suspense>,
        loader: validateCategoryLoader,
      },
      { path: "payment", element: <Suspense fallback={<LoadingFallback />}><Payment /></Suspense> },
      { path: "auctions", element: <Suspense fallback={<LoadingFallback />}><AuctionsPage /></Suspense> },
    ],
  },

  // Admin Routes (DashboardLayout)
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Suspense fallback={<LoadingFallback />}>
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
        </Suspense>
      </ProtectedRoute>
    ),
    errorElement: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFound />
      </Suspense>
    ),
    children: [
      { path: "dashboard", element: <Suspense fallback={<LoadingFallback />}><DashboardPage /></Suspense>, index: true },
      { path: "dashboard/customers-management", element: <Suspense fallback={<LoadingFallback />}><UsersManagement /></Suspense> },
      { path: "dashboard/vendors-managemnt", element: <Suspense fallback={<LoadingFallback />}><UsersManagement /></Suspense> },
      { path: "dashboard/products-management", element: <Suspense fallback={<LoadingFallback />}><ProductsManagement /></Suspense> },
      { path: "dashboard/auctions-management", element: <Suspense fallback={<LoadingFallback />}><AuctionManagement /></Suspense> },
      { path: "dashboard/orders-management", element: <Suspense fallback={<LoadingFallback />}><OrdersManagement /></Suspense> },
      {
        path: "categories/products/:prefix",
        element: <Suspense fallback={<LoadingFallback />}><Products /></Suspense>,
        loader: validateCategoryLoader,
      },
    ],
  },
  
  // Vendor Routes (VendorLayout)
  {
    path: "/vendor",
    element: (
      <ProtectedRoute allowedRoles={['vendor']}>
        <Suspense fallback={<LoadingFallback />}>
          <VendorLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    errorElement: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFound />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <h1 className="text-2xl font-bold text-primaryBlack">Hello, Welcome with us as a seller</h1>
          </Suspense>
        ),
      },
      {
        path: "categories/products/:prefix",
        element: <Suspense fallback={<LoadingFallback />}><Products /></Suspense>,
        loader: validateCategoryLoader,
      },
    ],
  },

  // Customer Routes (CustomerLayout)
  {
    path: "/customer",
    element: (
      <ProtectedRoute allowedRoles={['customer']}>
         <Suspense fallback={<LoadingFallback />}>
          <CustomerLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    errorElement: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFound />
      </Suspense>
    ),
    children: [
      { index: true, element: <Suspense fallback={<LoadingFallback />}><Home /></Suspense> },
      {
        path: "categories/products/:prefix",
        element: <Suspense fallback={<LoadingFallback />}><Products /></Suspense>,
        loader: validateCategoryLoader,
      },
      { path: "cart", element: <Suspense fallback={<LoadingFallback />}><ShoppingCart /></Suspense> },
      { path: "payment", element: <Suspense fallback={<LoadingFallback />}><Payment /></Suspense> },
      { path: "auctions", element: <Suspense fallback={<LoadingFallback />}><AuctionsPage /></Suspense> },
    ],
  },

  // Unauthorized Page
  {
    path: "/unauthorized",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Unauthorized />
      </Suspense>
    ),
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;