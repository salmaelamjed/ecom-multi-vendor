import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useState } from "react";
import actForgotPasswordReset from "../store/auth/act/actForgotPasswordReset";
import { toast } from "sonner"; 

const ResetPasswordReset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { email, loading } = useAppSelector((state) => state.forgotPassword);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault(); 

    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match."); 
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long."); 
      return;
    }

    try {
      const response = await dispatch(
        actForgotPasswordReset({ email, password, confirmPassword })
      ).unwrap();

      if (response.success) {
        toast.success(response.message); 
        navigate("/login"); 
      } else {
        toast.error(response.message || "Failed to reset password."); 
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
      console.error("Error resetting password:", err);
    }
  };

  return (
    <div className="flex items-center justify-center w-full p-6 min-h-svh md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-4xl">Reset Password</CardTitle>
              <CardDescription>Reset your password</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleResetPassword}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      type="password"
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="password_confirmation">
                      Confirm Password
                    </Label>
                    <Input
                      id="password_confirmation"
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 border hover:bg-white hover:text-black hover:border-blue-500"
                      disabled={loading === "pending"}
                    >
                      {loading === "pending" ? "Resetting..." : "Reset Password"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordReset;