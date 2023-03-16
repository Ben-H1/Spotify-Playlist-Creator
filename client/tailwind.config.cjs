/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                'montserrat': ['Montserrat']
            },
            colors: {
                'ui-grayscale': {
                    100: '#121212',
                    200: '#1A1A1A',
                    300: '#242424',
                    400: '#282828',
                    500: '#3E3E3E',
                    600: '#A6A6A6'
                },
                'ui-green': {
                    light: '#1FDF64',
                    DEFAULT: '#1DB954',
                    dark: '#169C46'
                },
                'no-pic' : '#535353'
            },
            scale: {
                103: '1.03'
            }
        }
    },
    plugins: []
};
