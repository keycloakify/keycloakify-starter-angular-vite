/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RawComponent } from '@keycloakify/angular-email';

@Component({
  selector: 'fm-if',
  template: `<ng-email-raw [content]="$content()" /> <ng-content></ng-content> <ng-email-raw content="</#if>" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RawComponent],
})
export class IfComponent {
  $condition = input.required({ alias: 'condition' });
  $content = computed(() => `<#if ${this.$condition()}>`);
}

@Component({
  selector: 'fm-then',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class ThenComponent {}

@Component({
  selector: 'fm-else',
  template: `<ng-email-raw content="<#else>" /> <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RawComponent],
})
export class ElseComponent {}

@Component({
  selector: 'fm-else-if',
  template: `<ng-email-raw [content]="$content()" /> <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RawComponent],
})
export class ElseIfComponent {
  $condition = input.required({ alias: 'condition' });
  $content = computed(() => `<#elseif ${this.$condition()}>`);
}
