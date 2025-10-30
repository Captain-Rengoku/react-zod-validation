
const NotFound = () => {
  return (
    <div className="min-h-[95svh] flex flex-col items-center justify-center bg-slate-950 text-white text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-400 mb-6">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="w-32 bg-indigo-500 hover:bg-indigo-500/80 transition-colors py-2 rounded-md font-semibold"
      >
        Go Home
      </a>
    </div>
  );
};

export default NotFound;
