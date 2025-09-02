import 'zone.js';
import { type Preview } from '@analogjs/storybook-angular';

/** import here your global style if needed
 *
 * import '../src/styles.css';
 *
 */

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
