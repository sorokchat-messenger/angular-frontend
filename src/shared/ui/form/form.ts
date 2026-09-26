import { withoutEmpty } from '@/shared';
import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { type FieldTree } from '@angular/forms/signals';

@Component({
  selector: 'app-form',
  imports: [],
  templateUrl: './form.html',
  styleUrl: './form.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class Form<T> {
  public readonly form = input.required<FieldTree<T>>();
  public readonly send = output<T>();
  public readonly change = output<T>();

  public constructor() {
    effect(() => {
      const formSignal = this.form();
      const form = formSignal();
      if (form.valid()) {
        this.change.emit(withoutEmpty<T>(form.value() as Required<T>));
      }
    });
  }

  public submit(event: SubmitEvent): void {
    event.preventDefault();
    const formSignal = this.form();
    const form = formSignal();
    if (form.valid()) {
      this.send.emit(withoutEmpty<T>(form.value() as Required<T>));
    }
  }
}
