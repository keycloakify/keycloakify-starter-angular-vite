import { i18nBuilder } from '@keycloakify/angular/login';
import type { ThemeName } from '../kc.gen';


/** @see: https://docs.keycloakify.dev/i18n */
const { getI18n, ofTypeI18n } = i18nBuilder
  .withThemeName<ThemeName>()
  .withExtraLanguages({
    /* ... */
  })
  .withCustomTranslations({
    en: {
      smsAuthText: 'Your SMS code is %1$s and is valid for %2$d minutes.',
      smsAuthTitle: 'SMS Code',
      smsAuthLabel: 'SMS Code',
      smsAuthInstruction: 'Enter the code we sent to your device.',
      smsAuthSmsNotSent: 'The SMS could not be sent, because of {0}',
      smsAuthCodeExpired: 'The SMS code has expired.',
      smsAuthCodeInvalid: 'Invalid SMS code entered, please enter it again.',
      smsPhoneNumberTitle: 'Please enter your phone number',
      smsPhoneNumberLabel: 'Phone Number',
      smsPhoneNumberInstructions: 'Enter the phone number, including your country code, for 2FA SMS Authentication.',
      smsPhoneUpdate: 'Receive a one time code via SMS on your phone.',
      smsAuthenticator: 'SMS Authenticator',
      doSubmitMobile: 'Get SMS Code',
      numberFormatFailedToParse: 'Failed to parse the phone number, please enter it again.',
      numberFormatNoMatchingFilters:
        'Phone number format is not allowed. Please use a regular mobile or fixed line number.',
      numberFormatNumberInvalid: 'Phone number invalid, please enter it again.',
      'mobile-number-display-name': 'SMS Authenticator',
    },
    // cspell: disable
    fr: {
      smsAuthText: 'Votre code de vérification est %1$s et est valide pendant %2$d minutes.',
      smsAuthTitle: 'Code de vérification par SMS',
      smsAuthLabel: 'Code de vérification',
      smsAuthInstruction: 'Entrez le code que nous avons envoyé à votre appareil.',
      smsAuthSmsNotSent: "Le SMS n'a pas pu être envoyé en raison de {0}",
      smsAuthCodeExpired: 'Le code de vérification a expiré.',
      smsAuthCodeInvalid: 'Code invalide, veuillez le saisir à nouveau.',
      smsPhoneNumberTitle: 'Veuillez entrer votre numéro de téléphone',
      smsPhoneNumberLabel: 'Numéro de téléphone',
      smsPhoneNumberInstructions:
        "Entrez le numéro de téléphone, y compris l'indicatif du pays, pour l'authentification SMS à deux facteurs.",
      smsPhoneUpdate: 'Recevez un code de vérification par SMS sur votre téléphone.',
      smsAuthenticator: 'Authentification par SMS',
      doSubmitMobile: 'Obtenir le code de vérification',
      numberFormatFailedToParse: "Échec de l'analyse du numéro de téléphone, veuillez le saisir à nouveau.",
      numberFormatNoMatchingFilters:
        "Le format du numéro de téléphone n'est pas autorisé. Veuillez utiliser un numéro de téléphone mobile ou fixe valide.",
      numberFormatNumberInvalid: 'Numéro de téléphone invalide, veuillez le saisir à nouveau.',
      'mobile-number-display-name': 'Authentification par SMS',
    },
    // cspell: enable
  })
  .build();

type I18n = typeof ofTypeI18n;

export { getI18n, type I18n };
