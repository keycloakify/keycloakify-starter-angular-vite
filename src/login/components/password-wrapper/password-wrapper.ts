import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  input,
  Renderer2,
  signal,
  WritableSignal,
} from '@angular/core';
import { KcClassDirective } from '../../../@keycloakify/login-ui-angular/login/directives/kc-class';
import { ComponentReference } from '../../../@keycloakify/login-ui-angular/login/classes/component-reference';
import { I18n } from '../../../@keycloakify/login-ui-angular/login/i18n';
import { LOGIN_I18N } from '../../../@keycloakify/login-ui-angular/login/tokens/i18n';
import { USE_DEFAULT_CSS } from '../../../@keycloakify/login-ui-angular/lib/tokens/use-default-css';
import { ClassKey } from '../../../@keycloakify/login-ui/core/kcClsx';
import { LOGIN_CLASSES } from '../../../@keycloakify/login-ui-angular/login/tokens/classes';

@Component({
  selector: 'kc-password-wrapper',
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KcClassDirective],
  templateUrl: 'password-wrapper.html',
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => PasswordWrapperComponent),
    },
  ],
})
export class PasswordWrapperComponent extends ComponentReference {
  i18n = inject<I18n>(LOGIN_I18N);
  private renderer = inject(Renderer2);
  passwordInputId = input.required<string>();
  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);

  isPasswordRevealed: WritableSignal<boolean> = signal(false);
  label = input.required<string>();

  togglePasswordVisibility(): void {
    this.isPasswordRevealed.update((revealed) => !revealed);
    this.setPasswordInputType();
  }

  private setPasswordInputType(): void {
    const input = document.getElementById(this.passwordInputId());
    if (input) {
      this.renderer.setProperty(input, 'type', this.isPasswordRevealed() ? 'text' : 'password');
    }
  }
}
