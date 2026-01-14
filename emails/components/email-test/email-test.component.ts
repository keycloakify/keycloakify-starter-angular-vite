import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { ContainerComponent, ImgComponent, render, TextComponent } from '@keycloakify/angular-email';
import { LayoutComponent } from '../../layout/layout.component';
import type { GetSubject, GetTemplate } from 'keycloakify-emails';
import { createVariablesHelper } from 'keycloakify-emails/variables';
import { cssProcessor } from '@keycloakify/angular-email/tailwindcss-preset-email/css-processor';

@Component({
  selector: 'kc-email-test',
  templateUrl: 'email-test.component.html',
  styleUrls: ['../styles.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [LayoutComponent, ImgComponent, ContainerComponent, TextComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailTestComponent {
  $locale = input('en', { alias: 'locale' });
  $themeName = input('vanilla', { alias: 'themeName' });

  exp = createVariablesHelper('email-test.ftl').exp;
  baseUrl = this.exp('url.resourcesUrl');
}

export const getTemplate: GetTemplate = async (props) => {
  return await render({
    component: EmailTestComponent,
    props,
    selector: 'kc-email-test',
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
