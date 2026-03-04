import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          "dark-green": "#343C32",
          green: "#3B4135",
          "light-green": "#4A5544",
          orange: "#DF6F0F",
          "orange-hover": "#C9620D",
          gold: "#D6C091",
          cream: "#F5F5F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
