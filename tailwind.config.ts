import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#4b9cd3",
          secondary: "#f98473",
          accent: "#97d700",
          neutral: "0a58ca",
          "base-100": "#25292e",
          info: "#0094ff",
          success: "#00bc59",
          warning: "#e9b600",
          error: "#f90026",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
