import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { actAuthRegister } from "../store/auth/authSlice"

export function RegisterVendorForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "vendor", //default role
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifier que les mots de passe correspondent
    if (formData.password !== formData.password_confirmation) {
      alert("Passwords do not match.");
      return;
    }

    // Envoyer les données d'inscription
    dispatch(actAuthRegister(formData))
      .unwrap()
      .then(() => {

       

        // Rediriger vers la page customer
        navigate("/login");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
              <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl ">Register </CardTitle>
          <CardDescription>
            Join with us as a vendor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
                 <div className="grid gap-3">
                <Label htmlFor="email">Full name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name "
                  value={formData.name}
                  onChange={(e) =>
                   setFormData({ ...formData, name: e.target.value })
                      }
                  required
                />
              </div>
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
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  
                </div>
                <Input id="password" type="password"
                  value={formData.password}
                  onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                  }
                required />
              </div>
       
               <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                  
                </div>
                <Input id="password_confirmation" type="password"
                value={formData.password_confirmation}
                onChange={(e) =>
                setFormData({ ...formData, password_confirmation: e.target.value })
                }
                required />
              </div>

              {/* Affichage des erreurs */}
                  {error && (
                    <p className="text-sm text-red-500 text-center">{error}</p>
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
                <Link to={'/register'}>
                <Button variant="outline" className="w-full">
                    Join as a customer
                </Button>
                </Link>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Do you have an account?{" "}
              <Link to={'/login'} className="underline underline-offset-4 text-blue-600">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>  
         </div>
         </div>
   
  )
}
