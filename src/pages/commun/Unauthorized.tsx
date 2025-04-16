// src/pages/commun/Unauthorized.tsx
import { useAppSelector } from "@/components/store/hooks";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  const {user}=useAppSelector((state)=>state.auth);
  const getDashboardLink = () => {
    if (user?.role === "admin") return "/admin/dashboard";
    if (user?.role === "vendor") return "/vendor";
    if (user?.role === "customer") return "/customer";
    return "/unauthorized";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold text-red-600">Unauthorized Access</h1>
      <p className="mt-4 text-lg text-gray-700">
        You don’t have permission to access this page.
      </p>
      <p className="mt-2 text-gray-600">
        Your role: {user?.role || "Unknown"}
      </p>
      <Link
        to={getDashboardLink()}
        className="inline-block px-6 py-2 mt-6 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Go to Your Dashboard
      </Link>
    </div>
  );
};

export default Unauthorized;