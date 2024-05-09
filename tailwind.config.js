/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: { min: "100px", max: "360px" },
        tablet: { min: "361px", max: "768px" },
        laptop: { min: "769px", max: "1440px " },
        pc: { min: "1441px" },
      },
    },
  },
  plugins: [],
};
