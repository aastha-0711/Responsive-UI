/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ <-- add this line
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // include js/jsx for safety
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "ui-sans-serif", "system-ui"],
        poppins: ["Poppins", "ui-sans-serif", "system-ui"],
        roboto: ["Roboto", "ui-sans-serif", "system-ui"],
        montserrat: ["Montserrat", "ui-sans-serif", "system-ui"],
        lato: ["Lato", "ui-sans-serif", "system-ui"],
        openSans: ["'Open Sans'", "ui-sans-serif", "system-ui"],
        nunito: ["Nunito", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)",
      },
    },
  },
  plugins: [],
};
