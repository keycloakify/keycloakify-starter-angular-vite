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
import { UserProfileFormFieldsComponent } from '../../components/user-profile-form-fields/user-profile-form-fields.component';

@Component({
  selector: 'kc-root',
  templateUrl: './register.component.html',
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
    UserProfileFormFieldsComponent,
  ],
  providers: [{ provide: ComponentReference, useExisting: forwardRef(() => RegisterComponent) }],
})
export class RegisterComponent extends ComponentReference {
  kcContext = inject<Extract<KcContext, { pageId: 'register.ftl' }>>(KC_CONTEXT);
  displayRequiredFields = input(false);
  documentTitle = input<string>();
  bodyClassName = input<string>();
  override doUseDefaultCss = input<boolean>();
  override classes = input<Partial<Record<ClassKey, string>>>();
  isFormSubmittable = signal(false);
  areTermsAccepted = signal(false);
  displayInfo: boolean = false;
  displayMessage: boolean = !this.kcContext?.messagesPerField?.existsError('global');

  onCallback() {
    (document.getElementById('kc-register-form') as HTMLFormElement).submit();
  }
}
