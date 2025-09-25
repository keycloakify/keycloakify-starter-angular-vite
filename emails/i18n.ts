import { GetMessages } from 'keycloakify-emails';

/**
 * we want to have this as function with a params, to give developers a
 * flexibility to initialize theirs own i18n solution here
 */

export const getMessages: GetMessages = (props) => {
  if (props.locale === 'en') {
    // this default properties are optional, if you omit them, they will be taken from a base theme
    return {
      'requiredAction.CONFIGURE_TOTP': 'Configure OTP',
      'requiredAction.TERMS_AND_CONDITIONS': 'Terms and Conditions',
      'requiredAction.UPDATE_PASSWORD': 'Update Password',
      'requiredAction.UPDATE_PROFILE': 'Update Profile',
      'requiredAction.VERIFY_EMAIL': 'Verify Email',
      'requiredAction.CONFIGURE_RECOVERY_AUTHN_CODES': 'Generate Recovery Codes',

      // # units for link expiration timeout formatting
      // # for languages which have more unit plural forms depending on the value (eg. Czech and other Slavic langs) you can override unit text for some other values like described in the Java choice format which is documented here. For Czech, it would be '{0,choice,0#minut|1#minuta|2#minuty|2<minut}'
      // # https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/text/MessageFormat.html
      // # https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/text/ChoiceFormat.html
      'linkExpirationFormatter.timePeriodUnit.seconds': '{0,choice,0#seconds|1#second|1<seconds}',
      'linkExpirationFormatter.timePeriodUnit.minutes': '{0,choice,0#minutes|1#minute|1<minutes}',
      'linkExpirationFormatter.timePeriodUnit.hours': '{0,choice,0#hours|1#hour|1<hours}',
      'linkExpirationFormatter.timePeriodUnit.days': '{0,choice,0#days|1#day|1<days}',
    };
  }
  if (props.locale == 'pl') {
    return {
      'requiredAction.CONFIGURE_TOTP': 'Skonfiguruj OTP',
      'requiredAction.TERMS_AND_CONDITIONS': 'Regulamin',
      'requiredAction.UPDATE_PASSWORD': 'Zmień hasło',
      'requiredAction.UPDATE_PROFILE': 'Zaktualizuj profil',
      'requiredAction.VERIFY_EMAIL': 'Zweryfikuj adres e-mail',
      'requiredAction.CONFIGURE_RECOVERY_AUTHN_CODES': 'Wygeneruj kody odzyskiwania',

      // # jednostki do formatowania czasu wygaśnięcia linku
      // # w językach, które mają więcej form liczby mnogiej w zależności od wartości (np. czeski i inne języki słowiańskie),
      // # można nadpisać tekst jednostki dla niektórych wartości, jak opisano w Java choice format.
      // # dla polskiego byłoby to np. '{0,choice,0#sekund|1#sekunda|2#sekundy|5<sekund}'
      'linkExpirationFormatter.timePeriodUnit.seconds': '{0,choice,0#sekund|1#sekunda|2#sekundy|5<sekund}',
      'linkExpirationFormatter.timePeriodUnit.minutes': '{0,choice,0#minut|1#minuta|2#minuty|5<minut}',
      'linkExpirationFormatter.timePeriodUnit.hours': '{0,choice,0#godzin|1#godzina|2#godziny|5<godzin}',
      'linkExpirationFormatter.timePeriodUnit.days': '{0,choice,0#dni|1#dzień|2#dni|5<dni}',
    };
  }
  return {
    'requiredAction.CONFIGURE_TOTP': '',
    'requiredAction.TERMS_AND_CONDITIONS': '',
    'requiredAction.UPDATE_PASSWORD': '',
    'requiredAction.UPDATE_PROFILE': '',
    'requiredAction.VERIFY_EMAIL': '',
    'requiredAction.CONFIGURE_RECOVERY_AUTHN_CODES': '',

    // # units for link expiration timeout formatting
    // # for languages which have more unit plural forms depending on the value (eg. Czech and other Slavic langs) you can override unit text for some other values like described in the Java choice format which is documented here. For Czech, it would be '{0,choice,0#minut|1#minuta|2#minuty|2<minut}'
    // # https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/text/MessageFormat.html
    // # https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/text/ChoiceFormat.html
    'linkExpirationFormatter.timePeriodUnit.seconds': '',
    'linkExpirationFormatter.timePeriodUnit.minutes': '',
    'linkExpirationFormatter.timePeriodUnit.hours': '',
    'linkExpirationFormatter.timePeriodUnit.days': '',
  };
};
