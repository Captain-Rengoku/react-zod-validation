import z from "zod";

export const userFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must contain at least 2 letters")
    .max(10, "First name maximum 10 characters long"),
  middleName: z
    .string()
    .nullish(),
  lastName: z
    .string()
    .regex(/^[A-Za-z]+$/i, "Last Name is not as per the rules (letters only)")
    .min(2, "Last name must contain at least 2 letters")
    .max(10, "Last name maximum 10 characters long"),
  email: z
    .string()
    .email("Enter a valid email id"),
  password: z
    .string()
    .regex(/[0-9]/, "Password must include at least one number")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[^A-Za-z0-9]/, "Password must include at least one special character")
    .min(8, "Password must contain at least 8 characters"),
})

export type UserForm = z.infer<typeof userFormSchema>

