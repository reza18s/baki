import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{html,js,tsx,ts}'],
  theme: {
    extend: {
      boxShadow: {
        Layout: '0px 0px 24px 1px rgba(0, 0, 0, 0.05)',
        Appbar: '0px 0px 20px rgba(0, 0, 0, 0.10)',
        HomeAppBar: '0px 0px 5px rgba(0, 0, 0, 0.10)',
        Gold: '0px 0px 24px 1px rgba(252, 211, 77, 0.30)',
        base: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.10)',
        Base: '0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)',
        normal: '0px 0px 4px rgba(0, 0, 0, 0.25)',
      },
      dropShadow: {},
      fontFamily: {
        iransans: ['IRANSansX', 'sans'],
        vazir: ['vazir', 'sans'],
      },
      borderRadius: {},
      colors: {
        brand: {
          red: '#FE4A49',
          yellow: '#FFCC4E',
          black: '#1A1D1E',
          green: '#149A6D',
        },
        warning: { 50: '#FFFBEB', 100: '#FEF3C7' },
        gray: {
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
          500: '#64748B',
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#F1F5F9',
          50: '#F8FAFC',
        },
        black: '#1A1D1E',
      },
    },
  },
  important: true,
  plugins: [],
};

export default config;
