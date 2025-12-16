import { Component, inject, input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { KcClassDirective } from '../../../../@keycloakify/login-ui-angular/login/directives/kc-class';
import { ComponentReference } from '../../../../@keycloakify/login-ui-angular/login/classes/component-reference';
import { I18n } from '../../../../@keycloakify/login-ui-angular/login/i18n';
import { LOGIN_I18N } from '../../../../@keycloakify/login-ui-angular/login/tokens/i18n';
import { USE_DEFAULT_CSS } from '../../../../@keycloakify/login-ui-angular/lib/tokens/use-default-css';
import { ClassKey } from '../../../../@keycloakify/login-ui/core/kcClsx';
import { LOGIN_CLASSES } from '../../../../@keycloakify/login-ui-angular/login/tokens/classes';

@Component({
  selector: 'kc-username-required-fields-wrapper',
  imports: [KcClassDirective, NgTemplateOutlet],
  standalone: true,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  templateUrl: './username-required-fields-wrapper.html',
})
export class UsernameRequiredFieldsWrapperComponent extends ComponentReference {
  i18n = inject<I18n>(LOGIN_I18N);
  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);

  requiredFieldsTemplate = input<TemplateRef<HTMLElement>>();
  usernameTemplate = input<TemplateRef<HTMLElement>>();
}
