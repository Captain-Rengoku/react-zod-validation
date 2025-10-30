import { useState } from "react";
import { NavLink } from "react-router";
import { FormInput } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/zodtutorial", label: "Zod Tutorial" },
  { to: "/zodtutorialtwo", label: "Zod Tutorial Two" },
  { to: "/zodtutorialthree", label: "Zod Tutorial Three" },
  { to: "/random-url", label: "Random URL" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="h-[5svh] bg-slate-900 text-white shadow-md px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <NavLink to="/" className="hover:text-slate-300">
            <FormInput size={24}/>
          </NavLink>
        </div>

        {/* Hamburger icon for small screens */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 14"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h19"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-lg">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `block py-1 text-lg hover:text-slate-300
                ${isActive ? "text-indigo-500 underline underline-offset-4" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900 text-white px-4 pb-4 space-y-2">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `block py-1 text-lg hover:text-slate-300
                ${isActive ? "text-indigo-500 underline underline-offset-4" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}
