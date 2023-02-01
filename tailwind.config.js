/* eslint-disable prettier/prettier */
/** @type {import('tailwindcss').Config} */
function pxToRem(value) {
  return `${value / 16}rem`
}

module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-light': 'rgba(253, 197, 197, 0.4)',
        'primay-main': '#CF2A2A',
        'primary-dark': '#DB3539',

        'success-light': '#EAFFE7',
        'success-main': '#15692A',

        'info-light': '#F0F5FF',
        'info-main': '#0050C8',

        'warning-light': '#EAFFE7',
        'warning-main': '#F9F2F2',

        'common-black': '#000000',
        'common-white': '#ffffff',
        'common-title': '#AAAAAA',

        'text-primary': '#363636',
        'text-secondary': '#636363',
        'text-disabled': '#96989A',
        'text-tertiary': '#747373',
        'text-dark': '#212326',
        'text-lightYellow': '#D4A62F',
        'text-title': '#AAAAAA',
        'text-nav-link': ' #8F8F8F',

        'background-dash': '#E5E5E5',
        'background-paper': '#fff',
        'background-default': '#F7F7F7',
        'background-dark': '#EBE9E9',
        'background-disabled': '#96989A',
        'background-lightYellow': '#D5A62F',
        'background-lightRed': 'rgba(219, 53, 57, 0.02)',
        'background-red-muted': '#FDC5C5',
        'background-yellow-muted': 'rgba(253, 197, 197, 0.17);',

        'border-muted-yellow': '#E5E9EB',
        'lists-background': '#EAEAEA',
        'action-background': 'rgba(207, 42, 42, 0.13)',
        'action-type-background': 'rgba(255, 255, 255, 0.65)',
        'line-faint-background': '#DDDDDD',
        'button-hover-background': '#DC5A5D',
        'button-background': '#AAAAAA',
        'light-ash': 'rgba(170, 170, 170, 0.17)',
        ash: 'rgba(170, 170, 170)',
        'page-button-active-border': '#FFECEC',
        'page-button-border': '#CCCCCC',
      },

      screens: {
        sm: '600px', // '480px' default,
        md: '960px', // '768px' default,
        in: '1100px',
        lg: '1280px', // '976px' default,
        xl: '1440px',
      },
      fontFamily: {
        default: [
          'Inter',
          'Roboto',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ],
        roboto: 'Roboto',
      },

      fontSize: {
        '5xl': pxToRem(46),
        '3xl': pxToRem(32),
        '2xl': pxToRem(26),
        // xl: pxToRem(24),
        lg: pxToRem(20),
        18: pxToRem(18),
      },
      lineHeight: {
        8: '30px',
        4.5: '18px',
      },
      maxWidth: {
        '8xl': '1628px',
        835: '835px',
        44: '174px',
      },
      minWidth: {
        '7xl': '1000px',
        '4xl': '600px',
        80: '327px',
        150: '150px',
        60: '230px',
        80: '327px',
      },
      width: {
        40: '174px',
        60: '230px',
        80: '327px',
        '8xl': '1628px',
        44: '174px',
        9: '34px',
      },
      height: {
        7.5: '30px',
        20: '77px',
        32: '120px',
        559: '559px',
        607: '607px',
      },
      maxHeight: {
        1117: '1117px',
        920: '920px',
        607: '607px',
        504: '504px',
      },
      minHeight: {
        50: '500px',
      },
      padding: {
        3: '14px',
        11: '46px',
        2.5: '12px',
        1.5: '5px',
      },
    },
  },
  plugins: [],
}
