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
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/components/store/hooks";
import actAuthRegister from "@/components/store/auth/act/actAuthRegister";

import { toast } from 'sonner';

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "customer", 
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifier que les mots de passe correspondent
    if (formData.password !== formData.password_confirmation) {
      toast.error("Passwords do not match.");
      return;
    }

    // Envoyer les données d'inscription
    dispatch(actAuthRegister(formData))
      .unwrap()
      .then(() => {
        toast.success("Registration successful! login into your account...");
        setTimeout(() => {
          navigate("/login");
        }, 1000); 
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        toast.error("Registration failed. Please try again.");
      });
  };

  return (
    <div className="flex items-center justify-center w-full p-6 min-h-svh md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Register</CardTitle>
              <CardDescription>Create an account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  {/* Champ Nom complet */}
                  <div className="grid gap-3">
                    <Label htmlFor="name">Full name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Champ Email */}
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Champ Mot de passe */}
                  <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Champ Confirmation du mot de passe */}
                  <div className="grid gap-3">
                    <Label htmlFor="password_confirmation">
                      Confirm Password
                    </Label>
                    <Input
                      id="password_confirmation"
                      type="password"
                      value={formData.password_confirmation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password_confirmation: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {/* Affichage des erreurs */}
                  {error && (
                    <p className="text-sm text-center text-red-500">{error}</p>
                  )}

                  {/* Bouton d'inscription */}
                  <div className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      className="w-full bg-blue-600"
                      disabled={loading === "pending"}
                    >
                      {loading === "pending" ? "Registering..." : "Register"}
                    </Button>
                     <Link to={'/register-as-vendor'}>
                        <Button variant="outline" className="w-full">
                          Join with us as a seller
                        </Button>
                     </Link>
                  </div>
                </div>

                {/* Lien vers la page de connexion */}
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
        </div>
      </div>
    </div>
  );
}