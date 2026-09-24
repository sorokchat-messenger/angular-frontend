import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-field-label',
  imports: [],
  templateUrl: './field-label.html',
  styleUrl: './field-label.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class FieldLabel {
  public readonly inputId = input.required<string>();
}
