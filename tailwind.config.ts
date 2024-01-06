import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        // "gradient-conic":
        //   "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // bg-grid-darkクラスで背景として画像を使える
        "grid-black": "url('../public/background/grid-black.svg')",
        "grid-slate-200": "url('../public/background/grid-slate-200.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
