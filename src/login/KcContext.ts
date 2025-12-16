import type { KcEnvName, ThemeName } from '../kc.gen';
import { ExtendKcContext } from '../@keycloakify/login-ui/core/KcContext';


export type KcContextExtension = {
  themeName: ThemeName;
  properties: Record<KcEnvName, string> & {};
};

export type KcContextExtensionPerPage = {
  // Here you can declare additional properties on the KcContext
  // See: https://docs.keycloakify.dev/faq-and-help/some-values-you-need-are-missing-from-in-kccontext
};

export type KcContext = ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>;
