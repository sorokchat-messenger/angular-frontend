import { type ButtonType } from '../../types';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class Button {
  public readonly type = input<ButtonType>('button');
  public readonly disabled = input<boolean>(false);
}
