/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          950: "#0a0a0f",
          900: "#0f0e17",
          800: "#161425",
          700: "#1e1a30",
          600: "#282340",
        },
        arcane: {
          950: "#2d1b4e",
          900: "#3d2a5c",
          800: "#5b3a8c",
          700: "#7c4dba",
          600: "#9b6dd7",
          500: "#b68ee6",
          400: "#c9a5f0",
          300: "#dbc4f7",
          200: "#ece2fb",
          100: "#f5f0fe",
        },
        enchant: {
          500: "#e040fb",
          400: "#ea80fc",
        },
        rift: {
          500: "#7c3aed",
          400: "#a78bfa",
        },
        gold: {
          500: "#f59e0b",
          400: "#fbbf24",
        },
        blood: {
          500: "#ef4444",
        },
        eldritch: {
          500: "#10b981",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive) / <alpha-value>)", foreground: "hsl(var(--destructive-foreground) / <alpha-value>)" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        heading: ['"Inter"', '"Segoe UI"', "system-ui", "sans-serif"],
        body: ['"Inter"', '"Segoe UI"', "system-ui", "sans-serif"],
        mono: ['"Fira Code"', '"JetBrains Mono"', "monospace"],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        glow: "0 0 15px rgba(182, 142, 230, 0.15), 0 0 30px rgba(182, 142, 230, 0.08)",
        arcane: "0 0 20px rgba(182, 142, 230, 0.25), 0 0 40px rgba(124, 61, 186, 0.15), 0 4px 8px rgba(0, 0, 0, 0.4)",
        rift: "0 0 25px rgba(124, 58, 237, 0.3), 0 0 50px rgba(124, 58, 237, 0.15), 0 4px 12px rgba(0, 0, 0, 0.5)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(182, 142, 230, 0.15)" },
          "50%": { boxShadow: "0 0 25px rgba(182, 142, 230, 0.3)" },
        },
        "rune-shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "fade-from-abyss": {
          "0%": { opacity: "0", transform: "translateY(8px)", filter: "blur(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
        "void-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "rift-border": {
          "0%": { borderColor: "#7c3aed", boxShadow: "0 0 10px rgba(124, 58, 237, 0.2)" },
          "33%": { borderColor: "#b68ee6", boxShadow: "0 0 20px rgba(182, 142, 230, 0.3)" },
          "66%": { borderColor: "#e040fb", boxShadow: "0 0 15px rgba(224, 64, 251, 0.25)" },
          "100%": { borderColor: "#7c3aed", boxShadow: "0 0 10px rgba(124, 58, 237, 0.2)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "rune-shimmer": "rune-shimmer 3s linear infinite",
        "fade-from-abyss": "fade-from-abyss 0.4s ease-out",
        "void-float": "void-float 4s ease-in-out infinite",
        "rift-border": "rift-border 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
