/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  corePlugins: {
    preflight: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Tight', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Olynk Brand Palette (Strictly 6 Colors from Theme)
        navy: '#223148',
        olynk: '#2B5288',
        steel: '#2F486D',
        cream: '#F3EAE0',
        beige: '#E5E0D9',
        tan: '#D2C7B8',

        // Standard Utility Mappings
        primary: {
          50: '#F3EAE0',  // cream
          100: '#E5E0D9', // beige
          200: '#D2C7B8', // tan
          300: '#D2C7B8', // tan (fallback)
          400: '#D2C7B8', // tan (fallback)
          500: '#2F486D', // steel
          600: '#2F486D', // steel
          700: '#2F486D', // steel
          800: '#223148', // navy
          900: '#223148', // navy
          DEFAULT: '#223148',
        },
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#2B5288', // olynk
          600: '#2B5288', // olynk
          700: '#1e3a8a',
          800: '#1e40af',
          900: '#1e3a8a',
          DEFAULT: '#2B5288',
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'subtle': '0 1px 2px rgba(34, 49, 72, 0.04)',
        'sm': '0 2px 12px rgba(34, 49, 72, 0.06)',
        'DEFAULT': '0 4px 16px rgba(34, 49, 72, 0.08)',
        'md': '0 8px 24px rgba(34, 49, 72, 0.12)',
        'lg': '0 20px 60px rgba(34, 49, 72, 0.15)',
        'card': '0 2px 12px rgba(34, 49, 72, 0.06)',
        'card-hover': '0 8px 24px rgba(34, 49, 72, 0.12)',
      },
      transitionDuration: {
        'fast': '150ms',
        'DEFAULT': '200ms',
        'slow': '300ms',
      },
      animation: {
        'fade-in': 'fadeIn 300ms cubic-bezier(0, 0, 0.2, 1)',
        'fade-up': 'fadeUp 600ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 400ms cubic-bezier(0, 0, 0.2, 1)',
        'draw': 'draw 1500ms ease-in-out forwards',
        'card-lift': 'cardLift 200ms ease-out',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 60s linear infinite',
        'marquee2': 'marquee2 60s linear infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(8px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(40px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(24px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        draw: {
          'to': { strokeDashoffset: '0' },
        },
        cardLift: {
          'from': { transform: 'translateY(0)', boxShadow: '0 2px 12px rgba(34, 49, 72, 0.06)' },
          'to': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(34, 49, 72, 0.12)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      minHeight: {
        'screen-75': '75vh',
        'screen-50': '50vh',
      },
    },
  },
  plugins: [],
};