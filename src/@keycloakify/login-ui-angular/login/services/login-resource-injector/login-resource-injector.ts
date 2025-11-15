import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, of, switchMap } from 'rxjs';
import { Script } from '../../../lib/models/script';
import { ResourceInjectorService } from '../../../lib/services/resource-injector';
import { KC_LOGIN_CONTEXT } from '../../tokens/kc-context';
import { KcContext } from '@keycloakify/angular/login/KcContext';

@Injectable({
    providedIn: 'root'
})
export class LoginResourceInjectorService {
    private kcContext: KcContext = inject<KcContext>(KC_LOGIN_CONTEXT);
    private resourceInjectorService: ResourceInjectorService = inject(
        ResourceInjectorService
    );

    injectResource(doUseDefaultCss = true) {
        if (!doUseDefaultCss) {
            this.injectScripts();
            return of(true);
        }
        //reversed order of stylesheets to accomodate prepending to head
        const stylesheets = [
            `${this.kcContext.url.resourcesPath}/keycloak-theme/login/css/login.css`,
            `${this.kcContext.url.resourcesCommonPath}/lib/pficon/pficon.css`,
            `${this.kcContext.url.resourcesPath}/keycloak-theme/login/resources-common/vendor/patternfly-v5/patternfly-addons.css`,
            `${this.kcContext.url.resourcesPath}/keycloak-theme/login/resources-common/vendor/patternfly-v5/patternfly.min.css`,
        ];

        return forkJoin(
            stylesheets.map(url => this.resourceInjectorService.createLink(url))
        ).pipe(
            switchMap(() => {
                this.injectScripts();
                return of(true);
            }),
            catchError(error => {
                console.error('Error loading styles:', error);
                return of(false);
            })
        );
    }

    insertAdditionalScripts(scripts: Script[]) {
        scripts.map(script => this.resourceInjectorService.createScript(script));
    }

    private injectScripts() {
        const scripts: Script[] = [
            {
                type: 'module',
                id: `${this.kcContext.url.resourcesPath}/js/menu-button-links.js`,
                src: `${this.kcContext.url.resourcesPath}/js/menu-button-links.js`
            },
            ...(this.kcContext.scripts ?? []).map(script => ({
                type: 'text/javascript',
                src: script,
                id: script
            })),
            {
                type: 'module',
                id: 'authenticationSession',
                textContent: [
                    `import { startSessionPolling, checkAuthSession } from "${this.kcContext.url.resourcesPath}/js/authChecker.js";`,
                    ``,
                    `startSessionPolling("${this.kcContext.url.ssoLoginInOtherTabsUrl}");`,
                    this.kcContext.authenticationSession === undefined
                        ? ''
                        : `checkAuthSession("${this.kcContext.authenticationSession.authSessionIdHash}");`
                ].join('\n')
            }
        ];
        this.insertAdditionalScripts(scripts);
    }
}
