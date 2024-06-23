/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'

export default {
  content: ['./src/**/*.{html,js,vue}', './index.html'],
  theme: {
    extend: {}
  },
  plugins: [forms]
}
