import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-9 w-9 rounded-xl bg-arcane-900/50 border border-arcane-800/50 flex items-center justify-center text-arcane-400 hover:bg-arcane-500 hover:text-void-950 transition-all duration-300"
      aria-label="Toggle tema"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
