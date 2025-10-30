import { useState } from "react";
import { userFormSchema, type FormErrorsType, type UserForm } from "../types/zodtutorial";

const ZodTutorial = () => {
  const initialForm: UserForm = {
    name: "",
    age: 0,
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "male",
  };

  const [formData, setFormData] = useState<UserForm>(initialForm);
  const [errors, setErrors] = useState<FormErrorsType>({});

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "age" ? Number(value) : value,
    });
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = userFormSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const formattedErrors: Record<string, string> = Object.fromEntries(
        Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0] ?? ""])
      );
      setErrors(formattedErrors);
    } else {
      setErrors({});
      console.log("✅ Valid Form Data:", formData);
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="min-h-[95svh] bg-slate-950 flex flex-col items-center justify-center p-6 text-white">
      <div className="w-full sm:max-w-3xl bg-slate-900 rounded-2xl p-8 shadow-xl backdrop-blur-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400 text-center mb-6">
          Zod Demo Form
        </h1>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          {/* Name */}
          <label className="flex flex-col">
            <span className="text-sm text-indigo-300 font-semibold mb-1">Name</span>
            <input
              type="text"
              onChange={inputChangeHandler}
              name="name"
              value={formData.name}
              placeholder="Enter your full name"
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </label>

          {/* Age */}
          <label className="flex flex-col">
            <span className="text-sm text-indigo-300 font-semibold mb-1">Age</span>
            <input
              type="number"
              onChange={inputChangeHandler}
              name="age"
              value={formData.age}
              placeholder="Enter your age"
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.age && <p className="text-red-400 text-sm mt-1">{errors.age}</p>}
          </label>

          {/* Email */}
          <label className="flex flex-col">
            <span className="text-sm text-indigo-300 font-semibold mb-1">Email</span>
            <input
              type="email"
              onChange={inputChangeHandler}
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </label>

          {/* Password */}
          <label className="flex flex-col">
            <span className="text-sm text-indigo-300 font-semibold mb-1">Password</span>
            <input
              type="password"
              onChange={inputChangeHandler}
              name="password"
              value={formData.password}
              placeholder="Enter password"
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </label>

          {/* Confirm Password */}
          <label className="flex flex-col">
            <span className="text-sm text-indigo-300 font-semibold mb-1">
              Confirm Password
            </span>
            <input
              type="password"
              onChange={inputChangeHandler}
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Re-enter password"
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </label>

          {/* Phone */}
          <label className="flex flex-col">
            <span className="text-sm text-indigo-300 font-semibold mb-1">
              Phone Number
            </span>
            <input
              type="tel"
              onChange={inputChangeHandler}
              name="phone"
              value={formData.phone}
              placeholder="Enter phone number"
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </label>

          {/* Gender */}
          <label className="flex flex-col">
            <span className="text-sm text-indigo-300 font-semibold mb-1">Gender</span>
            <select
              name="gender"
              onChange={inputChangeHandler}
              value={formData.gender}
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender}</p>}
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-semibold py-2 rounded-lg shadow-md cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ZodTutorial;
