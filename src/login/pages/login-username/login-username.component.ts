import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, inject, input, signal } from '@angular/core';
import { ClassKey } from 'keycloakify/login';
import { KcContext } from 'keycloakify/login/KcContext';
import { KC_CONTEXT } from '../../KcContext';
import { ComponentReference } from '../../classes/component-reference.class';
import {
  KcInputDirective,
  PasswordWrapperComponent,
} from '../../components/password-wrapper/password-wrapper.component';
import { TemplateComponent } from '../../containers/template.component';
import { KcClassDirective } from '../../directives/kc-class.directive';
import { SafePipe } from '../../pipes/safe.pipe';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'kc-root',
  templateUrl: './login-username.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KcClassDirective,
    AsyncPipe,
    SafePipe,
    PasswordWrapperComponent,
    NgClass,
    TemplateComponent,
    TranslatePipe,
    KcInputDirective,
  ],
  providers: [{ provide: ComponentReference, useExisting: forwardRef(() => LoginUsernameComponent) }],
})
export class LoginUsernameComponent extends ComponentReference {
  kcContext = inject<Extract<KcContext, { pageId: 'login-username.ftl' }>>(KC_CONTEXT);
  displayRequiredFields = input(false);
  documentTitle = input<string>();
  bodyClassName = input<string>();
  override doUseDefaultCss = input<boolean>();
  override classes = input<Partial<Record<ClassKey, string>>>();
  isLoginButtonDisabled = signal(false);
  displayInfo: boolean =
    !!this.kcContext?.realm?.password &&
    !!this.kcContext?.realm?.registrationAllowed &&
    !this.kcContext?.registrationDisabled;
  displayMessage: boolean = !this.kcContext?.messagesPerField?.existsError('username');
}
