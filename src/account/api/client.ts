import type { Attribute } from 'keycloakify/login/KcContext/KcContext';

export type UserProfile = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  attributes: Record<string, string[]>;
  userProfileMetadata: {
    attributes: Attribute[];
    groups: {
      name: string;
      displayHeader: string;
      displayDescription: string;
    }[];
  };
};

export const userProfileMock: UserProfile = {
  id: 'd93e1772-4916-4243-850f-a6d9b2615716',
  username: 'testuser',
  firstName: 'Test',
  lastName: 'User',
  email: 'testuser@gmail.com',
  emailVerified: true,
  attributes: {
    favourite_pet: ['cat'],
    locale: ['en'],
  },
  userProfileMetadata: {
    attributes: [
      {
        name: 'locale',
        displayName: 'locale',
        required: false,
        readOnly: false,
        validators: {},
        multivalued: false,
        annotations: {},
      },
      {
        name: 'username',
        displayName: '${username}',
        required: true,
        readOnly: true,
        validators: {
          multivalued: {
            max: '1',
          },
          length: {
            max: 255,
            'ignore.empty.value': true,
            min: 3,
          },
        },
        multivalued: false,
        annotations: {},
      },
      {
        name: 'email',
        displayName: '${email}',
        required: true,
        readOnly: false,
        validators: {
          multivalued: {
            max: '1',
          },
          length: {
            max: 255,
            'ignore.empty.value': true,
          },
          email: {
            'ignore.empty.value': true,
          },
        },
        multivalued: false,
        annotations: {},
      },
      {
        name: 'firstName',
        displayName: '${firstName}',
        required: true,
        readOnly: false,
        validators: {
          multivalued: {
            max: '1',
          },
          length: {
            max: 255,
            'ignore.empty.value': true,
          },
        },
        multivalued: false,
        annotations: {},
      },
      {
        name: 'lastName',
        displayName: '${lastName}',
        required: true,
        readOnly: false,
        validators: {
          multivalued: {
            max: '1',
          },
          length: {
            max: 255,
            'ignore.empty.value': true,
          },
        },
        multivalued: false,
        annotations: {},
      },
      {
        name: 'favourite_pet',
        displayName: '${profile.attributes.favourite_pet}',
        required: true,
        readOnly: false,
        annotations: {
          inputType: 'select',
          inputOptionLabelsI18nPrefix: 'profile.attributes.favourite_pet',
        },
        validators: {
          multivalued: {
            max: '1',
          },
          options: {
            options: ['cat', 'dog', 'bird'],
          },
        },
        multivalued: false,
      },
    ],
    groups: [
      {
        name: 'user-metadata',
        displayHeader: 'User metadata',
        displayDescription: 'Attributes, which refer to user metadata',
      },
    ],
  },
};

export type I18nMessages = Record<string, string>;

export const i18nMessagesMock: I18nMessages = {
  username: 'Username',
  email: 'Email',
  firstName: 'First name',
  lastName: 'Last name',
  'profile.attributes.favourite_pet': 'Favourite pet',
  'profile.attributes.favourite_pet.cat': 'Cat',
  'profile.attributes.favourite_pet.dog': 'Dog',
  'profile.attributes.favourite_pet.bird': 'Bird',
};
