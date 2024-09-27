import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          300: "#F687B3", 
          500: "#ED64A6", 
          700: "#D53F8C", 
        },
        slate: {
          200: '#999999',
          300: '#666666',
          400: '#444444',
          500: '#222222'
        },
        stone: {
          200: '#EAEBF1',
          300: '#DDDDDD',
          400: '#BBBBBB',
          500: '#7D8282'
        },
        neutral: {
          200: '#EAEBF1',
          300: '#F5F5F5',
          400: '#F1F1F1',
          500: '#EBEBEB'
        },
        white: {
          500: '#ffffff'
        },
        transparent: 'transparent'
      },
    },
  },
  plugins: [],
};
export default config;
