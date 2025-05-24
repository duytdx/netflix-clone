/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        header: "560px",
        rate: "400px",
      },
      fontSize: {
        h1: "2.6rem",
      },
      screens: { xs: '475px' },
      colors: {
        main: "#080A1A",
        subMain: "#F20000",
        dryGray: "#E0D5D5",
        text: "#C0C0C0",
        border: "#4b5563",
        dry: "#0B0F29",
        star: "#FFB000",
      },
      fontFamily: {
        netflix: ['Netflix Sans', 'Poppins', 'Helvetica Neue', 'Segoe UI', 'Roboto', 'sans-serif']
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
} 