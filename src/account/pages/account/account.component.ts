import { AsyncPipe, NgClass } from '@angular/common';
import { Component, forwardRef, inject } from '@angular/core';
import { ComponentReference } from '@keycloakify/angular/account/classes/component-reference';
import { KcClassDirective } from '@keycloakify/angular/account/directives/kc-class';
import { ACCOUNT_CLASSES } from '@keycloakify/angular/account/tokens/classes';
import { ACCOUNT_I18N } from '@keycloakify/angular/account/tokens/i18n';
import { KC_ACCOUNT_CONTEXT } from '@keycloakify/angular/account/tokens/kc-context';
import { KcSanitizePipe } from '@keycloakify/angular/lib/pipes/kc-sanitize';
import { USE_DEFAULT_CSS } from '@keycloakify/angular/lib/tokens/use-default-css';
import type { ClassKey } from 'keycloakify/account';
import { from, of, switchMap, take } from 'rxjs';
import { ClientService } from '../../api/client.service';
import type { I18n } from '../../i18n';
import type { KcContext } from '../../KcContext';

@Component({
  imports: [KcClassDirective, NgClass, AsyncPipe, KcSanitizePipe],
  selector: 'kc-account',
  templateUrl: 'account.component.html',
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => AccountComponent),
    },
  ],
})
export class AccountComponent extends ComponentReference {
  i18n = inject<I18n>(ACCOUNT_I18N);
  kcContext = inject<Extract<KcContext, { pageId: 'account.ftl' }>>(KC_ACCOUNT_CONTEXT);
  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(ACCOUNT_CLASSES);
  override additionalClasses: Partial<Record<ClassKey, string>> = {
    kcBodyClass: `${this.classes?.kcBodyClass} user`,
  };
  active = 'account';

  #clientService = inject(ClientService);

  userProfile$ = this.#clientService.getUserProfile();
  i18nMessages$ = this.#clientService.getI18nMessages();
  backFromAuthServer$ = this.#clientService.oidc$.pipe(
    switchMap((oidc) => (oidc.authMethod === 'back from auth server' ? of(oidc.backFromAuthServer) : of(null))),
  );
  goToAuthServer(params: {
    extraQueryParams?: Record<string, string>;
    redirectUrl?: string;
    transformUrlBeforeRedirect?: (url: string) => string;
  }) {
    this.#clientService.oidc$
      .pipe(
        switchMap(({ goToAuthServer }) => {
          return from(goToAuthServer(params));
        }),
        take(1),
      )
      .subscribe();
  }
}
