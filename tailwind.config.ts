import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    extend: {
      boxShadow: {},
      dropShadow: {},
      fontFamily: {
        iransans: ["IRANSansX", "sans"],
        vazir: ["vazir", "sans"],
      },
      borderRadius: {},
      colors: {
        brand: {
          yellow: "#FFCC4E",
          black: "#1A1D1E",
          green: "#149A6D",
        },
        gray: {
          900: "#0F172A",
          800: "#1E293B",
          700: "#334155",
          600: "#475569",
          500: "#64748B",
          400: "#94A3B8",
          300: "#CBD5E1",
          200: "#E2E8F0",
          100: "#F1F5F9",
          50: "#F8FAFC",
        },
      },
    },
  },
  important: true,
  plugins: [],
};

export default config;
