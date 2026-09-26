import { ICON_SIZE } from '@/shared/constants';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideDynamicIcon, LucideIcon } from '@lucide/angular';

@Component({
  selector: 'app-icon',
  imports: [LucideDynamicIcon],
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class Icon {
  public readonly icon = input.required<LucideIcon>();
  public readonly size = input<number>(ICON_SIZE);
}
