/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      "black": "#293264",
      "mor": "#4D5B9E",
      "morumsu": "#D6DBF5",
      "green": "#94D7A2",
      "red": "#F8BCBC",
    },
    fontFamily: {
      "inter": ["Inter", "sans-serif"],
      "karla": ["Karla", "sans-serif"],
    },
    borderWidth: {
      "7.9": "0.79px",
      "1": "1px",
    },
    borderColor: {
      "mor": "#DBDEF0",
    },
  },
  plugins: [],
};
