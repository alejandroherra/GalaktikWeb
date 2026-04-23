/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false, // Critical to avoid breaking existing styles
  },
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        retro: {
          blue: '#5c94fc',   // Sky blue
          ground: '#e05000', // Brick reddish
          sign: '#d8a038',   // Wood color
        }
      }
    },
  },
  plugins: [],
}
