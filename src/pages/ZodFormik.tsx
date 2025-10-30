import React from "react";
import { useFormik, FieldArray, FormikProvider } from "formik";
import { formSchema, type FormData } from "../types/zodformik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import simulatedApi from "../api/formikapi";

const FormikZod: React.FC = () => {
  // Single hook replaces all that useState mess!
  const formik = useFormik<FormData>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: 18,
      gender: "male",
      address: { city: "", state: "" },
      hobbies: [{ name: "" }],
      startDate: new Date(),
      subscribe: false,
      referral: "",
    },

    // Schema validation - no more manual validation!
    validationSchema: toFormikValidationSchema(formSchema),

    onSubmit: async (values, { setSubmitting }) => {
      const response = await simulatedApi(values);
      console.log("Success:", response);
      setSubmitting(false);
    },
  });

  // Destructure formik for cleaner code!
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = formik;

  return (
    <div className="min-h-[95svh] flex flex-col justify-center items-center bg-slate-950">
      <FormikProvider value={formik}>
        <form
          onSubmit={handleSubmit}
          className="w-4xl my-16 bg-slate-900 shadow-xl rounded-2xl p-8 flex flex-col gap-6"
        >
          <h1 className="text-2xl font-bold text-indigo-500 text-center">
            Formik <span className="text-slate-400">+</span> Zod{" "}
            <span className="text-slate-400">Registration Form</span>
          </h1>

          {/* FIRST NAME */}
          <div className="flex flex-col">
            <label className="text-indigo-300 font-bold">First Name</label>
            <input
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-800 text-slate-100"
            />
            {touched.firstName && errors.firstName && (
              <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* LAST NAME */}
          <div className="flex flex-col">
            <label className="text-indigo-300 font-bold">Last Name</label>
            <input
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-800 text-slate-100"
            />
            {touched.lastName && errors.lastName && (
              <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* EMAIL */}
          <div className="flex flex-col">
            <label className="text-indigo-300 font-bold">Email</label>
            <input
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-800 text-slate-100"
            />
            {touched.email && errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* AGE */}
          <div className="flex flex-col">
            <label className="text-indigo-300 font-bold">Age</label>
            <input
              type="number"
              name="age"
              value={values.age}
              onChange={(e) =>
                setFieldValue("age", parseInt(e.target.value) || 0)
              }
              onBlur={handleBlur}
              className="border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-800 text-slate-100"
            />
            {touched.age && errors.age && (
              <p className="text-sm text-red-500 mt-1">{errors.age}</p>
            )}
          </div>

          {/* GENDER */}
          <div className="flex flex-col">
            <label className="text-indigo-300 font-bold">Gender</label>
            <select
              name="gender"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-800 text-slate-100"
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {touched.gender && errors.gender && (
              <p className="text-sm text-red-500 mt-1">{errors.gender}</p>
            )}
          </div>

          {/* ADDRESS */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-indigo-300 font-bold">City</label>
              <input
                name="address.city"
                value={values.address.city}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="City"
                className="border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-800 text-slate-100"
              />
              {touched.address?.city && errors.address?.city && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.address.city}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-indigo-300 font-bold">State</label>
              <input
                name="address.state"
                value={values.address.state}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="State"
                className="border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-800 text-slate-100"
              />
              {touched.address?.state && errors.address?.state && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.address.state}
                </p>
              )}
            </div>
          </div>

          {/* DATE PICKER */}
          <div className="flex flex-col">
            <label className="text-indigo-300 font-bold">Start Date</label>
            <DatePicker
              selected={values.startDate}
              onChange={(date: Date | null) =>
                setFieldValue("startDate", date || new Date())
              }
              className="border border-slate-700 rounded-lg px-3 py-2 w-full bg-slate-800 text-slate-100"
            />
          </div>

          {/* HOBBIES */}
          <div>
            <label className="text-indigo-300 font-bold">Hobbies</label>
            <FieldArray name="hobbies">
              {({ push, remove }) => (
                <div className="flex flex-col gap-4">
                  {values.hobbies.map((hobby, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        name={`hobbies[${index}].name`}
                        value={hobby.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Hobby Name"
                        className="flex-1 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-800 text-slate-100"
                      />
                      {values.hobbies.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-sm bg-red-700 hover:bg-red-800 px-2 py-3 font-bold rounded-lg cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ name: "" })}
                    className="text-indigo-300 p-2 font-bold rounded-lg bg-slate-700 hover:bg-slate-700/80 cursor-pointer"
                  >
                    + Add Hobby
                  </button>
                </div>
              )}
            </FieldArray>
          </div>

          {/* SUBSCRIBE */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sub"
              name="subscribe"
              checked={values.subscribe}
              onChange={handleChange}
              className="w-4 h-4 accent-indigo-500"
            />
            <label htmlFor="sub" className="text-indigo-300 font-bold">
              Subscribe to Newsletter
            </label>
          </div>

          {/* REFERRAL */}
          {values.subscribe && (
            <div className="flex flex-col">
              <label className="text-indigo-300 font-bold">
                Referral Source
              </label>
              <input
                name="referral"
                value={values.referral}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="How did you hear about us?"
                className="border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-800 text-slate-100"
              />
              {touched.referral && errors.referral && (
                <p className="text-sm text-red-500 mt-1">{errors.referral}</p>
              )}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </FormikProvider>
    </div>
  );
};

export default FormikZod;
