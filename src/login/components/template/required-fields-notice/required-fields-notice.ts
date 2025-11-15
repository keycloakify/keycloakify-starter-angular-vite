import { Component, forwardRef, inject } from '@angular/core';
import { ComponentReference } from '../../../../@keycloakify/login-ui-angular/login/classes/component-reference';
import { KcClassDirective } from '../../../../@keycloakify/login-ui-angular/login/directives/kc-class';
import { I18n } from '../../../../@keycloakify/login-ui-angular/login/i18n';
import { LOGIN_I18N } from '../../../../@keycloakify/login-ui-angular/login/tokens/i18n';
import { USE_DEFAULT_CSS } from '../../../../@keycloakify/login-ui-angular/lib/tokens/use-default-css';
import { ClassKey } from '../../../../@keycloakify/login-ui/core/kcClsx';
import { LOGIN_CLASSES } from '../../../../@keycloakify/login-ui-angular/login/tokens/classes';
@Component({
  selector: 'kc-required-fields-notice',
  imports: [KcClassDirective],
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  templateUrl: './required-fields-notice.html',
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => RequiredFieldsNoticeComponent),
    },
  ],
})
export class RequiredFieldsNoticeComponent extends ComponentReference {
  i18n = inject<I18n>(LOGIN_I18N);
  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);
}
