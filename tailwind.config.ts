import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sora: 'var(--font-sora)',
      },
      colors: {
        primary: {
          100: '#F6F5FC',
          300: '#E0E3FF',
          500: '#5061FC',
        },
        red: {
          400: '#FC5050',
        },
      },
    },
  },
  plugins: [],
}
export default config
