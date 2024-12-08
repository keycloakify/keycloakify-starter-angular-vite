import { createOidc } from 'oidc-spa';
import { createMockOidc } from 'oidc-spa/mock';

const publicUrl = undefined;
const isAuthGloballyRequired = true;

export const oidc = import.meta.env.DEV
  ? createMockOidc({
      isUserInitiallyLoggedIn: true,
      publicUrl,
      isAuthGloballyRequired,
    })
  : createOidc({
      issuerUri: (() => {
        const [
          // "" or "/auth"
          kcHttpRelativePath,
          // "myrealm/account"
          startsWithRealm,
        ] = window.location.pathname.split('/realms/');

        const realm = startsWithRealm.split('/')[0];

        return `${window.location.origin}${kcHttpRelativePath}/realms/${realm}`;
      })(),
      clientId: 'account-console',
      publicUrl,
      isAuthGloballyRequired,
    });
