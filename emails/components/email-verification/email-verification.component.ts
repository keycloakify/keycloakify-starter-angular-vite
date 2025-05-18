import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { render, TextComponent } from '@keycloakify/angular-email';
import { LayoutComponent } from 'emails/layout/layout.component';
import tailwindConfig from 'emails/tailwind.config';
import type { GetSubject, GetTemplate } from 'keycloakify-emails';
import { createVariablesHelper } from 'keycloakify-emails/variables';

@Component({
  selector: 'kc-email-verification',
  templateUrl: 'email-verification.component.html',
  styleUrls: ['../styles.css'],
  encapsulation: ViewEncapsulation.None,
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
      tailwindConfig: tailwindConfig,
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getSubject: GetSubject = async (_props) => {
  return '[KEYCLOAK] - SMTP test message';
};

export const renderToHtml = async () => getTemplate({ locale: 'en', plainText: false, themeName: 'vanilla' });
