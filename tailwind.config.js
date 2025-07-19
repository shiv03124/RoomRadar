module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          500: '#4a6fa5', // Main blue color (Header background)
          600: '#3a5a8a',
          700: '#2c3e50', // Darker blue (Footer background)
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right, #4a6fa5, #3a5a8a)',
        'hero-pattern': "url('https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
      },
    },
  },
  plugins: [],
};

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
