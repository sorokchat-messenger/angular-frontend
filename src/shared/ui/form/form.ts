import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { validate, type FieldTree } from '@angular/forms/signals';

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

  public submit(event: SubmitEvent): void {
    event.preventDefault();
    const formSignal = this.form();
    const form = formSignal();
    if (form.valid()) {
      this.send.emit(form.value());
    }
  }
}
