/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Government of India official colors
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // India colors
        saffron: '#FF9933',
        white: '#FFFFFF',
        green: '#138808',
        navy: '#000080',
        // Government blues
        govBlue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // CSC specific colors
        csc: {
          orange: '#FF6600',
          blue: '#003366',
          lightBlue: '#0066CC',
          gray: '#666666',
        }
      },
      fontFamily: {
        'hindi': ['Noto Sans Devanagari', 'sans-serif'],
        'marathi': ['Noto Sans Devanagari', 'sans-serif'],
        'official': ['Arial', 'Helvetica', 'sans-serif'],
      },
      backgroundImage: {
        'india-flag': 'linear-gradient(to bottom, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.67%, #138808 66.67%)',
        'gov-gradient': 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
      }
    },
  },
  plugins: [],
};