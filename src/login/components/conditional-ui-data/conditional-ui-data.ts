import { Component, inject } from '@angular/core';
import { ComponentReference } from '../../../@keycloakify/login-ui-angular/login/classes/component-reference';
import { KcClassDirective } from '../../../@keycloakify/login-ui-angular/login/directives/kc-class';
import { I18n } from '../../../@keycloakify/login-ui-angular/login/i18n';
import { LOGIN_I18N } from '../../../@keycloakify/login-ui-angular/login/tokens/i18n';
import { LOGIN_CLASSES } from '../../../@keycloakify/login-ui-angular/login/tokens/classes';
import { ClassKey } from '../../../@keycloakify/login-ui/core/kcClsx';
import { USE_DEFAULT_CSS } from '../../../@keycloakify/login-ui-angular/lib/tokens/use-default-css';
import { KcContext } from '../../../kc.gen';
import { KC_LOGIN_CONTEXT } from '../../../@keycloakify/login-ui-angular/login/tokens/kc-context';
import { LoginResourceInjectorService } from '../../../@keycloakify/login-ui-angular/login/services/login-resource-injector';
import { Script } from '../../../@keycloakify/login-ui-angular/lib/models/script';

@Component({
  selector: 'kc-conditional-ui-data',
  imports: [KcClassDirective],
  standalone: true,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  templateUrl: './conditional-ui-data.html',
})
export class ConditionalUiDataComponent extends ComponentReference {
  kcContext = inject<KcContext>(KC_LOGIN_CONTEXT);
  loginResourceInjectorService = inject(LoginResourceInjectorService);
  i18n = inject<I18n>(LOGIN_I18N);

  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);

  authButtonId = 'authenticateWebAuthnButton';

  constructor() {
    super();
    if (!this.kcContext.enableWebAuthnConditionalUI) {
      return;
    }
    const { url, isUserIdentified, challenge, userVerification, rpId, createTimeout } = this.kcContext;

    const authButtonId = this.authButtonId;

    const scripts: Script[] = [
      {
        type: 'module',
        id: 'ConditionalUIDataScript',
        textContent: `
          import { authenticateByWebAuthn } from "${url.resourcesPath}/js/webauthnAuthenticate.js";
          import { initAuthenticate } from "${url.resourcesPath}/js/passkeysConditionalAuth.js";

          const args = {
            isUserIdentified: ${isUserIdentified},
            challenge: '${challenge}',
            userVerification: '${userVerification}',
            rpId: '${rpId}',
            createTimeout: ${createTimeout}
          };

          document.addEventListener("DOMContentLoaded", (event) => initAuthenticate({errmsg : "${this.i18n.msgStr('passkey-unsupported-browser-text')}", ...args}));
          const authButton = document.getElementById('${authButtonId}');
          if (authButton) {
              authButton.addEventListener("click", (event) => {
                  event.preventDefault();
                  authenticateByWebAuthn({errmsg : "${this.i18n.msgStr('webauthn-unsupported-browser-text')}", ...args});
              });
          }
        `,
      },
    ];

    this.loginResourceInjectorService.insertAdditionalScripts(scripts);
  }
}
