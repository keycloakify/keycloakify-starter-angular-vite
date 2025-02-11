import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { render, TextComponent } from '@keycloakify/angular-email';
import { LayoutComponent } from 'emails/layout/layout.component';
import type { GetSubject, GetTemplate } from 'keycloakify-emails';
import { createVariablesHelper } from 'keycloakify-emails/variables';
import { resolve } from 'node:path';

@Component({
  selector: 'kc-password-reset',
  templateUrl: 'password-reset.component.html',
  imports: [LayoutComponent, TextComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordResetComponent {
  $locale = input('en', { alias: 'locale' });
  $themeName = input('vanilla', { alias: 'themeName' });

  exp = createVariablesHelper('password-reset.ftl').exp;
  link = this.exp('link');
  realmName = this.exp('realmName');
  linkExpiration = this.exp('linkExpirationFormatter(linkExpiration)');
}

export const getTemplate: GetTemplate = async (props) => {
  return await render({
    component: PasswordResetComponent,
    props,
    selector: 'kc-password-reset',
    options: {
      signalInputsPrefix: '$',
      pretty: true,
      plainText: props.plainText,
      // relative to ./.tmp-emails
      cssFilePaths: [resolve(import.meta.dirname, '../emails/styles.css')],
      tailwindConfig: resolve(import.meta.dirname, '../emails/tailwind.config.js'),
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getSubject: GetSubject = async (_props) => {
  return '[KEYCLOAK] - SMTP test message';
};
