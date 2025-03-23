import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import actForgotPasswordSendOtp from '../store/auth/act/actForgotPasswordSendOtp';
import { useState } from 'react';
import { toast } from 'sonner'; // Ensure this import is correct
import {  updateEmail } from '../store/auth/forgotPasswordSlice ';
export function ResetPwdSendOtpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading} = useAppSelector((state) => state.forgotPassword);
  const [email, setEmail] = useState('');

 const handleSendOtp = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validation de l'email
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    toast.error('Veuillez entrer une adresse email valide.');
    return;
  }

  try {
    const response = await dispatch(actForgotPasswordSendOtp(email)).unwrap();

    if (response.success) {
      toast.success(response.message);
      navigate('/reset-password/verify-otp'); // Navigation après succès
      dispatch(updateEmail(email)); 
    } else {
      toast.error(response.message || 'Échec de l’envoi du OTP.');
    }
  } catch (err) {
    toast.error(err.response?.data?.message || 'Une erreur est survenue.');
    console.error('Erreur lors de l’envoi du OTP:', err);
  }
};



  return (
    <div className="flex items-center justify-center w-full p-6 min-h-svh md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn('flex flex-col gap-6', className)} {...props}>
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <CardTitle className="items-center justify-center text-2xl">
                Forgot Password
              </CardTitle>
              <CardDescription>
                Enter your email to receive an OTP.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSendOtp}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-500"
                    disabled={loading === 'pending'}
                  >
                    {loading === 'pending' ? 'Sending...' : 'Send OTP'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}