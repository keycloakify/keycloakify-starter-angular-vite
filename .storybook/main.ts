import type { StorybookConfig } from '@storybook/angular';
import { StorybookConfigVite } from '@storybook/builder-vite';
import { UserConfig } from 'vite';

const config: StorybookConfig & StorybookConfigVite = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: undefined,
      },
    },
  },
  staticDirs: ['../public'],
  async viteFinal(config: UserConfig, { configType }) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import('vite');
    const { default: angular } = await import('@analogjs/vite-plugin-angular');

    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      optimizeDeps: {
        include: ['@storybook/angular', '@storybook/angular/dist', '@angular/compiler', '@storybook/blocks', 'tslib'],
      },
      define: {
        'process.env': {},
        'process.env.NODE_ENV': JSON.stringify(configType === 'PRODUCTION' ? 'production' : 'development'),
      },
      plugins: [angular({ jit: true, tsconfig: './.storybook/tsconfig.json' })],
    } satisfies UserConfig);
  },
};
export default config;
