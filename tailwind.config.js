module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg-light': '#FFFFFF',
        'brand-bg-light-offset': 'rgb(249 250 251)',
        'brand-bg-dark': '#E3CCCC',
        'brand-primary': '#D72323',
        'brand-primary-light': '#E24B4B',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
