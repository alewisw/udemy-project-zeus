/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1200px",
        xl: "1440px",
      },
      colors: {
        myBlue: "#0a32b3",
        myPink: "#bd365d",
      },
      backgroundImage: (theme) => ({
        pattern: "url('/src/Assets/bg.png')",
      }),
    },
  },
  plugins: [],
};
