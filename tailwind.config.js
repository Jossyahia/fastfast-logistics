// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: "class", // This enables dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          900: "#1e3a8a",
          800: "#1e40af",
          700: "#1d4ed8",
          600: "#2563eb",
          300: "#93c5fd", // Light blue for dark mode text
        },
        secondary: {
          500: "#eab308",
          600: "#ca8a04",
        },
        neutral: {
          100: "#f3f4f6",
          800: "#1f2937",
          900: "#111827", // Very dark blue for dark mode background
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};