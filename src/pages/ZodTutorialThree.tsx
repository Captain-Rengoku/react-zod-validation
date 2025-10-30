// Covers: text, email, password, number, radio, checkbox, select, textarea, date, file, etc.
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderPinwheel, ToggleLeft, ToggleRight } from "lucide-react";
import { FormSchema, type FormData } from "../types/zodtutorialthree";
import { useState } from "react";

export default function ZodTutorialThree() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    // reset,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
  });

  // demonstrating specific field and general errors
  const [backendBlocked, setBackendBlocked] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      if (backendBlocked) throw new Error();
      console.log("Form Submitted:", data);
      alert("Form submitted successfully!");
      // reset();
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
          React Hook Form <span className="text-slate-400">+</span> Zod
          <span className="text-slate-400"> — Full Validation Form</span>
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 text-sm sm:text-base"
        >
          {/* Username */}
          <div className="flex flex-col">
            <label className="text-indigo-300 font-semibold mb-1">
              Username:
            </label>
            <input
              type="text"
              placeholder="Enter username"
              {...register("username")}
              className={`p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ${
                errors.username ? "focus:ring-red-400" : "focus:ring-indigo-500"
              }`}
            />
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-indigo-300 font-semibold mb-1">Email:</label>
            <input
              type="email"
              placeholder="Enter email"
              {...register("email")}
              className={`p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ${
                errors.email ? "focus:ring-red-400" : "focus:ring-indigo-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Password */}
          <div className="flex flex-col">
            <label className="text-indigo-300 font-semibold mb-1">
              Password:
            </label>
            <input
              type="password"
              placeholder="Enter password"
              {...register("password")}
              className={`p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ${
                errors.password ? "focus:ring-red-400" : "focus:ring-indigo-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="text-indigo-300 font-semibold mb-1">
              Confirm Password:
            </label>
            <input
              type="password"
              placeholder="Re-enter password"
              {...register("confirmPassword")}
              className={`p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "focus:ring-red-400"
                  : "focus:ring-indigo-500"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          {/* Age */}
          <div className="flex flex-col">
            <label className="text-indigo-300 font-semibold mb-1">Age:</label>
            <input
              type="number"
              placeholder="Enter your age"
              {...register("age", { valueAsNumber: true })}
              className={`p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ${
                errors.age ? "focus:ring-red-400" : "focus:ring-indigo-500"
              }`}
            />
            {errors.age && (
              <p className="text-red-400 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>
          {/* Gender */}
          <fieldset className="border border-slate-700 rounded-lg p-3">
            <legend className="text-indigo-300 font-semibold">Gender:</legend>
            <div className="flex gap-4 mt-2">
              <label>
                <input type="radio" value="male" {...register("gender")} /> Male
              </label>
              <label>
                <input type="radio" value="female" {...register("gender")} />{" "}
                Female
              </label>
              <label>
                <input type="radio" value="other" {...register("gender")} />{" "}
                Other
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-400 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </fieldset>
          {/* Hobbies */}
          <fieldset className="border border-slate-700 rounded-lg p-3">
            <legend className="text-indigo-300 font-semibold">Hobbies:</legend>
            <div className="flex gap-4 mt-2 flex-wrap">
              <label>
                <input
                  type="checkbox"
                  value="reading"
                  {...register("hobbies")}
                />{" "}
                Reading
              </label>
              <label>
                <input type="checkbox" value="music" {...register("hobbies")} />{" "}
                Music
              </label>
              <label>
                <input
                  type="checkbox"
                  value="travel"
                  {...register("hobbies")}
                />{" "}
                Travel
              </label>
            </div>
            {errors.hobbies && (
              <p className="text-red-400 text-sm mt-1">
                {errors.hobbies.message}
              </p>
            )}
          </fieldset>
          {/* Country */}
          <div className="flex flex-col">
            <label className="text-indigo-300 font-semibold mb-1">
              Country:
            </label>
            <select
              {...register("country")}
              className={`p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ${
                errors.country ? "focus:ring-red-400" : "focus:ring-indigo-500"
              }`}
            >
              <option value="">Select country</option>
              <option value="india">India</option>
              <option value="usa">USA</option>
              <option value="uk">UK</option>
            </select>
            {errors.country && (
              <p className="text-red-400 text-sm mt-1">
                {errors.country.message}
              </p>
            )}
          </div>
          {/* Bio */}
          <div className="flex flex-col">
            <label className="text-indigo-300 font-semibold mb-1">Bio:</label>
            <textarea
              {...register("bio")}
              rows={3}
              placeholder="Tell something about yourself"
              className={`p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ${
                errors.bio ? "focus:ring-red-400" : "focus:ring-indigo-500"
              }`}
            />
            {errors.bio && (
              <p className="text-red-400 text-sm mt-1">{errors.bio.message}</p>
            )}
          </div>
          {/* Date of Birth */}
          <div className="flex flex-col">
            <label className="text-indigo-300 font-semibold mb-1">
              Date of Birth:
            </label>
            <input
              type="date"
              {...register("dob")}
              className={`p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 ${
                errors.dob ? "focus:ring-red-400" : "focus:ring-indigo-500"
              }`}
            />
            {errors.dob && (
              <p className="text-red-400 text-sm mt-1">{errors.dob.message}</p>
            )}
          </div>
          {/* Profile Picture */}
          <div className="flex flex-col">
            <label className="text-indigo-300 font-semibold mb-1">
              Profile Picture:
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("profilePicture")}
              className="text-slate-300 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-indigo-600 file:text-white file:cursor-pointer hover:file:bg-indigo-700"
            />
            {errors.profilePicture && (
              <p className="text-red-400 text-sm mt-1">
                {errors.profilePicture.message}
              </p>
            )}
          </div>
          {/* Terms */}
          <label className="flex items-center gap-2 text-indigo-300 font-semibold">
            <input type="checkbox" {...register("terms")} />I accept the terms
            and conditions
          </label>
          {errors.terms && (
            <p className="text-red-400 text-sm mt-1">{errors.terms.message}</p>
          )}
          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex justify-center items-center w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition duration-300 ${
              isSubmitting ? "cursor-not-allowed opacity-80" : "cursor-pointer"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
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
}
