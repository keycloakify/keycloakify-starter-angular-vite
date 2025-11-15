import { Component, forwardRef, inject, input } from '@angular/core';
import { USE_DEFAULT_CSS } from '../../../../@keycloakify/login-ui-angular/lib/tokens/use-default-css';
import { GroupComponent } from '../group';
import { ErrorIconComponent } from '../error-icon';
import { KcClassDirective } from '../../../../@keycloakify/login-ui-angular/login/directives/kc-class';
import { LOGIN_I18N } from '../../../../@keycloakify/login-ui-angular/login/tokens/i18n';
import { ClassKey } from '../../../../@keycloakify/login-ui/core/kcClsx';
import { LOGIN_CLASSES } from '../../../../@keycloakify/login-ui-angular/login/tokens/classes';
import { ComponentReference } from '../../../../@keycloakify/login-ui-angular/login/classes/component-reference';
import { I18n } from '../../../../@keycloakify/login-ui-angular/login/i18n';

@Component({
  selector: 'kc-input',
  imports: [GroupComponent, KcClassDirective, ErrorIconComponent],
  templateUrl: './input.html',
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => InputComponent),
    },
  ],
})
export class InputComponent extends ComponentReference {
  i18n = inject<I18n>(LOGIN_I18N);

  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);

  name = input<string | undefined>();
  label = input<string | undefined>();
  value = input<string>('');
  required = input<boolean>(false);
  error = input<string | undefined>();
  autocomplete = input<string>('off');
  autofocus = input<boolean>(false);
}
