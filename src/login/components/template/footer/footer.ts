import { Component, inject } from '@angular/core';
import { USE_DEFAULT_CSS } from '../../../../@keycloakify/login-ui-angular/lib/tokens/use-default-css';
import { ComponentReference } from '../../../../@keycloakify/login-ui-angular/login/classes/component-reference';
import { I18n } from '../../../../@keycloakify/login-ui-angular/login/i18n';
import { LOGIN_I18N } from '../../../../@keycloakify/login-ui-angular/login/tokens/i18n';
import { LOGIN_CLASSES } from '../../../../@keycloakify/login-ui-angular/login/tokens/classes';
import { ClassKey } from '../../../../@keycloakify/login-ui/core/kcClsx';

@Component({
  selector: 'kc-footer',
  imports: [],
  standalone: true,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  templateUrl: './footer.html',
})
export class FooterComponent extends ComponentReference {
  i18n = inject<I18n>(LOGIN_I18N);
  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);
}
