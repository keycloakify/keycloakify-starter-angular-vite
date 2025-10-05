import { Component, forwardRef, inject, input } from '@angular/core';
import { I18n } from '../../../i18n';
import { KcClassDirective } from '../../../../@keycloakify/login-ui-angular/login/directives/kc-class';
import { ComponentReference } from '../../../../@keycloakify/login-ui-angular/login/classes/component-reference';
import { LOGIN_I18N } from '../../../../@keycloakify/login-ui-angular/login/tokens/i18n';
import { USE_DEFAULT_CSS } from '../../../../@keycloakify/login-ui-angular/lib/tokens/use-default-css';
import { ClassKey } from '../../../../@keycloakify/login-ui/core/kcClsx';
import { LOGIN_CLASSES } from '../../../../@keycloakify/login-ui-angular/login/tokens/classes';
@Component({
  selector: 'kc-checkbox',
  imports: [KcClassDirective],
  templateUrl: './checkbox.html',
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => CheckboxComponent),
    },
  ],
})
export class CheckboxComponent extends ComponentReference {
  i18n = inject<I18n>(LOGIN_I18N);

  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);
  name = input<string | undefined>();
  label = input<string | undefined>();
  value = input<boolean>(false);
  required = input<boolean>(false);
}
