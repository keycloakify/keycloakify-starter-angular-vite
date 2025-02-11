import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { render, TextComponent } from '@keycloakify/angular-email';
import { LayoutComponent } from 'emails/layout/layout.component';
import type { GetSubject, GetTemplate } from 'keycloakify-emails';
import { createVariablesHelper } from 'keycloakify-emails/variables';
import { resolve } from 'node:path';

@Component({
  selector: 'kc-email-verification',
  templateUrl: 'email-verification.component.html',
  imports: [LayoutComponent, TextComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailVerificationComponent {
  $locale = input('en', { alias: 'locale' });
  $themeName = input('vanilla', { alias: 'themeName' });

  exp = createVariablesHelper('email-verification.ftl').exp;
  firstName = this.exp('user.firstName');
  link = this.exp('link');
  linkExpiration = this.exp('linkExpirationFormatter(linkExpiration)');
}

export const getTemplate: GetTemplate = async (props) => {
  return await render({
    component: EmailVerificationComponent,
    props,
    selector: 'kc-email-verification',
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
