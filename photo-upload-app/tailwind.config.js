/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        "form-bg": "#6a5685",
        "border-color": "#a67df4",
        "cusBg": "#2c0436",
        "gradient-from": "#6e0096",
        "gradient-to": "#a30196",
        "gradient-from-2": "#2d0335",
        "gradient-to-2": "#1d0d49",
        // "form-bg": "#e7ded7",
      }
    },
  },
  plugins: [],
};
