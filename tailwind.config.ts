import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        bgColor: "#0F0F0F",
        bg2Color: "#1A1A1A",
        textColor: "#DADADA",
        textLight: "#69696",
        grn: "#CDEA67",
        blue: "#3290ee",
      },
      borderColor: {
        borderColor: "#69696",
      },
    },
  },
  plugins: [],
};
export default config;
