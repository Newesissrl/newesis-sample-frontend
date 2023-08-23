/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      light_black: "#1c1c1e",
      white: "#f3f3f3",
      black: "#19191b",
      //blue: "#5179ff",
      blue: colors.sky["500"],
      newesis: "#c27f390",
      // para_text: "#565657",
      sky: colors.sky,
      slate: colors.slate,
      gray: colors.gray["500"],
    },
    extend: {},
  },
  plugins: [],
};
