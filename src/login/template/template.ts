import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  effect,
  EffectRef,
  forwardRef,
  inject,
  input,
  Renderer2,
  type Signal,
  type TemplateRef,
  type Type,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { KcContext } from '../KcContext';
import type { Observable } from 'rxjs';
import { ClassKey, getKcClsx } from '../../@keycloakify/login-ui/core/kcClsx';
import { KcClassDirective } from '../../@keycloakify/login-ui-angular/login/directives/kc-class';
import { LOGIN_CLASSES } from '../../@keycloakify/login-ui-angular/login/tokens/classes';
import { LoginResourceInjectorService } from '../../@keycloakify/login-ui-angular/login/services/login-resource-injector';
import { initializeDarkMode } from '../../@keycloakify/login-ui/core/darkMode';
import { KcSanitizePipe } from '../../@keycloakify/login-ui-angular/lib/pipes/kc-sanitize';
import { KC_LOGIN_CONTEXT } from '../../@keycloakify/login-ui-angular/login/tokens/kc-context';
import { ComponentReference } from '../../@keycloakify/login-ui-angular/login/classes/component-reference';
import { LOGIN_I18N } from '../../@keycloakify/login-ui-angular/login/tokens/i18n';
import { I18n } from '../../@keycloakify/login-ui-angular/login/i18n';
import { USE_DEFAULT_CSS } from '../../@keycloakify/login-ui-angular/lib/tokens/use-default-css';
import { FooterComponent } from '../components/template/footer';
import { AlertMessageComponent } from '../components/alert-message';
import { LanguageSelectComponent } from '../components/template/language-select';
import { RequiredFieldsNoticeComponent } from '../components/template/required-fields-notice';
import { TryAnotherWayLinkComponent } from '../components/template/try-another-way-link';
import { UsernameBlockComponent } from '../components/template/username-block';
import { UsernameRequiredFieldsWrapperComponent } from '../components/template/username-required-fields-wrapper';

@Component({
  selector: 'kc-root',
  templateUrl: 'template.html',
  imports: [
    AsyncPipe,
    KcSanitizePipe,
    NgTemplateOutlet,
    KcClassDirective,
    FooterComponent,
    AlertMessageComponent,
    LanguageSelectComponent,
    RequiredFieldsNoticeComponent,
    TryAnotherWayLinkComponent,
    UsernameBlockComponent,
    UsernameRequiredFieldsWrapperComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ComponentReference,
      useExisting: forwardRef(() => TemplateComponent),
    },
  ],
})
export class TemplateComponent extends ComponentReference {
  i18n = inject<I18n>(LOGIN_I18N);
  renderer = inject(Renderer2);
  #cdr = inject(ChangeDetectorRef);
  #effectRef: EffectRef;
  meta = inject(Meta);
  title = inject(Title);
  kcContext = inject<KcContext>(KC_LOGIN_CONTEXT);
  override doUseDefaultCss = inject<boolean>(USE_DEFAULT_CSS);
  override classes = inject<Partial<Record<ClassKey, string>>>(LOGIN_CLASSES);
  loginResourceInjectorService = inject(LoginResourceInjectorService);
  destroyRef = inject(DestroyRef);

  displayInfo = false;
  displayMessage = true;
  displayRequiredFields = false;
  documentTitle: string | undefined;
  bodyClassName: string | undefined;

  isReadyToRender$: Observable<boolean>;

  page = input<Type<unknown>>();
  pageRef = viewChild('pageRef', { read: ViewContainerRef });

  userProfileFormFields = input<Type<unknown>>();
  headerNode: Signal<TemplateRef<HTMLElement>> | undefined;
  infoNode: Signal<TemplateRef<HTMLElement>> | undefined;
  socialProvidersNode: Signal<TemplateRef<HTMLElement>> | undefined;

  constructor() {
    super();

    this.isReadyToRender$ = this.loginResourceInjectorService.injectResource(this.doUseDefaultCss);
    this.#effectRef = effect(
      () => {
        const page = this.page();
        const pageRef = this.pageRef();
        if (!page || !pageRef) return;

        const userProfileFormFields = this.userProfileFormFields();

        const compRef = pageRef.createComponent(page);
        if ('userProfileFormFields' in (compRef.instance as object) && userProfileFormFields) {
          compRef.setInput('userProfileFormFields', userProfileFormFields);
        }
        this.onComponentCreated(compRef.instance as object);
      },
      { manualCleanup: true },
    );

    const htmlDarkModeClassName = this.classes['kcDarkModeClass'] ?? (this.doUseDefaultCss ? 'pf-v5-theme-dark' : '');

    if (htmlDarkModeClassName) {
      const { cleanup } = initializeDarkMode({ htmlDarkModeClassName });
      this.destroyRef.onDestroy(cleanup);
    }
  }

  private applyKcIndexClasses() {
    const kcClsx = getKcClsx({
      doUseDefaultCss: this.doUseDefaultCss,
      classes: this.classes,
    }).kcClsx;
    const kcBodyClass = this.bodyClassName ?? kcClsx('kcBodyClass');
    const kcHtmlClass = kcClsx('kcHtmlClass');
    const kcBodyClasses = kcBodyClass.split(/\s+/);
    const kcHtmlClasses = kcHtmlClass.split(/\s+/);
    kcBodyClasses.forEach((klass: string) => {
      this.renderer.addClass(document.body, klass);
    });
    kcHtmlClasses.forEach((klass: string) => {
      this.renderer.addClass(document.documentElement, klass);
    });
  }

  onComponentCreated(compRef: object) {
    if ('displayInfo' in compRef) {
      this.displayInfo = !!compRef.displayInfo;
    }
    if ('displayMessage' in compRef) {
      this.displayMessage = !!compRef.displayMessage;
    }
    if ('displayRequiredFields' in compRef) {
      this.displayRequiredFields = !!compRef.displayRequiredFields;
    }
    if ('documentTitle' in compRef && compRef.documentTitle) {
      this.documentTitle = compRef.documentTitle as string;
    }
    if ('bodyClassName' in compRef && compRef.bodyClassName) {
      this.bodyClassName = compRef.bodyClassName as string;
    }
    if ('headerNode' in compRef && compRef.headerNode) {
      this.headerNode = compRef.headerNode as Signal<TemplateRef<HTMLElement>>;
    }
    if ('infoNode' in compRef && compRef.infoNode) {
      this.infoNode = compRef.infoNode as Signal<TemplateRef<HTMLElement>>;
    }
    if ('socialProvidersNode' in compRef && compRef.socialProvidersNode) {
      this.socialProvidersNode = compRef.socialProvidersNode as Signal<TemplateRef<HTMLElement>>;
    }
    this.title.setTitle(this.documentTitle ?? this.i18n.msgStr('loginTitle', this.kcContext.realm.displayName));
    this.applyKcIndexClasses();
    this.#cdr.markForCheck();
    this.#effectRef.destroy();
  }
}
