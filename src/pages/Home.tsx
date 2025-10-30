import { ZodDemoOne, ZodDemoTwo } from "./ZodDemo";

const Home = () => {
  return (
    <div className="min-h-[95svh] bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-7xl w-7xl flex flex-col justify-center items-center gap-4 bg-slate-900 backdrop-blur-lg rounded-2xl p-8 shadow-2xl text-center">
        <div>
          <h1 className="text-indigo-400 text-2xl sm:text-3xl font-bold">
            Zod Validation
          </h1>
          <p className="text-indigo-300 text-2xl">
            <span className="text-slate-500">with</span> React Hook Form{" "}
            <span className="text-slate-500">and</span> Formik
          </p>
        </div>
        <ZodDemoOne />
        <ZodDemoTwo />
      </div>
    </div>
  );
};

export default Home;
