/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      blue: '#66c3e5',
      darkgrey: '#999',
      red: '#FF240E',
      spotify: 'rgb(30, 215, 96)',
    },
    extend: {
      fontFamily: {
        spotify: ['Circular Spotify Text', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
