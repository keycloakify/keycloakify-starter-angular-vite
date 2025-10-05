import { createGetKcContextMock } from 'keycloakify/login/KcContext';
import { KcContextExtension, KcContextExtensionPerPage } from '../../../login/KcContext';
import { kcEnvDefaults, themeNames } from '../../../kc.gen';
const kcContextExtension: KcContextExtension = {
    themeName: themeNames[0],
    properties: {
        ...kcEnvDefaults
    }
};
const kcContextExtensionPerPage: KcContextExtensionPerPage = {};
export const { getKcContextMock } = createGetKcContextMock({
    kcContextExtension,
    kcContextExtensionPerPage,
    overrides: {},
    overridesPerPage: {}
});
