module.exports = {
  content: ['./src/**/*.svelte'],
  theme: {
    extend: {
      zIndex: {
        'border-triangle': '200',
        'field-selection': '50',
        dialog: '2000'
      },
      padding: {
        border: '5px'
      },
      fontFamily: {
        default: ['"IM FELL English"']
      }
    }
  },
  plugins: []
};
