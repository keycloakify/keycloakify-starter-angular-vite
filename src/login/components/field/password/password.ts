import { Component, ElementRef, forwardRef, inject, input, OnInit, viewChild } from '@angular/core';
import { I18n } from '../../../i18n';
import { ErrorIconComponent } from '../error-icon';
import { GroupComponent } from '../group';
import { KcClassDirective } from '../../../../@keycloakify/login-ui-angular/login/directives/kc-class';
import { ComponentReference } from '../../../../@keycloakify/login-ui-angular/login/classes/component-reference';
import { LOGIN_I18N } from '../../../../@keycloakify/login-ui-angular/login/tokens/i18n';
import { USE_DEFAULT_CSS } from '../../../../@keycloakify/login-ui-angular/lib/tokens/use-default-css';
import { ClassKey } from '../../../../@keycloakify/login-ui/core/kcClsx';
import { LOGIN_CLASSES } from '../../../../@keycloakify/login-ui-angular/login/tokens/classes';

@Component({
  selector: 'kc-password',
  imports: [GroupComponent, KcClassDirective, ErrorIconComponent],
  templateUrl: './password.html',
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => PasswordComponent),
    },
  ],
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class PasswordComponent extends ComponentReference implements OnInit {
  i18n = inject<I18n>(LOGIN_I18N);

  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);

  name = input<string | undefined>();
  label = input('', {
    transform: (inputLabel?: string) => (inputLabel ? this.i18n.advancedMsgStr(inputLabel) : undefined),
  });
  value = input<string>('');
  required = input<boolean>(false);
  forgotPassword = input<boolean>(false);
  fieldName = input<string>(this.name() ?? '');
  error = input<string | undefined>();
  autocomplete = input<string>('off');
  autofocus = input<boolean>(false);
  resetCredentialsUrl = input<string>('');

  passwordInput = viewChild.required<ElementRef>('passwordInput');
  passwordToggleButton = viewChild.required<ElementRef>('passwordToggleButton');

  ngOnInit(): void {
    this.setupPasswordToggle();
  }

  setupPasswordToggle() {
    const toggleButton = this.passwordToggleButton().nativeElement;
    const passwordInput = this.passwordInput().nativeElement;

    toggleButton.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);

      const iconShow = toggleButton.getAttribute('data-icon-show');
      const iconHide = toggleButton.getAttribute('data-icon-hide');
      const labelShow = toggleButton.getAttribute('data-label-show');
      const labelHide = toggleButton.getAttribute('data-label-hide');

      const iconElement = toggleButton.querySelector('i');

      if (type === 'password') {
        iconElement.className = iconShow;
        toggleButton.setAttribute('aria-label', labelShow);
      } else {
        iconElement.className = iconHide;
        toggleButton.setAttribute('aria-label', labelHide);
      }
    });
  }
}
