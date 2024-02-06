/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'custom-gradient': 'linear-gradient(to right, #e73c9f, #a032c6, #4125f8)',
      },
      gradientColorStops: theme => ({
        'primary': '#6e1074', // Example color
        'between': '#4a0e58',
        'secondary': '#1f0b35', // Example color
      }),
      colors: {
        'custom-bg': '#6437a0',
        'custom-blue': '#3b2063',
        'custom-light-blue': '#442D65',
      },
    },
  },
  plugins: [],
}

