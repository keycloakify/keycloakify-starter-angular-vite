import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { render, TextComponent } from '@keycloakify/angular-email';
import { cssProcessor } from '@keycloakify/angular-email/tailwindcss-preset-email/css-processor';
import type { GetSubject, GetTemplate } from 'keycloakify-emails';
import { createVariablesHelper } from 'keycloakify-emails/variables';
import { LayoutComponent } from '../../layout/layout.component';

@Component({
  selector: 'kc-password-reset',
  templateUrl: 'password-reset.component.html',
  styleUrls: ['../styles.css'],
  encapsulation: ViewEncapsulation.None,
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
      cssProcessor: cssProcessor,
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getSubject: GetSubject = async (_props) => {
  return '[KEYCLOAK] - SMTP test message';
};

export const renderToHtml = async () => getTemplate({ locale: 'en', plainText: false, themeName: 'vanilla' });
