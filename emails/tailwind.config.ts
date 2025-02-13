import { Config } from 'tailwindcss';
// @ts-expect-error: no d.ts
import presetEmail from 'tailwindcss-preset-email';

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
} satisfies Config;
