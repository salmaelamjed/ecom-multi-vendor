import { useAppDispatch, useAppSelector } from "@/components/store/hooks";
import { resetUI } from "@/components/store/auth/authSlice";
import loginSchema, { LoginInputs } from "@/validations/LoginSchema";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import actAuthLogin from "@/components/store/auth/act/actAuthLogin";

const useLogin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showAlert, setShowAlert] = useState(!!searchParams.get("message"));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<LoginInputs>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  // Handle "account_created" message on mount
  useEffect(() => {
    if (searchParams.get("message") === "account_created") {
      toast.success("Account created successfully! Please log in.");
      setSearchParams(""); // Clear search params
    }
  }, [searchParams, setSearchParams]);

  // Reset UI state on unmount
  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const response = await dispatch(actAuthLogin(data)).unwrap();
      const { accessToken, role } = response;

      // Store token in localStorage
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      // Navigate based on role
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "vendor") {
        navigate("/vendor/dashboard");
      } else {
        navigate("/customer");
      }

      toast.success("Login successful!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed.";
      toast.error(errorMessage);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    setSearchParams("");
  };

  return {
    error,
    loading,
    accessToken,
    formErrors,
    handleAlertClose,
    onSubmit,
    searchParams,
    register,
    handleSubmit,
    showAlert,
  };
};

export default useLogin;
