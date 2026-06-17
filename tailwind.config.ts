import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        gold: {
          DEFAULT: "#c9a84c",
          light: "#f0d98b",
          dark: "#8b6f2a",
        },
        forest: {
          DEFAULT: "#1a6b3c",
          light: "#22a85a",
          dark: "#0d3d22",
        },
        cream: "#f5f0e8",
        charcoal: "#1a1a1a",
      },
    },
  },
  plugins: [],
};

export default config;
