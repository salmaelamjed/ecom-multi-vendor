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
import { CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import useRegister from "@/hooks/useRegister";
import { motion } from "framer-motion"; // Import Framer Motion

const RegisterForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const {
    loading,
    formErrors,
    emailAvailabilityStatus,
    submitForm,
    register,
    handleSubmit,
    emailOnBlurHandler,
  } = useRegister();

  // Define animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50, // Start 50px below
    },
    visible: {
      opacity: 1,
      y: 0, // Move to original position
      transition: {
        duration: 0.6, // Animation duration
        ease: "easeOut", // Smooth easing
        delay: 0.2, // Slight delay for effect
      },
    },
  };

  return (
    <div className="flex items-center justify-center w-full p-6 min-h-svh md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          {/* Wrap Card with motion.div for animation */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">Register</CardTitle>
                <CardDescription>Create an account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(submitForm)}>
                  <div className="flex flex-col gap-6">
                    {/* Nom complet */}
                    <div className="grid gap-3">
                      <Label htmlFor="name">Full name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        {...register("name")}
                      />
                      {formErrors.name && (
                        <p className="text-sm text-red-500">{formErrors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="relative grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...register("email")}
                        onBlur={emailOnBlurHandler}
                        className={cn(
                          emailAvailabilityStatus === "available" && "border-green-500",
                          emailAvailabilityStatus === "notAvailable" && "border-red-500"
                        )}
                      />
                      {emailAvailabilityStatus === "available" && (
                        <CheckCircle
                          className="absolute right-3 top-[48%] translate-y-[-50%] text-green-500"
                          size={20}
                        />
                      )}
                      {emailAvailabilityStatus === "notAvailable" && (
                        <XCircle
                          className="absolute right-3 top-[48%] translate-y-[-50%] text-red-500"
                          size={20}
                        />
                      )}
                      {formErrors.email?.message && (
                        <p className="text-sm text-red-500">{formErrors.email.message}</p>
                      )}
                      {!formErrors.email?.message &&
                        emailAvailabilityStatus === "notAvailable" && (
                          <p className="text-sm text-red-500">This email is already taken.</p>
                        )}
                      {!formErrors.email?.message &&
                        emailAvailabilityStatus === "available" && (
                          <p className="text-sm text-green-500">This email is available.</p>
                        )}
                    </div>

                    {/* Mot de passe */}
                    <div className="grid gap-3">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        {...register("password")}
                      />
                      {formErrors.password && (
                        <p className="text-sm text-red-500">{formErrors.password.message}</p>
                      )}
                    </div>

                    {/* Confirmation */}
                    <div className="grid gap-3">
                      <Label htmlFor="password_confirmation">Confirm Password</Label>
                      <Input
                        id="password_confirmation"
                        type="password"
                        {...register("password_confirmation")}
                      />
                      {formErrors.password_confirmation && (
                        <p className="text-sm text-red-500">
                          {formErrors.password_confirmation.message}
                        </p>
                      )}
                    </div>

                    {/* Boutons */}
                    <div className="flex flex-col gap-3">
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 border hover:bg-white hover:text-black hover:border-blue-500"
                        disabled={loading === "pending" || emailAvailabilityStatus === "checking"}
                      >
                        {loading === "pending" ? "Registering..." : "Register"}
                      </Button>
                      <div className="mt-2 text-sm text-center">
                        Want to sell with us?{" "}
                        <Link
                          to="/register-as-vendor"
                          className="text-blue-600 underline underline-offset-4"
                        >
                          Join as a Vendor
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-center">
                    Do you have an account?{" "}
                    <Link
                      to="/login"
                      className="text-blue-600 underline underline-offset-4"
                    >
                      Login
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

export default RegisterForm;