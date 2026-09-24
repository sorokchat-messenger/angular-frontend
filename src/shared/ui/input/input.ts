import { type InputType } from '@/shared/types';
import { ChangeDetectionStrategy, Component, computed, input, Signal } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';
import { type FieldState } from '@angular/forms/signals';

@Component({
  selector: 'app-input',
  imports: [FormField],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class Input {
  public readonly placeholder = input.required<string>();
  public readonly type = input<InputType>('text');
  public readonly field = input.required<FieldState<unknown, string | number>>();
  public readonly hasErrors = input<boolean>(false);

  public get formField(): Signal<Field<any, string | number>> {
    return computed(() => this.field as unknown as Field<any, string | number>);
  }

  public get name(): Signal<string> {
    return computed(() => this.field().name());
  }
}
