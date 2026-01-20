/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xs: { min: "360px" },
        "ct-xs": { max: "360px" },
        "ct-sm": { min: "361px", max: "640px" },
        "ct-md": { min: "641px", max: "768px" },
        "ct-lg": { min: "769px", max: "1024px" },
        "ct-xl": { min: "1025px", max: "1280px" },
        "ct-2xl": { min: "1281px", max: "1536px" },
        "ct-3xl": { min: "1537px", max: "1920px" },
        "ct-4xl": { min: "1921px" },
    },
    boxShadow: {
      'under-custom': 'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px',
    },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
