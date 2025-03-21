/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#FF7F50"
      },
      gridTemplateColumns:{
        "auto":"repeat(auto-fill, minmax(180px,1fr))"
      }
    },
  },
  plugins: [],
}