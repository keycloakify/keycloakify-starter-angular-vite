import { TemplateComponent } from './template';
import { getDefaultPageComponent } from '../@keycloakify/login-ui-angular/login/defaultPage';
import { ClassKey } from '../@keycloakify/login-ui/core/kcClsx';
import { KcContext } from '../@keycloakify/login-ui/core/KcContext';
import { KcPage } from '../@keycloakify/login-ui-angular/login';
import { Component } from '@angular/core';

export const classes = {} satisfies Partial<Record<ClassKey, string>>;
export const doUseDefaultCss = true;
export const doMakeUserConfirmPassword = true;

// Placeholder component for UserProfileFormFields
@Component({
  selector: 'kc-user-profile-form-fields',
  template: '<div>User Profile Form Fields Placeholder</div>',
  standalone: true
})
class UserProfileFormFieldsComponent {}

export async function getKcPage(pageId: KcContext['pageId']): Promise<KcPage> {
  switch (pageId) {
    case 'login.ftl':
      return {
        PageComponent: (await import('./pages/login/page')).PageComponent,
        TemplateComponent,
        UserProfileFormFieldsComponent,
        doMakeUserConfirmPassword,
        doUseDefaultCss,
        classes,
      };
    default:
      return {
        PageComponent: await getDefaultPageComponent(pageId),
        TemplateComponent,
        UserProfileFormFieldsComponent,
        doMakeUserConfirmPassword,
        doUseDefaultCss,
        classes,
      };
  }
}
