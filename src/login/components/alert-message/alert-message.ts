import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { ComponentReference } from '../../../@keycloakify/login-ui-angular/login/classes/component-reference';
import { KcClassDirective } from '../../../@keycloakify/login-ui-angular/login/directives/kc-class';
import { I18n } from '../../../@keycloakify/login-ui-angular/login/i18n';
import { LOGIN_I18N } from '../../../@keycloakify/login-ui-angular/login/tokens/i18n';
import { LOGIN_CLASSES } from '../../../@keycloakify/login-ui-angular/login/tokens/classes';
import { ClassKey } from '../../../@keycloakify/login-ui/core/kcClsx';
import { USE_DEFAULT_CSS } from '../../../@keycloakify/login-ui-angular/lib/tokens/use-default-css';
import { KcContext } from '../../../kc.gen';
import { KC_LOGIN_CONTEXT } from '../../../@keycloakify/login-ui-angular/login/tokens/kc-context';
import { KcSanitizePipe } from '../../../@keycloakify/login-ui-angular/lib/pipes/kc-sanitize';

@Component({
  selector: 'kc-alert-message',
  imports: [NgClass, KcClassDirective, KcSanitizePipe],
  standalone: true,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  templateUrl: './alert-message.html',
})
export class AlertMessageComponent extends ComponentReference {
  i18n = inject<I18n>(LOGIN_I18N);
  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);

  kcContext = inject<KcContext>(KC_LOGIN_CONTEXT);
}
