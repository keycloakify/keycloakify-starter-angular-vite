/// <reference types="vitest" />

import angular from '@analogjs/vite-plugin-angular';
import { angularEsbuildPlugin } from '@keycloakify/angular-email/esbuild';
import { buildEmailTheme } from 'keycloakify-emails';
import { keycloakify } from 'keycloakify/vite-plugin';
import { join } from 'node:path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  build: {
    target: ['es2022'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    angular(),
    tailwindcss(),
    keycloakify({
      themeName: ['vanilla', 'chocolate'],
      accountThemeImplementation: 'none',
      postBuild: async (buildContext) => {
        await buildEmailTheme({
          templatesSrcDirPath: join(import.meta.dirname, 'emails', 'templates'),
          filterTemplate: (filePath: string) => !filePath.endsWith('.html'),
          themeNames: buildContext.themeNames,
          keycloakifyBuildDirPath: buildContext.keycloakifyBuildDirPath,
          locales: ['en', 'pl'],
          cwd: import.meta.dirname,
          i18nSourceFile: join(import.meta.dirname, 'emails', 'i18n.ts'),
          environmentVariables: buildContext.environmentVariables,
          assetsDirPath: join(import.meta.dirname, 'emails', 'templates', 'assets'),
          esbuild: {
            packages: 'bundle',
            external: [
              'juice',
              'tailwindcss',
              '@tailwindcss/postcss',
              'postcss',
              'postcss-calc',
              'postcss-custom-properties',
              'postcss-preset-env',
              'postcss-logical',
            ],
            format: 'esm',
            outExtension: { '.js': '.mjs' },
            plugins: [angularEsbuildPlugin(join(import.meta.dirname, 'emails'))],
          },
        });
      },
    }),
  ],
}));
