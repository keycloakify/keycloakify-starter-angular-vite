// This file is auto-generated by keycloakify. Do not edit it manually.
// Hash: 41923dfe67671444e013141322ed24f1cffc176fd92b115ace7e31e09c36b9b8

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

import type { ComponentRef, EnvironmentProviders, Type } from '@angular/core';

export type ThemeName = 'keycloakify-starter-angular-vite';

export const themeNames: ThemeName[] = ['keycloakify-starter-angular-vite'];

export type KcEnvName = never;

export const kcEnvNames: KcEnvName[] = [];

export const kcEnvDefaults: Record<KcEnvName, string> = {};

export type KcContext = import('./login/KcContext').KcContext;

declare global {
  interface Window {
    kcContext?: KcContext;
  }
}

type ApplicationRefLike = {
  components: ComponentRef<any>[];
};

export async function bootstrapKcApplication(params: {
  kcContext: KcContext;
  bootstrapApplication: (params: {
    KcRootComponent: Type<unknown>;
    kcProvider: EnvironmentProviders;
  }) => Promise<ApplicationRefLike>;
}) {
  const { kcContext, bootstrapApplication } = params;

  switch (kcContext.themeType) {
    case 'login':
      {
        const [
          { provideKeycloakifyAngular },
          { getI18n },
          {
            PageComponent,
            TemplateComponent,
            doUseDefaultCss,
            classes,
            UserProfileFormFieldsComponent,
            doMakeUserConfirmPassword,
          },
        ] = await Promise.all([
          import('@keycloakify/angular/login/providers/keycloakify-angular'),
          import('./login/i18n'),
          import('./login/KcPage').then(({ getKcPage }) => getKcPage(kcContext.pageId)),
        ] as const);

        const appRef = await bootstrapApplication({
          KcRootComponent: TemplateComponent,
          kcProvider: provideKeycloakifyAngular({
            kcContext,
            classes,
            getI18n,
            doUseDefaultCss,
            doMakeUserConfirmPassword,
          }),
        });

        appRef.components.forEach((componentRef) => {
          // page must be defined first
          if ('page' in componentRef.instance) {
            componentRef.setInput('page', PageComponent);
          }
          if ('userProfileFormFields' in componentRef.instance) {
            componentRef.setInput('userProfileFormFields', UserProfileFormFieldsComponent);
          }
        });
      }
      break;
  }
}
