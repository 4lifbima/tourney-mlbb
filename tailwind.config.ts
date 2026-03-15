import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#b30e05',
          hover: '#8f0b04',
          light: '#c91006',
        },
        gold: {
          DEFAULT: '#FFD700',
          light: '#FFE55C',
        },
        silver: {
          DEFAULT: '#C0C0C0',
          light: '#E8E8E8',
        },
        bronze: {
          DEFAULT: '#CD7F32',
          light: '#E5A96E',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
        'btn': '8px',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 10px 40px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
export default config
