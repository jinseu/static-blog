const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
    purge: [
       './blog/components/**/*.{js,ts,jsx,tsx}', 
       './js/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                yellow: colors.yellow,
                gray: colors.gray
            },
            fontFamily: {
                sans: [
                'Poppins',
                ...defaultTheme.fontFamily.sans,
                ]
            },
            typography: (theme) => ({
                dark: {
                    css: {
                        color: theme('colors.gray.400'),
                    }
                }
            })
        },
    },
    variants: {
        extend: {
            typography: ['dark']
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}