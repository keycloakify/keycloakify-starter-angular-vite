import { Config } from 'tailwindcss';
import { tailwindcssPresetEmail } from '@keycloakify/angular-email/tailwindcss-preset-email';

export default {
  content: ['./**/*.{html,ts}'],
  presets: [tailwindcssPresetEmail],
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
