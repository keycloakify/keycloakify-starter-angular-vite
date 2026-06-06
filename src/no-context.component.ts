import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kc-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h1>No Keycloak Context</h1>`,
})
export class NoContextComponent {}
