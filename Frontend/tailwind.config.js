/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: "#1f3d2b",
        earth: "#6b705c",
      },
    },
  },
  plugins: [],
};
