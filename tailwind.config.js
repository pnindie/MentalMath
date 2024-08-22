/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'flowing-gradient': 'linear-gradient(45deg, #222222, #223355, #222222)'
      },
      backgroundSize: {
        '200%': '200% 200%'
      },
      keyframes: {
        flowingGradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 100%' }
        }
      },
      animation: {
        flowingGradient: 'flowingGradient 5s linear infinite'
      }
    },
  },
  plugins: [],
};
