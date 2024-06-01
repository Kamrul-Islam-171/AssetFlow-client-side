/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'primary-color' : '#7851a9',
        'secondary-color' : '#E6BE8A'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

