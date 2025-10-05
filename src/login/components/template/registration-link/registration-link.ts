import { ChangeDetectionStrategy, Component, forwardRef, inject, input } from '@angular/core';
import { ComponentReference } from '../../../../@keycloakify/login-ui-angular/login/classes/component-reference';
import { LOGIN_I18N } from '../../../../@keycloakify/login-ui-angular/login/tokens/i18n';
import { I18n } from '../../../../@keycloakify/login-ui-angular/login/i18n';

@Component({
  selector: 'kc-registration-link',
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => RegistrationLinkComponent),
    },
  ],
  template: `
    <div id="kc-registration-container">
      <div id="kc-registration">
        <span
          >{{ i18n.msgStr('noAccount') }} <a [href]="registrationUrl()">{{ i18n.msgStr('doRegister') }}</a></span
        >
      </div>
    </div>
  `,
})
export class RegistrationLinkComponent {
  registrationUrl = input.required<string>();
  i18n = inject<I18n>(LOGIN_I18N);
}
