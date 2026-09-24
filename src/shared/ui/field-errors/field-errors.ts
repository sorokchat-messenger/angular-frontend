import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { type ValidationError } from '@angular/forms/signals';

@Component({
  selector: 'app-field-errors',
  imports: [],
  templateUrl: './field-errors.html',
  styleUrl: './field-errors.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class FieldErrors {
  public readonly errors = input<ValidationError.WithFieldTree[]>([]);

  public readonly hasErrors = computed<boolean>(() => this.errors().length > 0);
}
