import { z } from "zod";

// -------------------------------------------------------------------------------------//

// ✅ Define your schema
const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  age: z.number().min(18, "You must be 18 or older"),
});

// ✅ Example data to validate
const formData = {
  username: "demo",
  email: "demo123@example.com",
  age: 19,
};

// ✅ Validate data
const resultOne = schema.safeParse(formData);

// if (!result.success) {
//   console.log(result.error.format());
// } else {
//   console.log("Validation passed:", result.data);
// }

export const ZodDemoOne = () => {
  return (
    <>
      <h1 className="text-2xl underline underline-offset-4 text-indigo-400">
        Zod Demo One
      </h1>
      <div className="text-4xl mb-8">
        {resultOne.data ? (
          <span>{resultOne.data.age}</span>
        ) : (
          <span>{resultOne.error.message}</span>
        )}
      </div>
    </>
  );
};

// -------------------------------------------------------------------------------------//

// ✅ object data type
const userSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  email: z.string().email(),
  profileUrl: z.string().url(),
  age: z.number().min(1),
  salary1: z.number().nullable(), // only null
  salary2: z.number().nullish(), // null or undefined
  friends: z.array(z.string()).max(3),
  settings: z.object({
    isSubscribed: z.boolean(),
  }),
});

// make type of the user from the schema
type User = z.infer<typeof userSchema>;

// an user example
const user: User = {
  firstName: "Elon",
  // middleName: "Br.",
  lastName: "Musk",
  email: "elonmusk@gamil.com",
  profileUrl: "https://elonmusk.vercel.app/",
  age: 12,
  salary1: null,
  salary2: undefined,
  friends: ["Sundar", "Jeef", "Bill"],
  settings: { isSubscribed: true },
};

// safely parse the user without making an error
const resultTwo = userSchema.safeParse(user);

export const ZodDemoTwo = () => {
  return (
    <>
      <h1 className="text-2xl underline underline-offset-4 text-indigo-400">
        Zod Demo Two
      </h1>
      {resultTwo.data ? (
        <span>
          {resultTwo.data.firstName}
          {resultTwo.data.middleName
            ? " " + resultTwo.data.middleName + " "
            : " "}
          {resultTwo.data.lastName}
          <br />
          {resultTwo.data.email}
          <br />
          {resultTwo.data.profileUrl}
          <br />
          {resultTwo.data.age}
          <br />
          {resultTwo.data.salary1 ? resultTwo.data.salary1 : "nullable"}
          <br />
          {resultTwo.data.salary2 ? resultTwo.data.salary2 : "nullish"}
          <br />
          {resultTwo.data.friends.map((friend) => (
            <span key={friend}>{friend} </span>
          ))}
          <br />
          {resultTwo.data.settings.isSubscribed ? "True" : "False"}
        </span>
      ) : (
        <span>{resultTwo.error.message}</span>
      )}
    </>
  );
};
