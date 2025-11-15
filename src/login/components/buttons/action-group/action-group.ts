import { Component, forwardRef, inject, input } from '@angular/core';
import { KcClassDirective } from '../../../../@keycloakify/login-ui-angular/login/directives/kc-class';
import { ComponentReference } from '../../../../@keycloakify/login-ui-angular/login/classes/component-reference';
import { I18n } from '../../../../@keycloakify/login-ui-angular/login/i18n';
import { LOGIN_I18N } from '../../../../@keycloakify/login-ui-angular/login/tokens/i18n';
import { ClassKey } from '../../../../@keycloakify/login-ui/core/kcClsx';
import { LOGIN_CLASSES } from '../../../../@keycloakify/login-ui-angular/login/tokens/classes';
import { USE_DEFAULT_CSS } from '../../../../@keycloakify/login-ui-angular/lib/tokens/use-default-css';

@Component({
  selector: 'kc-action-group',
  imports: [KcClassDirective],
  templateUrl: './action-group.html',
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => ActionGroupComponent),
    },
  ],
})
export class ActionGroupComponent extends ComponentReference {
  i18n = inject<I18n>(LOGIN_I18N);

  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);

  horizontal = input<boolean>(false);
}
