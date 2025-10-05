import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { KcClassDirective } from '../../../@keycloakify/login-ui-angular/login/directives/kc-class';
import { LOGIN_I18N } from '../../../@keycloakify/login-ui-angular/login/tokens/i18n';
import { I18n } from '../../i18n';
import { KcContext } from '../../../kc.gen';
import { KC_LOGIN_CONTEXT } from '../../../@keycloakify/login-ui-angular/login/tokens/kc-context';
import { PasswordComponent } from '../../components/field/password';
import { InputComponent } from '../../components/field/input';
import { CheckboxComponent } from '../../components/field/checkbox';
import { LoginButtonComponent } from '../../components/buttons/login-button';
import { ConditionalUiDataComponent } from '../../components/conditional-ui-data';

@Component({
  selector: 'kc-form',
  templateUrl: './form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KcClassDirective,
    InputComponent,
    PasswordComponent,
    CheckboxComponent,
    LoginButtonComponent,
    ConditionalUiDataComponent,
  ],
})
export class LoginFormComponent {
  kcContext = inject<Extract<KcContext, { pageId: 'login.ftl' }>>(KC_LOGIN_CONTEXT);
  i18n = inject<I18n>(LOGIN_I18N);

  get usernameLabel(): string {
    const { realm } = this.kcContext;
    if (!realm.loginWithEmailAllowed) {
      return this.i18n.msgStr('username');
    } else if (!realm.registrationEmailAsUsername) {
      return this.i18n.msgStr('usernameOrEmail');
    } else {
      return this.i18n.msgStr('email');
    }
  }
}
