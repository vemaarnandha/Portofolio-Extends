import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    isAuthenticated().then(setLoggedIn);
    
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? "py-4 px-4" 
        : "py-6 px-4 sm:px-6 lg:px-8"
    }`}>
      <div className={`mx-auto max-w-7xl flex items-center justify-between transition-all duration-500 px-6 h-16 rounded-2xl border ${
        scrolled 
          ? "bg-void-950/60 backdrop-blur-xl border-arcane-900/40 shadow-[0_0_30px_rgba(0,0,0,0.5)]" 
          : "bg-transparent border-transparent"
      }`}>
        <Link to="/" className="flex items-center gap-2 text-xl font-heading font-bold group">
          <div className="relative">
            <Sparkles className="h-6 w-6 text-arcane-500 group-hover:rotate-12 transition-transform duration-500" />
            <div className="absolute inset-0 blur-md bg-arcane-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <span className="tracking-tighter text-gradient">ExFolio</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path} to={link.path}
              className={`group relative text-[11px] font-heading tracking-[0.25em] uppercase transition-all duration-300 hover:text-arcane-300 ${
                location.pathname === link.path ? "text-arcane-100" : "text-arcane-300/40"
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 bg-enchant-400 rounded-full transition-all duration-500 ${
                location.pathname === link.path ? "w-1 opacity-100 shadow-[0_0_8px_#ea80fc]" : "w-0 opacity-0"
              }`} />
            </Link>
          ))}
          
          <Link
            to={loggedIn ? "/admin/dashboard" : "/admin/login"}
            className="relative px-6 py-2 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-arcane-500 rounded-lg group-hover:bg-arcane-400 transition-colors duration-300" />
            <div className="relative z-10 text-[10px] font-heading font-bold tracking-widest text-void-950 uppercase">
              {loggedIn ? "Dashboard" : "Admin"}
            </div>
            <div className="absolute inset-0 rounded-lg shadow-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-xl text-arcane-300 hover:bg-arcane-900/30 transition-all active:scale-90"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-4 right-4 mt-4 md:hidden rounded-2xl glass-card p-6 animate-fade-from-abyss border-arcane-800/50">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl text-xs font-heading tracking-[0.2em] uppercase transition-all ${
                  location.pathname === link.path
                    ? "bg-arcane-500/10 text-arcane-400 border border-arcane-500/20"
                    : "text-arcane-300/50 hover:bg-arcane-900/20"
                }`}
              >{link.label}</Link>
            ))}
            <Link
              to={loggedIn ? "/admin/dashboard" : "/admin/login"} onClick={() => setMobileOpen(false)}
              className="mt-2 block rounded-xl bg-arcane-500 px-6 py-4 text-xs font-heading font-bold tracking-[0.2em] text-void-950 uppercase text-center shadow-glow active:scale-95 transition-all"
            >
              {loggedIn ? "Dashboard" : "Admin"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
