import { Meta, StoryObj } from '@storybook/angular';
import { decorators, KcPageStory } from '../../KcPageStory';

const meta: Meta<KcPageStory> = {
  title: 'login/login.ftl',
  component: KcPageStory,
  decorators: decorators,
  globals: {
    pageId: 'login.ftl'
  }
};

export default meta;
type Story = StoryObj<KcPageStory>;

export const WithInvalidCredential: Story = {
  globals: {
    kcContext: {
      login: {
        username: 'johndoe'
      },
      messagesPerField: {
        existsError: (fieldName: string, ...otherFieldNames: string[]) => {
          const fieldNames = [fieldName, ...otherFieldNames];
          return (
            fieldNames.includes('username') || fieldNames.includes('password')
          );
        },
        get: (fieldName: string) => {
          return fieldName === 'username' || fieldName === 'password'
            ? 'Invalid username or password.'
            : '';
        }
      }
    }
  }
};

export const WithoutRegistration: Story = {
  globals: {
    kcContext: {
      realm: { registrationAllowed: false }
    }
  }
};

export const WithoutRememberMe: Story = {
  globals: {
    kcContext: {
      realm: { rememberMe: false }
    }
  }
};

export const WithoutPasswordReset: Story = {
  globals: {
    kcContext: {
      realm: { resetPasswordAllowed: false }
    }
  }
};

export const WithEmailAsUsername: Story = {
  globals: {
    kcContext: {
      realm: { loginWithEmailAllowed: false }
    }
  }
};

export const WithPresetUsername: Story = {
  globals: {
    kcContext: {
      login: { username: 'max.mustermann@mail.com' }
    }
  }
};

export const WithImmutablePresetUsername: Story = {
  globals: {
    kcContext: {
      auth: {
        attemptedUsername: 'max.mustermann@mail.com',
        showUsername: true
      },
      usernameHidden: true,
      message: {
        type: 'info',
        summary: 'Please re-authenticate to continue'
      }
    }
  }
};

export const WithSocialProviders: Story = {
  globals: {
    kcContext: {
      social: {
        displayInfo: true,
        providers: [
          {
            loginUrl: 'google',
            alias: 'google',
            providerId: 'google',
            displayName: 'Google',
          },
          {
            loginUrl: 'microsoft',
            alias: 'microsoft',
            providerId: 'microsoft',
            displayName: 'Microsoft',
          },
          {
            loginUrl: 'facebook',
            alias: 'facebook',
            providerId: 'facebook',
            displayName: 'Facebook',
          },
          {
            loginUrl: 'github',
            alias: 'github',
            providerId: 'github',
            displayName: 'Github',
          }
        ]
      }
    }
  }
};

export const WithoutPasswordField: Story = {
  globals: {
    kcContext: {
      realm: { password: false }
    }
  }
};

export const WithErrorMessage: Story = {
  globals: {
    kcContext: {
      message: {
        summary:
          'The time allotted for the connection has elapsed.<br/>The login process will restart from the beginning.',
        type: 'error'
      }
    }
  }
};

export const WithOneSocialProvider: Story = {
  globals: {
    kcContext: {
      social: {
        displayInfo: true,
        providers: [
          {
            loginUrl: 'google',
            alias: 'google',
            providerId: 'google',
            displayName: 'Google'
          }
        ]
      }
    }
  }
};

export const WithTwoSocialProviders: Story = {
  globals: {
    kcContext: {
      social: {
        displayInfo: true,
        providers: [
          {
            loginUrl: 'google',
            alias: 'google',
            providerId: 'google',
            displayName: 'Google'
          },
          {
            loginUrl: 'microsoft',
            alias: 'microsoft',
            providerId: 'microsoft',
            displayName: 'Microsoft'
          }
        ]
      }
    }
  }
};

export const WithMoreThanTwoSocialProviders: Story = {
  globals: {
    kcContext: {
      social: {
        displayInfo: true,
        providers: [
          {
            loginUrl: 'google',
            alias: 'google',
            providerId: 'google',
            displayName: 'Google'
          },
          {
            loginUrl: 'microsoft',
            alias: 'microsoft',
            providerId: 'microsoft',
            displayName: 'Microsoft'
          },
          {
            loginUrl: 'facebook',
            alias: 'facebook',
            providerId: 'facebook',
            displayName: 'Facebook'
          },
          {
            loginUrl: 'twitter',
            alias: 'twitter',
            providerId: 'twitter',
            displayName: 'Twitter'
          }
        ]
      }
    }
  }
};

export const WithSocialProvidersAndWithoutRememberMe: Story = {
  globals: {
    kcContext: {
      social: {
        displayInfo: true,
        providers: [
          {
            loginUrl: 'google',
            alias: 'google',
            providerId: 'google',
            displayName: 'Google'
          }
        ]
      },
      realm: { rememberMe: false }
    }
  }
};
