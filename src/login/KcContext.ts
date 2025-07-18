import type { ExtendKcContext } from 'keycloakify/login';
import type { KcEnvName, ThemeName } from '../kc.gen';

export type KcContextExtension = {
  themeName: ThemeName;
  properties: Record<KcEnvName, string> & {};
};

export type KcContextExtensionPerPage = {
  'mobile_number_form.ftl': {
    phonenumber: string;
    mobileInputFieldPlaceholder: string;
  };
  // Here you can declare additional properties on the KcContext
  // See: https://docs.keycloakify.dev/faq-and-help/some-values-you-need-are-missing-from-in-kccontext
};

export type KcContext = ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>;
