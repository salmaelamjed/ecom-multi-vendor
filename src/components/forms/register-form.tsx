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
import { Link } from "react-router-dom"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
              <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl ">Register </CardTitle>
          <CardDescription>
            create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
                 <div className="grid gap-3">
                <Label htmlFor="email">Full name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name "
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  
                </div>
                <Input id="password" type="password" required />
              </div>
       
               <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                  
                </div>
                <Input id="password_confirmation" type="password" required />
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full bg-blue-600 ">
                  Register
                </Button>
                <Link to={'/register-as-vendor'}>
                <Button variant="outline" className="w-full">
                  Become a vendor
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
