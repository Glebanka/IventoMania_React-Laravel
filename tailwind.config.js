import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                pacifico: ['Pacifico', 'cursive'],
                montserrat: ['Montserrat'],
            },
            colors: {
              'primary': '#1384D6',
            },
            borderRadius: {
              '55px': '55px',
              '83px': '83px',
            },
            boxShadow: {
              'normal': '0 12px 30px 6px rgba(0, 0, 0, .25)',
              'button': '0 4px 15px 6px rgba(0, 0, 0, .25)',
            },
            width: {
              '47.7': '47.7%',
              '600px': '600px',
            },
            fontSize: {
              '40px' : '40px',
            },
            backgroundPosition: {
              'left-40px': 'calc(100% - 40px) center',
            },
            padding: {
              '68px': '68px',
            },
        },
        container: {
          center: true,
        },
    },

    plugins: [forms],
};
