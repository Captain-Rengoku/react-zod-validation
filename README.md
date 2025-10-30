# Zod Validation Examples

```tsx
import { z } from "zod";

// ===============================
// 📘 Primitive Schemas
// ===============================
const _stringSchema = z.string();
const _numberSchema = z.number();
const _booleanSchema = z.boolean();
const _dateSchema = z.date();
const _bigintSchema = z.bigint();
const _nullSchema = z.null();
const _undefinedSchema = z.undefined();
const _neverSchema = z.never();

// ===============================
// 📘 String Validations
// ===============================
const _minLengthSchema = z.string().min(3);
const _maxLengthSchema = z.string().max(10);
const _emailSchema = z.string().email();
const _regexSchema = z.string().regex(/^[A-Za-z]+$/, "Only letters allowed");

// ===============================
// 📘 Number Validations
// ===============================
const _positiveSchema = z.number().positive();
const _negativeSchema = z.number().negative();
const _intSchema = z.number().int();
const _rangeSchema = z.number().min(10).max(100);

// ===============================
// 📘 Array Schema
// ===============================
const _arraySchema = z.array(z.string());
const _nonEmptyArray = z.array(z.number()).nonempty("Array must not be empty");

// ===============================
// 📘 Object Schema
// ===============================
const userSchema = z.object({
  name: z.string(),
  age: z.number().min(18),
  email: z.string().email(),
  isAdmin: z.boolean().optional(),
});

// ===============================
// 📘 Nested / Recursive Schema
// ===============================
const categorySchema = z.lazy(() =>
  z.object({
    name: z.string(),
    subcategories: z.array(categorySchema).optional(),
  })
);

// ===============================
// 📘 Union / Intersection
// ===============================
const stringOrNumberSchema = z.union([z.string(), z.number()]);
const intersectionSchema = z.intersection(
  z.object({ name: z.string() }),
  z.object({ age: z.number() })
);

// ===============================
// 📘 Enum & Literal
// ===============================
const colorEnum = z.enum(["red", "green", "blue"]);
const literalSchema = z.literal("constant_value");

// ===============================
// 📘 Tuple & Record
// ===============================
const tupleSchema = z.tuple([z.string(), z.number()]);
const recordSchema = z.record(z.string(), z.number());

// ===============================
// 📘 Optional, Nullable, Default
// ===============================
const optionalSchema = z.string().optional();
const nullableSchema = z.string().nullable();
const defaultSchema = z.string().default("Anonymous");

// ===============================
// 📘 Transformations
// ===============================
const trimmedString = z.string().transform((val) => val.trim());
const numberFromString = z
  .string()
  .transform((val) => parseInt(val))
  .refine((num) => !isNaN(num), { message: "Must be a number string" });

// ===============================
// 📘 Refinements (Custom Rules)
// ===============================
const passwordSchema = z
  .string()
  .min(8, "Password too short")
  .refine((val) => /[A-Z]/.test(val), "Must include an uppercase letter")
  .refine((val) => /\d/.test(val), "Must include a number");

// ===============================
// 📘 Safe Parse (Error Handling)
// ===============================
try {
  const result = userSchema.parse({
    name: "John",
    age: 25,
    email: "john@gmail.com",
  });
  console.log("✅ Parsed successfully:", result);
} catch (e) {
  if (e instanceof z.ZodError) {
    console.error("❌ Validation errors:", e.errors);
  } else {
    console.error("❌ Unknown error:", e);
  }
}

// ===============================
// 📘 Example Recursive Safe Parse
// ===============================
try {
  const category = categorySchema.parse({
    name: "Tech",
    subcategories: [{ name: "AI" }, { name: "Web" }],
  });
  console.log("✅ Category parsed:", category);
} catch (e) {
  if (e instanceof z.ZodError) {
    console.error("❌ Recursive schema errors:", e.errors);
  } else {
    console.error("❌ Unknown error:", e);
  }
}

// ===============================
// 📘 Type Inference Example
// ===============================
type User = z.infer<typeof userSchema>;
const sampleUser: User = { name: "Alice", age: 21, email: "alice@mail.com" };
```
