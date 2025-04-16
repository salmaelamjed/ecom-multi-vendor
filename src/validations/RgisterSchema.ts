import { z } from "zod";

const registerSchema = z
  .object({
    name: z.string().min(3, {
      message: "The name is required and must be at least 3 characters long.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        }
      ),
    password_confirmation: z.string(),

    role: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match.",
    path: ["password_confirmation"],
  });

type TFormInputs = z.infer<typeof registerSchema>;
export type { TFormInputs };
export { registerSchema };
