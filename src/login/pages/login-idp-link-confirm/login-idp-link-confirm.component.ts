import { ChangeDetectionStrategy, Component, forwardRef, inject, input } from '@angular/core';
import { ClassKey } from 'keycloakify/login';
import { KcContext } from 'keycloakify/login/KcContext';
import { ComponentReference } from '../../classes/component-reference.class';
import { KC_CONTEXT } from '../../KcContext';

@Component({
  standalone: true,
  imports: [],
  selector: 'kc-root',
  templateUrl: 'login-idp-link-confirm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: ComponentReference, useExisting: forwardRef(() => LoginIdpLinkConfirmComponent) }],
})
export class LoginIdpLinkConfirmComponent extends ComponentReference {
  kcContext = inject<Extract<KcContext, { pageId: 'login-idp-link-confirm.ftl' }>>(KC_CONTEXT);
  override doUseDefaultCss = input<boolean>();
  override classes = input<Partial<Record<ClassKey, string>>>();
}
