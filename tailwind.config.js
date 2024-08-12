/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        orange: {
          1: '#bb653c',
        },
        white: {
          1: '#dbd4bb'
        },
        blue: {
          1: '#1b314d'
        },
        green: {
          1: '#3e4e57'
        },
        brown: {
          1: '#a17d5d'
        },
        yellow: {
          1: '#f5bb78'
        }
      }
    },
  },
  plugins: [],
}

