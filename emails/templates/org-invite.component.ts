import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { render, TextComponent } from '@keycloakify/angular-email';
import { IfComponent } from 'emails/freemarker/condition.component';
import { LayoutComponent } from 'emails/layout/layout.component';
import type { GetSubject, GetTemplate } from 'keycloakify-emails';
import { createVariablesHelper } from 'keycloakify-emails/variables';
import { resolve } from 'node:path';

@Component({
  selector: 'kc-org-invite',
  templateUrl: 'org-invite.component.html',
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
