import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { LoaderPinwheel, ToggleLeft, ToggleRight } from "lucide-react";
import { FormSchema, type FormData } from "../types/zodformiktwo";

export default function ZodFormikTwo() {
  const [backendBlocked, setBackendBlocked] = useState(false);

  const initialValues: FormData = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: 18,
    gender: "male",
    hobbies: [],
    country: "",
    bio: "",
    dob: "",
    terms: true,
    profilePicture: undefined as unknown as FileList,
  };

  return (
    <div className="min-h-[95svh] bg-slate-950 flex flex-col items-center justify-center p-6 text-white">
      <div className="w-full sm:max-w-3xl bg-slate-900 rounded-2xl p-8 shadow-xl backdrop-blur-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400 text-center mb-6">
          Formik <span className="text-slate-400">+</span> Zod
          <span className="text-slate-400"> — Full Validation Form</span>
        </h1>

        <div className="flex justify-end items-center text-xl text-slate-400 gap-2 mb-6">
          {backendBlocked ? "Backend Blocked" : "Backend Linked"}
          <button
            onClick={() => setBackendBlocked((p) => !p)}
            className="cursor-pointer transition-transform duration-200 active:scale-90"
          >
            {backendBlocked ? (
              <ToggleRight size={28} className="text-red-500" />
            ) : (
              <ToggleLeft size={28} className="text-green-500" />
            )}
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(FormSchema)}
          onSubmit={async (values, { setSubmitting, setFieldError, resetForm }) => {
            try {
              await new Promise((res) => setTimeout(res, 2500));
              if (backendBlocked) throw new Error("Server error");
              console.log("Form Data:", values);
              alert("Form submitted successfully!");
              resetForm();
            } catch {
              setFieldError("email", "This email is already taken");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-5 text-sm sm:text-base">
              {/* Username */}
              <div>
                <label className="text-indigo-300 font-semibold mb-1 block">
                  Username:
                </label>
                <Field
                  name="username"
                  className="p-2 rounded-lg bg-slate-800 border border-slate-700 w-full"
                  placeholder="Enter username"
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-indigo-300 font-semibold mb-1 block">
                  Email:
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="p-2 rounded-lg bg-slate-800 border border-slate-700 w-full"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-indigo-300 font-semibold mb-1 block">
                  Password:
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="p-2 rounded-lg bg-slate-800 border border-slate-700 w-full"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-indigo-300 font-semibold mb-1 block">
                  Confirm Password:
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  className="p-2 rounded-lg bg-slate-800 border border-slate-700 w-full"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* Age */}
              <div>
                <label className="text-indigo-300 font-semibold mb-1 block">
                  Age:
                </label>
                <Field
                  type="number"
                  name="age"
                  className="p-2 rounded-lg bg-slate-800 border border-slate-700 w-full"
                />
                <ErrorMessage
                  name="age"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* Gender */}
              <fieldset className="border border-slate-700 rounded-lg p-3">
                <legend className="text-indigo-300 font-semibold">Gender:</legend>
                <div className="flex gap-4 mt-2">
                  {["male", "female", "other"].map((g) => (
                    <label key={g} className="flex items-center gap-1">
                      <Field type="radio" name="gender" value={g} /> {g}
                    </label>
                  ))}
                </div>
                <ErrorMessage
                  name="gender"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </fieldset>

              {/* Hobbies */}
              <fieldset className="border border-slate-700 rounded-lg p-3">
                <legend className="text-indigo-300 font-semibold">Hobbies:</legend>
                <div className="flex gap-4 flex-wrap mt-2">
                  {["reading", "music", "travel"].map((hobby) => (
                    <label key={hobby}>
                      <Field
                        type="checkbox"
                        name="hobbies"
                        value={hobby}
                      />{" "}
                      {hobby}
                    </label>
                  ))}
                </div>
                <ErrorMessage
                  name="hobbies"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </fieldset>

              {/* Country */}
              <div>
                <label className="text-indigo-300 font-semibold mb-1 block">
                  Country:
                </label>
                <Field
                  as="select"
                  name="country"
                  className="p-2 rounded-lg bg-slate-800 border border-slate-700 w-full"
                >
                  <option value="">Select country</option>
                  <option value="india">India</option>
                  <option value="usa">USA</option>
                  <option value="uk">UK</option>
                </Field>
                <ErrorMessage
                  name="country"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="text-indigo-300 font-semibold mb-1 block">
                  Bio:
                </label>
                <Field
                  as="textarea"
                  name="bio"
                  rows={3}
                  className="p-2 rounded-lg bg-slate-800 border border-slate-700 w-full"
                  placeholder="Tell something about yourself"
                />
                <ErrorMessage
                  name="bio"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* DOB */}
              <div>
                <label className="text-indigo-300 font-semibold mb-1 block">
                  Date of Birth:
                </label>
                <Field
                  type="date"
                  name="dob"
                  className="p-2 rounded-lg bg-slate-800 border border-slate-700 w-full"
                />
                <ErrorMessage
                  name="dob"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* File */}
              <div>
                <label className="text-indigo-300 font-semibold mb-1 block">
                  Profile Picture:
                </label>
                <input
                  type="file"
                  name="profilePicture"
                  accept="image/*"
                  onChange={(e) =>
                    setFieldValue("profilePicture", e.currentTarget.files?.[0])
                  }
                  className="text-slate-300 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-indigo-600 file:text-white file:cursor-pointer hover:file:bg-indigo-700"
                />
                <ErrorMessage
                  name="profilePicture"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              {/* Terms */}
              <label className="flex items-center gap-2 text-indigo-300 font-semibold">
                <Field type="checkbox" name="terms" /> I accept the terms and
                conditions
              </label>
              <ErrorMessage
                name="terms"
                component="p"
                className="text-red-400 text-sm mt-1"
              />

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex justify-center items-center w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition duration-300 ${
                  isSubmitting ? "cursor-not-allowed opacity-80" : ""
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
