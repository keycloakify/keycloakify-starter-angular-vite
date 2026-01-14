import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  BodyComponent,
  ContainerComponent,
  HeadComponent,
  HtmlComponent,
  PreviewComponent,
  SectionComponent,
} from '@keycloakify/angular-email';

@Component({
  selector: 'kc-email',
  templateUrl: 'layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HtmlComponent, HeadComponent, PreviewComponent, BodyComponent, ContainerComponent, SectionComponent],
})
export class LayoutComponent {
  $locale = input<string>('en', { alias: 'locale' });
  $preview = input<string>('', { alias: 'preview' });
}
