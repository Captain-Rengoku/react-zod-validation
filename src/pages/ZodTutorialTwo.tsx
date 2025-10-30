import { useState } from "react";
import { LoaderPinwheel, ToggleLeft, ToggleRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema, type UserForm } from "../types/zodtutorialtwo";

const ZodTutorialTwo = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "test@gmail.com",
    },
    resolver: zodResolver(userFormSchema),
  });

  // demonstrating specific field and general errors
  const [backendBlocked, setBackendBlocked] = useState(false);

  const onSubmit = async (data: UserForm) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      if (backendBlocked) throw new Error();
      console.log(data);
      alert(`FormData Submitted: ${JSON.stringify(data, null, 2)}`);
    } catch {
      // setError("email", {
      //   message: "This email is already taken",
      // });
      setError("root", {
        message: "Some backend error has happened",
      });
    }
  };

  return (
    <div className="min-h-[95svh] bg-slate-950 flex flex-col items-center justify-center p-6 text-white">
      <div className="w-full sm:max-w-3xl bg-slate-900 rounded-2xl p-8 shadow-xl backdrop-blur-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400 text-center mb-6">
          React Hook Form <span className="text-slate-400">+</span> Zod <span className="text-slate-400">+</span> zodResolver
        </h1>
        <div className="flex justify-end items-center text-xl text-slate-400 gap-2 mb-6">
          {backendBlocked ? "Backend Blocked" : "Backend Linked"}
          <button
            onClick={() => setBackendBlocked((prev) => !prev)}
            className="cursor-pointer outline-none transition-transform duration-200 active:scale-90"
          >
            {backendBlocked ? (
              <ToggleRight size={28} className="text-red-500" />
            ) : (
              <ToggleLeft size={28} className="text-green-500" />
            )}
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* First Name */}
          <div className="flex flex-col">
            <label className="text-sm text-indigo-300 font-semibold mb-1">
              First Name:
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              className={`p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ${
                errors.firstName
                  ? "focus:ring-red-400"
                  : "focus:ring-indigo-500"
              }`}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-400 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Middle Name */}
          <div className="flex flex-col">
            <label className="text-sm text-indigo-300 font-semibold mb-1">
              Middle Name:
            </label>
            <input
              type="text"
              placeholder="Enter middle name (optional)"
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("middleName")}
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="text-sm text-indigo-300 font-semibold mb-1">
              Last Name:
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              className={`p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ${
                errors.lastName ? "focus:ring-red-400" : "focus:ring-indigo-500"
              }`}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-400 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm text-indigo-300 font-semibold mb-1">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ${
                errors.email ? "focus:ring-red-400" : "focus:ring-indigo-500"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm text-indigo-300 font-semibold mb-1">
              Password:
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className={`p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ${
                errors.password ? "focus:ring-red-400" : "focus:ring-indigo-500"
              }`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`flex justify-center items-center w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition duration-300 ${
              isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex justify-center items-center gap-1">
                <LoaderPinwheel className="animate-spin" />
                Submitting...
              </span>
            ) : (
              "Submit"
            )}
          </button>
          {errors.root && (
            <p className="text-red-400 text-center text-sm mt-1">
              {errors.root.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ZodTutorialTwo;
