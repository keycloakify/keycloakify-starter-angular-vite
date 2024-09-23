import { ChangeDetectionStrategy, Component, computed, forwardRef, input, output, Signal } from '@angular/core';
import { Attribute, ClassKey } from 'keycloakify/login';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { FormAction, FormFieldError } from '../../services/user-profile-form.service';
import { KcClassDirective } from '../../directives/kc-class.directive';
import { ComponentReference } from '../../classes/component-reference.class';

@Component({
  standalone: true,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  imports: [TranslatePipe, KcClassDirective],
  selector: 'kc-input-tag-selects',
  templateUrl: 'input-tag-selects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: ComponentReference, useExisting: forwardRef(() => InputTagSelectsComponent) }],
})
export class InputTagSelectsComponent extends ComponentReference {
  attribute = input<Attribute>();
  valueOrValues = input<string | string[]>();
  dispatchFormAction = output<FormAction>();
  displayableErrors = input<FormFieldError[]>();
  override doUseDefaultCss = input<boolean>();
  override classes = input<Partial<Record<ClassKey, string>>>();

  context: Signal<{
    inputType: 'radio' | 'checkbox';
    classDiv: ClassKey;
    classInput: ClassKey;
    classLabel: ClassKey;
  } | null> = computed(() => {
    const attribute = this.attribute();
    if (attribute) {
      const { inputType } = attribute.annotations;
      switch (inputType) {
        case 'select-radiobuttons':
          return {
            inputType: 'radio',
            classDiv: 'kcInputClassRadio',
            classInput: 'kcInputClassRadioInput',
            classLabel: 'kcInputClassRadioLabel',
          };
        case 'multiselect-checkboxes':
          return {
            inputType: 'checkbox',
            classDiv: 'kcInputClassCheckbox',
            classInput: 'kcInputClassCheckboxInput',
            classLabel: 'kcInputClassCheckboxLabel',
          };
      }
    }
    return null;
  });

  options = computed(() => {
    const attribute = this.attribute();
    if (attribute) {
      return (() => {
        walk: {
          const { inputOptionsFromValidation } = attribute.annotations;

          if (inputOptionsFromValidation === undefined) {
            break walk;
          }

          const validator = (attribute.validators as Record<string, { options?: string[] }>)[
            inputOptionsFromValidation
          ];

          if (validator === undefined) {
            break walk;
          }

          if (validator.options === undefined) {
            break walk;
          }

          return validator.options;
        }

        return attribute.validators.options?.options ?? [];
      })();
    }
    return [];
  });

  checked(option: string) {
    const valueOrValues = this.valueOrValues();
    if (valueOrValues instanceof Array) {
      return valueOrValues.includes(option);
    }
    return valueOrValues === option;
  }

  onChange(event: Event, option: string) {
    const valueOrValues = this.valueOrValues();
    const isChecked = (event.target as HTMLInputElement).checked;
    this.dispatchFormAction.emit({
      action: 'update',
      name: this.attribute()?.name ?? '',
      valueOrValues: (() => {
        if (valueOrValues instanceof Array) {
          const newValues = [...valueOrValues];

          if (isChecked) {
            newValues.push(option);
          } else {
            newValues.splice(newValues.indexOf(option), 1);
          }

          return newValues;
        }

        return (event.target as HTMLInputElement)?.checked ? option : '';
      })(),
    });
  }

  onBlur() {
    this.dispatchFormAction.emit({
      action: 'focus lost',
      name: this.attribute()?.name ?? '',
      fieldIndex: undefined,
    });
  }
}
