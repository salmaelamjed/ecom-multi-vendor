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
import { Link } from "react-router-dom";
import { toast } from "sonner";
import useLogin from "@/hooks/useLogin";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";

const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const {
    loading,
    error,
    formErrors,
    handleAlertClose,
    onSubmit,
    register,
    handleSubmit,
    showAlert,
    searchParams,
  } = useLogin();

  if (error && error !== formErrors.root?.message) {
    toast.error(error);
  }

  // Define animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50, 
    },
    visible: {
      opacity: 1,
      y: 0, // Move to original position
      transition: {
        duration: 0.6, 
        ease: "easeOut", // Smooth easing
        delay: 0.2, 
      },
    },
  };

  return (
    <div className="flex items-center justify-center w-full p-6 min-h-svh md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">Login</CardTitle>
                <CardDescription>Sign in to your account</CardDescription>
              </CardHeader>
              <CardContent>
                {showAlert && searchParams.get("message") === "account_created" && (
                  <Alert className="mb-4">
                    <AlertDescription>
                      Account created successfully! Please log in.
                      <Button
                        variant="link"
                        className="p-0 ml-2"
                        onClick={handleAlertClose}
                      >
                        Dismiss
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-6">
                    {/* Email */}
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...register("email")}
                      />
                      {formErrors.email && (
                        <p className="text-sm text-red-500">{formErrors.email.message}</p>
                      )}
                    </div>

                    {/* Password */}
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link
                          to="/reset-password/send-otp"
                          className="text-sm text-blue-600 hover:text-blue-800"
                          aria-label="Forgot your password?"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        {...register("password")}
                      />
                      {formErrors.password && (
                        <p className="text-sm text-red-500">{formErrors.password.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col gap-3">
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 border hover:bg-white hover:text-black hover:border-blue-500 "
                        disabled={loading === "pending"}
                      >
                        {loading === "pending" ? "Logging in..." : "Login"}
                      </Button>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="mt-4 text-sm text-center">
                    Don’t have an account?{" "}
                    <Link
                      to="/register"
                      className="text-blue-600 underline underline-offset-4"
                    >
                      Register
                    </Link>
                  </div>
                  <div className="mt-2 text-sm text-center">
                    Want to sell with us?{" "}
                    <Link
                      to="/register-as-vendor"
                      className="text-blue-600 underline underline-offset-4"
                    >
                      Join as a Vendor
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;