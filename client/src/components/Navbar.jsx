import React from "react";
import { Link } from "react-router-dom";
import assets from "../assets/assets.js";
import { useAuth } from "../pages/AuthContext.jsx";
import { TicketIcon } from "lucide-react";

const Navbar = () => {
  const { user } = useAuth();
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Theaters", path: "/" },
    { name: "Releases", path: "/" },
    { name: "Favorites", path: "/favorite" },
  ];
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 
      ${
        isScrolled
          ? "bg-black shadow-md backdrop-blur-md text-white"
          : "bg-transparent text-white"
      }`}
      >
        <div className="flex items-center justify-between px-6 md:px-16 lg:px-36 py-5">
          {/* logo */}
          <Link to="/" className="max-md:flex-1">
            <img src={assets.logo} alt="" className="w-36 h-auto" />
          </Link>
          <div className="hidden min-[868px]:flex items-center gap-8 bg-white/20 backdrop-blur border px-6 py-1 rounded-3xl shrink-0">
            {/* nav link */}
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className=" flex flex-col gap-1 pt-1 "
              >
                {link.name}
                <span
                  className={` 
                ${isScrolled ? "bg-gray-800" : "bg-white"}`}
                />
              </Link>
            ))}
          </div>
          {/* login btn */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {!user && (
              <Link to="/register">
                <button className="bg-primary text-white px-4 py-1 rounded-full cursor-pointer">
                  Login
                </button>
              </Link>
            )}

            {user && (
              <Link to="/profile">
                <div className="w-9 h-9 rounded-full bg-gray-700 text-white flex items-center justify-center cursor-pointer">
                  {user.username[0].toUpperCase()}
                </div>
              </Link>
            )}

            {/* menu btn */}
            <button
              className="min-[868px]:hidden cursor-pointer shrink-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        {/* mobile menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-transparent backdrop-blur-2xl text-white z-40
        flex flex-col items-center justify-center gap-8 text-xl transition-transform duration-500
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <button
            className="absolute top-5 right-5 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          >
            ✕
          </button>
          {/* mobile menu link */}
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
