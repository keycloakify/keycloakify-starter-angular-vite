import type { Type } from '@angular/core';
import { ClassKey } from '../../login-ui/core/kcClsx';

export { i18nBuilder } from 'keycloakify/login/i18n/noJsx';

export type KcPage = {
    PageComponent: Type<unknown>;
    TemplateComponent: Type<unknown>;
    doUseDefaultCss: boolean;
    classes: { [key in ClassKey]?: string };
    UserProfileFormFieldsComponent: Type<unknown>;
    doMakeUserConfirmPassword: boolean;
};
