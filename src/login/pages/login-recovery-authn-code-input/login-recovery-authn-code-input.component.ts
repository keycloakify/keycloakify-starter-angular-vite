import { ChangeDetectionStrategy, Component, forwardRef, inject, input } from '@angular/core';
import { ClassKey } from 'keycloakify/login';
import { KcContext } from 'keycloakify/login/KcContext';
import { ComponentReference } from '../../classes/component-reference.class';
import { KC_CONTEXT } from '../../KcContext';

@Component({
  standalone: true,
  imports: [],
  selector: 'kc-root',
  templateUrl: 'login-recovery-authn-code-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: ComponentReference, useExisting: forwardRef(() => LoginRecoveryAuthnCodeInputComponent) }],
})
export class LoginRecoveryAuthnCodeInputComponent extends ComponentReference {
  kcContext = inject<Extract<KcContext, { pageId: 'login-recovery-authn-code-input.ftl' }>>(KC_CONTEXT);
  override doUseDefaultCss = input<boolean>();
  override classes = input<Partial<Record<ClassKey, string>>>();
}
