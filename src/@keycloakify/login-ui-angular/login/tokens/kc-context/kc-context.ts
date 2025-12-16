import { InjectionToken } from '@angular/core';
import { KcContext } from '../../../../login-ui/core/KcContext';

export const KC_LOGIN_CONTEXT = new InjectionToken<KcContext>('keycloak login context');
