import { useAppDispatch, useAppSelector } from "@/components/store/hooks";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { actAuthRegister, resetUI } from "@/components/store/auth/authSlice";
import { registerSchema, TFormInputs } from "@/validations/RgisterSchema";
import { useEffect } from "react";
import useCheckEmailAvailability from "./useCheckEmailAvailability";
import { toast } from "sonner";

const useRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors: formErrors },
  } = useForm<TFormInputs>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "customer",
    },
  });

  const submitForm: SubmitHandler<TFormInputs> = async (data) => {
    const { name, email, password, password_confirmation, role } = data;
    dispatch(
      actAuthRegister({
        name,
        email,
        password,
        password_confirmation,
        role,
      })
    )
      .unwrap()
      .then(() => {
        navigate("/login?message=account_created");
      });
  };

  const {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability();

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const isValid = await trigger("email");
    const { isDirty } = getFieldState("email");

    if (isValid && isDirty && enteredEmail !== value) {
      checkEmailAvailability(value);
    }

    if (!isValid && enteredEmail) {
      resetCheckEmailAvailability();
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);

  useEffect(() => {
    if (emailAvailabilityStatus === "notAvailable") {
      toast.error("This email is already taken.");
    }
  }, [emailAvailabilityStatus]);

  return {
    loading,
    error,
    formErrors,
    emailAvailabilityStatus,
    submitForm,
    register,
    handleSubmit,
    emailOnBlurHandler,
  };
};

export default useRegister;
