import { Component, forwardRef, inject } from '@angular/core';
import { ComponentReference } from '../../../../@keycloakify/login-ui-angular/login/classes/component-reference';
import { KcClassDirective } from '../../../../@keycloakify/login-ui-angular/login/directives/kc-class';
import { GroupComponent } from '../../field/group';
import { I18n } from '../../../../@keycloakify/login-ui-angular/login/i18n';
import { LOGIN_I18N } from '../../../../@keycloakify/login-ui-angular/login/tokens/i18n';
import { USE_DEFAULT_CSS } from '../../../../@keycloakify/login-ui-angular/lib/tokens/use-default-css';
import { ClassKey } from '../../../../@keycloakify/login-ui/core/kcClsx';
import { LOGIN_CLASSES } from '../../../../@keycloakify/login-ui-angular/login/tokens/classes';
import { KcContext } from '../../../../@keycloakify/login-ui/core/KcContext';
import { KC_LOGIN_CONTEXT } from '../../../../@keycloakify/login-ui-angular/login/tokens/kc-context';

let idCounter = 0;

@Component({
  selector: 'kc-username-block',
  imports: [KcClassDirective, GroupComponent],
  standalone: true,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  templateUrl: './username-block.html',
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => UsernameBlockComponent),
    },
  ],
})
export class UsernameBlockComponent extends ComponentReference {
  i18n = inject<I18n>(LOGIN_I18N);
  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);
  kcContext = inject<KcContext>(KC_LOGIN_CONTEXT);

  location = window.location;
  inputId = `kc-attempted-username-${idCounter++}`;

  get usernameLabel(): string {
    const realm = this.kcContext.realm;
    return this.i18n.msgStr(
      !realm.loginWithEmailAllowed ? 'username' : !realm.registrationEmailAsUsername ? 'usernameOrEmail' : 'email',
    );
  }
}
