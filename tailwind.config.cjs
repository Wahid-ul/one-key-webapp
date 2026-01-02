/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "rotate-ccw": "rotate-ccw 20s linear infinite",
        "rotate-cw": "rotate-cw 20s linear infinite",
      },
      keyframes: {
        "rotate-ccw": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        "rotate-cw": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },

  
  },
  plugins: [],
}
