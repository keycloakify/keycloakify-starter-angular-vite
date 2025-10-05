import { ChangeDetectionStrategy, Component, forwardRef, inject, type TemplateRef, viewChild } from '@angular/core';
import { LoginFormComponent } from './form';
import { ComponentReference } from '../../../@keycloakify/login-ui-angular/login/classes/component-reference';
import { I18n } from '../../i18n';
import { KcContext } from '../../KcContext';
import { KC_LOGIN_CONTEXT } from '../../../@keycloakify/login-ui-angular/login/tokens/kc-context';
import { LOGIN_I18N } from '../../../@keycloakify/login-ui-angular/login/tokens/i18n';
import { SocialProvidersComponent } from '../../components/template/social-providers';
import { RegistrationLinkComponent } from '../../components/template/registration-link';
import { ConditionalUiDataComponent } from '../../components/conditional-ui-data';

@Component({
  selector: 'kc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoginFormComponent, SocialProvidersComponent, RegistrationLinkComponent, ConditionalUiDataComponent],
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => PageComponent)
    }
  ],
  template: `
    <ng-template #headerNode>{{ i18n.msgStr('loginAccountTitle') }}</ng-template>

   @if (displayInfo) {
      <ng-template #infoNode>
        <kc-registration-link [registrationUrl]="kcContext.url.registrationUrl" />
      </ng-template>
    }
    <kc-form />

    @if (kcContext.realm.password && kcContext.social && kcContext.social.providers && kcContext.social.providers.length > 0) {
      <ng-template #socialProvidersNode>
        <kc-social-providers [social]="kcContext.social" />
      </ng-template>
    }
  `,
})
export class PageComponent extends ComponentReference {
  kcContext = inject<Extract<KcContext, { pageId: 'login.ftl' }>>(KC_LOGIN_CONTEXT);
  i18n = inject<I18n>(LOGIN_I18N);

  displayInfo = this.kcContext.realm.password && this.kcContext.realm.registrationAllowed && !this.kcContext.registrationDisabled;
  displayMessage = !this.kcContext.messagesPerField.existsError('username', 'password');
  displayRequiredFields = false;

  headerNode = viewChild<TemplateRef<HTMLElement>>('headerNode');
  infoNode = viewChild<TemplateRef<HTMLElement>>('infoNode');
  socialProvidersNode = viewChild<TemplateRef<HTMLElement>>('socialProvidersNode');

}
