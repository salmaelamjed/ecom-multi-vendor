import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import actForgotPasswordVerifyOtp from "../store/auth/act/actForgotPasswordVerifyOtp";
import { Button } from "../ui/button";
import { toast } from "sonner"; // Import du toast
import { updateOtp } from "../store/auth/forgotPasswordSlice ";

const ResetPwdVerifyOtpForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { email, loading } = useAppSelector((state) => state.forgotPassword);

  const [otp, setOtp] = useState("");

  const handleOtpChange = (value: string) => {
    setOtp(value);
  }; 
  
  const handleVerifyOtp = async () => {
    if (!email) {
      toast.error("L'email est requis.");
      return;
    }

    if (otp.length !== 6) {
      toast.error("Veuillez entrer un code OTP valide de 6 chiffres.");
      return;
    }

    const toastId = toast.loading("Vérification en cours...");

    try {
      const response = await dispatch(
        actForgotPasswordVerifyOtp({ email, otp })
      ).unwrap();

      if (response.success) {
        toast.success("Code OTP vérifié avec succès !", { id: toastId });
        navigate("/reset-password/reset");
        dispatch(updateOtp(otp))
      } else {
        toast.error(response.message || "Échec de la vérification.", { id: toastId });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Une erreur est survenue.", { id: toastId });
      console.error("Erreur lors de la vérification de l'OTP:", err);
    }
  };

  return (
    <div className="flex items-center justify-center w-full p-6 min-h-svh md:p-10">
      <div className="w-full max-w-sm">
        <h2 className="mb-6 text-2xl font-bold text-center">Vérifier OTP</h2>

        {/* Champ OTP */}
        <div className="flex justify-center mb-6">
          <InputOTP maxLength={6} value={otp} onChange={handleOtpChange}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Bouton */}
        <div className="flex justify-center">
          <Button
            onClick={handleVerifyOtp}
            disabled={loading === "pending"}
            className="bg-blue-500 border hover:bg-white hover:text-black hover:border-blue-500"
          >
            {loading === "pending" ? "Vérification..." : "Vérifier OTP"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPwdVerifyOtpForm;
