import { Component, inject } from '@angular/core';
import type { ClassKey } from '../../../../@keycloakify/login-ui/core/kcClsx';
import { ComponentReference } from '../../../../@keycloakify/login-ui-angular/login/classes/component-reference';
import { KcClassDirective } from '../../../../@keycloakify/login-ui-angular/login/directives/kc-class';
import { I18n } from '../../../../@keycloakify/login-ui-angular/login/i18n';
import { LOGIN_I18N } from '../../../../@keycloakify/login-ui-angular/login/tokens/i18n';
import { KcContext } from '../../../../@keycloakify/login-ui/core/KcContext';
import { KC_LOGIN_CONTEXT } from '../../../../@keycloakify/login-ui-angular/login/tokens/kc-context';
import { LOGIN_CLASSES } from '../../../../@keycloakify/login-ui-angular/login/tokens/classes';
import { USE_DEFAULT_CSS } from '../../../../@keycloakify/login-ui-angular/lib/tokens/use-default-css';
@Component({
  selector: 'kc-try-another-way-link',
  imports: [KcClassDirective],
  standalone: true,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  templateUrl: './try-another-way-link.html',
})
export class TryAnotherWayLinkComponent extends ComponentReference {
  i18n = inject<I18n>(LOGIN_I18N);
  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);
  kcContext = inject<KcContext>(KC_LOGIN_CONTEXT);
}
