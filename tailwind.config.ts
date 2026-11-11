import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lace: "#E8E1D1",
        paper: "#F6F2E9",
        peach: "#D8B69F",
        blush: "#C38380",
        taupe: "#9C7164",
        umber: "#4B342C",
        ink: "#4B342C",
        stone: "#A6897A",
        hairline: "#D9C7B8",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-jost)", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      maxWidth: {
        content: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
