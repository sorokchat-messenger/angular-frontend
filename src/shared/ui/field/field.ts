import { type InputType } from '../../types';
import { ChangeDetectionStrategy, Component, computed, input, type Signal } from '@angular/core';
import { FormField, type FieldState, type Field as FieldType } from '@angular/forms/signals';

@Component({
  selector: 'app-field',
  imports: [FormField],
  templateUrl: './field.html',
  styleUrl: './field.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class Field {
  public readonly field = input.required<FieldState<unknown, string | number>>();
  public readonly label = input.required<string>();
  public readonly placeholder = input.required<string>();
  public readonly type = input<InputType>('text');

  public get formField(): Signal<FieldType<any, string | number>> {
    return computed(() => this.field as unknown as FieldType<any, string | number>);
  }

  public get hasErrors(): Signal<boolean> {
    const field = this.field();
    return computed(() => field.dirty() && field.invalid());
  }

  public get name(): Signal<string> {
    return computed(() => this.field().name());
  }
}
