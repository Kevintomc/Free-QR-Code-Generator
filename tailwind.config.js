/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'; // Use import for plugins

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    forms, // Use the imported plugin here
  ],
};
