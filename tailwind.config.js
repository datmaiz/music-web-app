/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation:{
        'shake': 'shake 0.82s linear',
      },
      keyframes: {
        'shake' : {
          '10%, 90%': {
            transform: 'rotate(10deg)'
          },
          '20%, 80%' : {
            transform: 'rotate(0)'
          },
          '30%, 50%, 70%': {
            transform: 'rotate(-10deg)'
          },
          '40%, 60%': {
            transform: 'rotate(0)'
          }
        }
      }
    },
    colors: {
      white: "#fff",
      black: "#18191f",
      gray: "#9ca2ad",
      primary: "#fe5a00",
      secondary: "#ff8a01",
      "light-pink": "#fe5a00",
      "pink": "#ecd7e1",
      "blue": "#ccdefc",
      "light-blue": "#e4effd",
      bg: "#1c252f",
      "bg-300": "#263240",
      red: "#E72929",
      yellow: "#FDA403",
      green: "#008000",
      "blue-600": "#0E46A3"
    },
  },
  plugins: [],
}

