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
import { useAppDispatch } from "@/components/store/hooks";
import actAuthLogin from "@/components/store/auth/act/actAuthLogin";


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await dispatch(actAuthLogin({ email, password })).unwrap();

      // Extraire le token et le rôle de la réponse
      const { accessToken, role } = response;
      console.log(accessToken);

      // Sauvegarder le token dans le localStorage
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
      // Rediriger l'utilisateur en fonction de son rôle
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "vendor") {
        navigate("/vendor/dashboard");
      } else {
        navigate("/customer");
      }
    } catch (err) {
      // Gérer les erreurs de connexion
      setError(err.payload || "Login failed. Please try again.");
    } finally {
      // Désactiver l'état de chargement
      setLoading(false);
    }
  };


  

  return (
    <div className="flex items-center justify-center w-full p-6 min-h-svh md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
         <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-4xl">Welcome back</CardTitle>
              <CardDescription>
                Login with your Email or Google account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/reset-password/send-otp"
                        className="inline-block ml-auto text-sm text-blue-600 underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-center text-red-500">{error}</p>
                  )}
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full bg-blue-600" disabled={loading}>
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                    <Button variant="outline" className="w-full">
                      Login with Google
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-sm text-center">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="text-blue-600 underline underline-offset-4">
                    Sign up
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