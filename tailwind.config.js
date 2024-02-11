/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {body: ['Mouse Memoirs', 'sans-serif']}
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

