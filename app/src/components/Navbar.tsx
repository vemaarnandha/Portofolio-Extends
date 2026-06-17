import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ScrollText } from "lucide-react";
import { isAuthenticated } from "@/lib/auth";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Project", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    isAuthenticated().then(setLoggedIn);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-arcane-900/50 bg-void-950/95 backdrop-blur supports-[backdrop-filter]:bg-void-950/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-heading font-bold text-arcane-500">
          <ScrollText className="h-6 w-6 text-arcane-500" />
          <span>ExFolio</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path} to={link.path}
              className={`group relative text-sm font-medium font-heading tracking-wider transition-all duration-200 hover:text-arcane-400 ${
                location.pathname === link.path ? "text-arcane-500" : "text-arcane-300/70"
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-arcane-500 to-rift-500 transition-all duration-300 max-md:hidden md:group-hover:w-full ${
                location.pathname === link.path ? "md:w-full" : "w-0"
              }`} />
            </Link>
          ))}
          <Link
            to={loggedIn ? "/admin/dashboard" : "/admin/login"}
            className="rounded-md bg-arcane-500 px-4 py-2 text-sm font-medium text-void-950 hover:bg-arcane-400 hover:shadow-glow transition-all duration-200 active:scale-[0.97]"
          >
            {loggedIn ? "Dashboard" : "Admin"}
          </Link>
        </div>
        <button
          className="md:hidden p-2 rounded-md text-arcane-300 hover:bg-arcane-900/50 hover:text-arcane-400 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-arcane-900/50 bg-void-950 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
              className={`block rounded-md px-3 py-2 text-sm font-heading tracking-wider transition-all duration-200 active:scale-[0.97] ${
                location.pathname === link.path
                  ? "bg-arcane-500/10 text-arcane-500"
                  : "text-arcane-300/70 hover:bg-arcane-900/30 hover:text-arcane-400"
              }`}
            >{link.label}</Link>
          ))}
          <Link
            to={loggedIn ? "/admin/dashboard" : "/admin/login"} onClick={() => setMobileOpen(false)}
            className="block rounded-md bg-arcane-500 px-4 py-2 text-sm font-medium text-void-950 hover:bg-arcane-400 transition-colors text-center"
          >
            {loggedIn ? "Dashboard" : "Admin"}
          </Link>
        </div>
      )}
    </nav>
  );
}
