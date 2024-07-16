/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
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
        border: "hsl(var(--border, 0, 0%, 0%))",
        input: "hsl(var(--input, 0, 0%, 0%))",
        ring: "hsl(var(--ring, 0, 0%, 0%))",
        background: "hsl(var(--background, 0, 0%, 0%))",
        foreground: "hsl(var(--foreground, 0, 0%, 0%))",
        primary: {
          DEFAULT: "hsl(var(--primary, 0, 0%, 0%))",
          foreground: "hsl(var(--primary-foreground, 0, 0%, 0%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 0, 0%, 0%))",
          foreground: "hsl(var(--secondary-foreground, 0, 0%, 0%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0, 0%, 0%))",
          foreground: "hsl(var(--destructive-foreground, 0, 0%, 0%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 0, 0%, 0%))",
          foreground: "hsl(var(--muted-foreground, 0, 0%, 0%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 0, 0%, 0%))",
          foreground: "hsl(var(--accent-foreground, 0, 0%, 0%))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover, 0, 0%, 0%))",
          foreground: "hsl(var(--popover-foreground, 0, 0%, 0%))",
        },
        card: {
          DEFAULT: "hsl(var(--card, 0, 0%, 0%))",
          foreground: "hsl(var(--card-foreground, 0, 0%, 0%))",
        },
      },
      borderRadius: {
        lg: "var(--radius, 0.5rem)",
        md: "calc(var(--radius, 0.5rem) - 2px)",
        sm: "calc(var(--radius, 0.5rem) - 4px)",
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
    },
  },
  plugins: [require("tailwindcss-animate")],
}
