/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#50395F",
        secondary: "#5E406B",
        light: "#FFE8FF",
      },
    },

    fontFamily: {
      poppins: ["poppins"],
    },
  },
  plugins: [],
};
