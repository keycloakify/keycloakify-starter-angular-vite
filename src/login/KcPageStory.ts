/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, inject, OnInit, Type } from '@angular/core';
import { StoryContext } from '@storybook/angular';
import { TemplateComponent } from './template';
import { getI18n } from './i18n';
import { KC_LOGIN_CONTEXT } from '../@keycloakify/login-ui-angular/login/tokens/kc-context';
import { provideKeycloakifyAngular } from '../@keycloakify/login-ui-angular/login/providers/keycloakify-angular';
import { classes, doMakeUserConfirmPassword, doUseDefaultCss, getKcPage } from './KcPage';
import { getKcContextMock } from '../@keycloakify/login-ui-angular/login/KcContextMock';

type StoryContextLike = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globals: Record<string, any>;
};

export const decorators = (_: unknown, context: StoryContextLike) => ({
  applicationConfig: {
    providers: [
      provideKeycloakifyAngular({
        doMakeUserConfirmPassword: doMakeUserConfirmPassword,
        doUseDefaultCss: doUseDefaultCss,
        classes: classes,
        kcContext: getKcContextMock({
          pageId: context.globals['pageId'],
          overrides: context.globals['kcContext'],
        }),
        getI18n: getI18n,
      }),
    ],
  },
});

@Component({
  selector: 'kc-page-story',
  template: `@if (pageComponent) {
    <kc-root
      [page]="pageComponent"
      [userProfileFormFields]="userProfileFormFieldsComponent"
    ></kc-root>
  }`,
  standalone: true,
  imports: [TemplateComponent],
})
export class KcPageStory implements OnInit {
  pageComponent: Type<unknown> | undefined;
  kcContext = inject(KC_LOGIN_CONTEXT);
  userProfileFormFieldsComponent: Type<unknown> | undefined;
  ngOnInit() {
    getKcPage(this.kcContext.pageId).then((kcPage) => {
      this.pageComponent = kcPage.PageComponent;
      this.userProfileFormFieldsComponent = kcPage.UserProfileFormFieldsComponent;
    });
  }
}
