import { Component, forwardRef, inject, input } from '@angular/core';
import { USE_DEFAULT_CSS } from '../../../../@keycloakify/login-ui-angular/lib/tokens/use-default-css';
import type { I18n } from '../../../i18n';
import { KcClassDirective } from '../../../../@keycloakify/login-ui-angular/login/directives/kc-class';
import { ComponentReference } from '../../../../@keycloakify/login-ui-angular/login/classes/component-reference';
import { LOGIN_I18N } from '../../../../@keycloakify/login-ui-angular/login/tokens/i18n';
import { ClassKey } from '../../../../@keycloakify/login-ui/core/kcClsx';
import { LOGIN_CLASSES } from '../../../../@keycloakify/login-ui-angular/login/tokens/classes';

@Component({
  selector: 'kc-error-icon',
  imports: [KcClassDirective],
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  templateUrl: './error-icon.html',
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => ErrorIconComponent),
    },
  ],
})
export class ErrorIconComponent extends ComponentReference {
  i18n = inject<I18n>(LOGIN_I18N);

  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);
  error = input<string | undefined>();
}
