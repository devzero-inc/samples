/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cusPrimary: "#080531",
        cusSecondary: "#5C40A6",
        cusSecLight: "#8261DE",
        cusSecMorLight: "#8A67EC",
        cusSecOne: "#30195c",
        cusSecTwo: "#270F69",
        cusTextPrime: "#fffff2",
        lightGray: "#727272",
      },
    },
  },
  plugins: [],
}

