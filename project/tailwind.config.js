/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'auth-bg-img': "url('/src/images/USMEntrance.jpeg')",
      })
    },
  },
  plugins: [],
};
