import { LOCALE_ID, makeEnvironmentProviders, DOCUMENT } from '@angular/core';
import { LOGIN_CLASSES } from '../../tokens/classes';
import { LOGIN_CLASSES as LOGIN_CLASSES_LIB } from '../../tokens/classes';
import { DO_MAKE_USER_CONFIRM_PASSWORD } from '../../tokens/make-user-confirm-password';
import { DO_MAKE_USER_CONFIRM_PASSWORD as DO_MAKE_USER_CONFIRM_PASSWORD_LIB } from '../../tokens/make-user-confirm-password';
import { type KcContextLike } from 'keycloakify/login/i18n/noJsx';
import { KC_LOGIN_CONTEXT as KC_LOGIN_CONTEXT_LIB } from '../../tokens/kc-context';
import { KC_LOGIN_CONTEXT } from '../../tokens/kc-context';
import { LOGIN_I18N as LOGIN_I18N_LIB } from '../../tokens/i18n';

import { LOGIN_I18N } from '../../tokens/i18n';
import { ClassKey } from '../../../../login-ui/core/kcClsx';
import { USE_DEFAULT_CSS } from '../../../lib/tokens/use-default-css';

export type KeycloakifyAngularLoginConfig = {
  doMakeUserConfirmPassword?: boolean;
  doUseDefaultCss?: boolean;
  classes?: { [key in ClassKey]?: string };
  kcContext: unknown;
  getI18n: (params: { kcContext: KcContextLike }) => {
    i18n: unknown;
    prI18n_currentLanguage: Promise<unknown> | undefined;
  };
};

export const provideKeycloakifyAngular = (config: KeycloakifyAngularLoginConfig) => {
  const { i18n, prI18n_currentLanguage } = config.getI18n({
    kcContext: config.kcContext as KcContextLike,
  });

  return makeEnvironmentProviders([
    {
      provide: KC_LOGIN_CONTEXT,
      useValue: config.kcContext,
    },
    {
      provide: KC_LOGIN_CONTEXT_LIB,
      useValue: config.kcContext,
    },
    {
      provide: DO_MAKE_USER_CONFIRM_PASSWORD,
      useValue: config?.doMakeUserConfirmPassword ?? true,
    },
    {
      provide: DO_MAKE_USER_CONFIRM_PASSWORD_LIB,
      useValue: config?.doMakeUserConfirmPassword ?? true,
    },
    {
      provide: LOCALE_ID,
      useFactory: (document: Document) => {
        return document.documentElement.lang ?? 'en';
      },
      deps: [DOCUMENT],
    },
    {
      provide: LOGIN_I18N,
      useValue: i18n,
    },
    {
      provide: LOGIN_I18N_LIB,
      useValue: i18n,
    },
    { provide: USE_DEFAULT_CSS, useValue: config?.doUseDefaultCss ?? true },
    { provide: LOGIN_CLASSES, useValue: config?.classes ?? {} },
    { provide: LOGIN_CLASSES_LIB, useValue: config?.classes ?? {} },
  ]);
};
