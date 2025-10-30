import z from "zod";

// ✅ Define Zod Schema (Validation Rules)
export const FormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters"),

  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password too long"),

  confirmPassword: z
    .string()
    .min(6, "Please confirm your password"),

  age: z
    .number()
    .min(18, "You must be at least 18 years old")
    .max(120, "Age must be below 120"),

  gender: z.enum(["male", "female", "other"], "Gender is required"),

  hobbies: z
    .array(z.string())
    .min(1, "Select at least one hobby"),

  country: z
    .string()
    .nonempty("Country selection is required"),

  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(200, "Bio should not exceed 200 characters"),

  dob: z
    .string()
    .nonempty("Date of birth is required"),

  terms: z
    .literal(true, "You must accept the terms and conditions"),

  profilePicture: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Profile picture is required")
    .refine(
      (files) => ["image/jpeg", "image/png"].includes(files[0]?.type),
      "Only JPG or PNG allowed"
    ),
})
.refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export type FormData = z.infer<typeof FormSchema>;