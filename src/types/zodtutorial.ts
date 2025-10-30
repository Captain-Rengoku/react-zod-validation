import z from "zod";

export const userFormSchema = z.object({
  name: z.string()
    .nonempty("Name is required")
    .min(4, "Name must have at least 4 character"),
  age: z.number()
    .int("Age must be a number")
    .min(9, "age should be above 8")
    .max(120, "age should be below 120"),
  email: z.string()
    .email("Invalid email"),
  password: z.string()
    .min(8, "password must have at least 8 character")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  phone: z.string()
    .min(10, "Phone number must be at least 10 characters"),
  gender: z.enum(["male", "female", "others"], { message: "Please select a valid gender" }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Password does not match",
  path: ["confirmPassword"]
});

// create a type for userform using z.infer on userFormSchema
export type UserForm = z.infer<typeof userFormSchema>;

// create a type for userform errors
export type FormErrorsType = Partial<Record<keyof UserForm, string>>;
// partial --> the error may or may not be present
// keyof --> the keys of  UserForm type
