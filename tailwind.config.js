/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#C22B2B",
          dark: "#A52424",
          light: "#FDECEC",
        },
        secondary: {
          DEFAULT: "#F2C84B",
          dark: "#D9B23F",
          light: "#FFF7DA",
        },
        neutral: {
          900: "#1F2937",
          600: "#6B7280",
          50: "#F9FAFB",
        },
      },
      gradientColorStops: theme => ({
        'brand-start': theme('colors.primary.DEFAULT'),
        'brand-end': theme('colors.primary.dark'),
      }),
    },
  },
  plugins: [],
};
