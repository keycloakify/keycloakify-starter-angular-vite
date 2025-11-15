import { ChangeDetectionStrategy, Component, forwardRef, inject } from '@angular/core';
import { USE_DEFAULT_CSS } from '../../../../@keycloakify/login-ui-angular/lib/tokens/use-default-css';
import { KcClassDirective } from '../../../../@keycloakify/login-ui-angular/login/directives/kc-class';
import { ComponentReference } from '../../../../@keycloakify/login-ui-angular/login/classes/component-reference';
import { I18n } from '../../../../@keycloakify/login-ui-angular/login/i18n';
import { LOGIN_I18N } from '../../../../@keycloakify/login-ui-angular/login/tokens/i18n';
import { KcContext } from '../../../../@keycloakify/login-ui/core/KcContext';
import { KC_LOGIN_CONTEXT } from '../../../../@keycloakify/login-ui-angular/login/tokens/kc-context';
import { ClassKey } from '../../../../@keycloakify/login-ui/core/kcClsx';
import { LOGIN_CLASSES } from '../../../../@keycloakify/login-ui-angular/login/tokens/classes';

@Component({
  selector: 'kc-language-select',
  imports: [KcClassDirective],
  standalone: true,
  styles: [
    `
      :host {
        display: contents;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => LanguageSelectComponent),
    }
  ],
  templateUrl: './language-select.html'
})
export class LanguageSelectComponent extends ComponentReference {
  i18n = inject<I18n>(LOGIN_I18N);
  kcContext = inject<KcContext>(KC_LOGIN_CONTEXT);
  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);
}
