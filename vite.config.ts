/// <reference types="vitest" />

import angular from '@analogjs/vite-plugin-angular';
import { angularEsbuildPlugin } from '@keycloakify/angular-email/esbuild';
import { buildEmailTheme } from 'keycloakify-emails';
import { keycloakify } from 'keycloakify/vite-plugin';
import { join } from 'node:path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2022'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    angular(),
    keycloakify({
      themeName: ['vanilla', 'chocolate'],
      accountThemeImplementation: 'none',
      postBuild: async (buildContext) => {
        await buildEmailTheme({
          templatesSrcDirPath: join(import.meta.dirname, '/emails/templates'),
          filterTemplate: (filePath: string) => !filePath.endsWith('.html'),
          themeNames: buildContext.themeNames,
          keycloakifyBuildDirPath: buildContext.keycloakifyBuildDirPath,
          locales: ['en', 'pl'],
          cwd: import.meta.dirname,
          esbuild: {
            packages: 'bundle',
            external: ['juice', 'postcss', 'tailwindcss-v3'],
            format: 'esm',
            outExtension: { '.js': '.mjs' },
            plugins: [angularEsbuildPlugin(import.meta.dirname)],
          },
        });
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
