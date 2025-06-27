import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#4766E5",
          foreground: "#FFFFFF",
          50: "#F0F2FF",
          100: "#DAE0FA",
          500: "#4766E5",
          600: "#3B5AE0",
          700: "#2E47DB",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "#EA4D4D",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#F3F4F6",
          foreground: "#64748B",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom colors from design
        azure: {
          24: "#283C50",
          47: "#64748B",
        },
        spring: {
          green: "#17C666",
        },
        gray: {
          50: "#FAFAFA",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#EAEBEF",
          400: "#E0E0E0",
          430: "#A2A6B5",
          500: "#64748B",
          600: "#283C50",
          700: "#222222",
        },
        success: "#17C666",
        warning: "#EA4D4D",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "9": "9px",
        "11": "11px",
        "13": "13px",
      },
      spacing: {
        "18": "4.5rem",
        "86": "21.5rem",
        "280": "70rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
