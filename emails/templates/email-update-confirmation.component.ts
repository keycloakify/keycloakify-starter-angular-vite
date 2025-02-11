import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { render, TextComponent } from '@keycloakify/angular-email';
import { LayoutComponent } from 'emails/layout/layout.component';
import type { GetSubject, GetTemplate } from 'keycloakify-emails';
import { createVariablesHelper } from 'keycloakify-emails/variables';
import { resolve } from 'node:path';

@Component({
  selector: 'kc-email-update-confirmation',
  templateUrl: 'email-update-confirmation.component.html',
  imports: [LayoutComponent, TextComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailUpdateConfirmationComponent {
  $locale = input('en', { alias: 'locale' });
  $themeName = input('vanilla', { alias: 'themeName' });

  exp = createVariablesHelper('email-update-confirmation.ftl').exp;
  realmName = this.exp('realmName');
  newEmail = this.exp('newEmail');
  link = this.exp('link');
  linkExpiration = this.exp('linkExpirationFormatter(linkExpiration)');
}

export const getTemplate: GetTemplate = async (props) => {
  return await render({
    component: EmailUpdateConfirmationComponent,
    props,
    selector: 'kc-email-update-confirmation',
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
  return 'Verify new email';
};
