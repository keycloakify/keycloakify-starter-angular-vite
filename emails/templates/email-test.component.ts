import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ContainerComponent, ImgComponent, render, TextComponent } from '@keycloakify/angular-email';
import { LayoutComponent } from 'emails/layout/layout.component';
import type { GetSubject, GetTemplate } from 'keycloakify-emails';
import { createVariablesHelper } from 'keycloakify-emails/variables';
import { resolve } from 'node:path';

@Component({
  selector: 'kc-email-test',
  templateUrl: 'email-test.component.html',
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
