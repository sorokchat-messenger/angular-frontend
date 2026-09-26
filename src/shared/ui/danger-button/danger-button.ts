import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-danger-button',
  imports: [],
  templateUrl: './danger-button.html',
  styleUrl: './danger-button.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class DangerButton { }
