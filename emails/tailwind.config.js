import presetEmail from 'tailwindcss-preset-email';

/**
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./**/*.{html,ts}'],
  presets: [presetEmail],
  theme: {
    extend: {
      fontFamily: {
        default: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen-Sans',
          'Ubuntu',
          'Cantarell',
          '"Helvetica Neue"',
          'sans-serif',
        ],
      },
    },
  },
};
