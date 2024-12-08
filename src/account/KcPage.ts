import { getDefaultPageComponent, type KcPage } from '@keycloakify/angular/account';
import { TemplateComponent } from '@keycloakify/angular/account/template';
import type { ClassKey } from 'keycloakify/account';
import type { KcContext } from './KcContext';

const classes = {} satisfies Partial<Record<ClassKey, string>>;
const doUseDefaultCss = true;

export async function getKcPage(pageId: KcContext['pageId']): Promise<KcPage> {
  switch (pageId) {
    case 'password.ftl':
      return {
        PageComponent: (await import('./pages/password/password.component')).PasswordComponent,
        TemplateComponent,
        classes,
        doUseDefaultCss,
      };
    case 'account.ftl':
      return {
        PageComponent: (await import('./pages/account/account.component')).AccountComponent,
        TemplateComponent,
        classes,
        doUseDefaultCss,
      };
    default:
      return {
        PageComponent: await getDefaultPageComponent(pageId),
        TemplateComponent,
        doUseDefaultCss,
        classes,
      };
  }
}
