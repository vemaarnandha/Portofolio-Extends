import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "Beranda", path: "/" },
  { label: "Proyek", path: "/projects" },
  { label: "Tentang", path: "/about" },
  { label: "Kontak", path: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <div
        className="fixed top-0 left-0 h-[2px] bg-arcane-500 z-[100] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />
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
                className={`group relative text-xs font-body tracking-widest uppercase transition-all duration-300 hover:text-arcane-300 ${
                  location.pathname === link.path ? "text-arcane-100" : "text-arcane-300/40"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 bg-enchant-400 rounded-full transition-all duration-500 ${
                  location.pathname === link.path ? "w-1 opacity-100 shadow-[0_0_8px_#ea80fc]" : "w-0 opacity-0"
                }`} />
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 rounded-xl text-arcane-300 hover:bg-arcane-900/30 transition-all active:scale-90"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="absolute top-full left-4 right-4 mt-4 md:hidden rounded-2xl glass-card p-6 animate-fade-from-abyss border-arcane-800/50">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-xs font-body tracking-widest uppercase transition-all ${
                    location.pathname === link.path
                      ? "bg-arcane-500/10 text-arcane-400 border border-arcane-500/20"
                      : "text-arcane-300/50 hover:bg-arcane-900/20"
                  }`}
                >{link.label}</Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
