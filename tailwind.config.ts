import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        brand: {
          red: '#FE4A49',
          yellow: '#FFCC4E',
          black: '#1A1D1E',
          green: '#149A6D',
        },
        warning: {
          '50': '#FFFBEB',
          '100': '#FEF3C7',
        },
        gray: {
          '50': '#F8FAFC',
          '100': '#F1F5F9',
          '200': '#E2E8F0',
          '300': '#CBD5E1',
          '400': '#94A3B8',
          '500': '#64748B',
          '600': '#475569',
          '700': '#334155',
          '800': '#1E293B',
          '900': '#0F172A',
        },
        black: '#1A1D1E',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
    },
  },
  important: true,
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
};

export default config;
