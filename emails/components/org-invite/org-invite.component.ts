import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { render, TextComponent } from '@keycloakify/angular-email';
import { cssProcessor } from '@keycloakify/angular-email/tailwindcss-preset-email/css-processor';
import type { GetSubject, GetTemplate } from 'keycloakify-emails';
import { createVariablesHelper } from 'keycloakify-emails/variables';
import { IfComponent } from '../../freemarker/condition.component';
import { LayoutComponent } from '../../layout/layout.component';

@Component({
  selector: 'kc-org-invite',
  templateUrl: 'org-invite.component.html',
  styleUrls: ['../styles.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [LayoutComponent, TextComponent, IfComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrgInviteComponent {
  $locale = input('en', { alias: 'locale' });
  $themeName = input('vanilla', { alias: 'themeName' });

  exp = createVariablesHelper('org-invite.ftl').exp;
  v = createVariablesHelper('org-invite.ftl').v;
  firstName = this.exp('firstName');
  lastName = this.exp('lastName');
  organizationName = this.exp('organization.name');
  link = this.exp('link');
  linkExpiration = this.exp('linkExpirationFormatter(linkExpiration)');
  hasName = `${this.v('firstName')}?? && ${this.v('lastName')}??`;
}

export const getTemplate: GetTemplate = async (props) => {
  return await render({
    component: OrgInviteComponent,
    props,
    selector: 'kc-org-invite',
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
