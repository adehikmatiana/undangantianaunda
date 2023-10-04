module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'cokelat': {
          100: '#FAFAF0',
          200: '#F6F6E1',
          300: '#E5E5C7',
          400: '#CBCBAA',
          500: '#A9A985',
          600: '#919161',
          700: '#797943',
          800: '#62622A',
          900: '#515119',
        },
      },
      fontFamily: {
        sweetChild: ["SweetChild", "sans-serif"],
        poppins: ['Poppins', 'sans-serif'],
        trajanPro: ["TrajanPro", "sans-serif"],
        monsterrat: ['Montserrat', 'sans-serif']
      },
    }, 
  },
  plugins: [],
};