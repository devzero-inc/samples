import type { Config } from "tailwindcss";

const config: Config = {
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
        'custom-gradient': 'linear-gradient(to right, #e73c9f, #a032c6, #4125f8)',
      },
      colors: {
        cusBg: "#0f0b29",
        cusSec: "#120d30",
        // cusSec: "#35174d",
        cusInput: "#261046",
        cusBorder: "#f3effe",
        cusBorderSec: "#5726A0",
      },
    },
  },
  plugins: [],
};
export default config;
