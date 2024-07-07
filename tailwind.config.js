/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '50px', // Extra small devices (phones)
        'sm': '640px', // Small devices (phones)
        'md': '768px', // Medium devices (tablets)
        'lg': '1024px', // Large devices (desktops)
        'xl': '1280px', // Extra large devices (large desktops)
        '2xl': '1536px' // Extra extra large devices
      },
      // Aquí puedes añadir cualquier extensión de tema que necesites
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('tw-elements/plugin.cjs'),
    // eslint-disable-next-line no-undef
    require('flowbite/plugin'),
    nextui()
    // Aquí puedes añadir otros plugins de Tailwind que necesites
  ],
}
