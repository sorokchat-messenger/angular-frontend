import { ICON_SIZE } from '@/shared/constants';
import { type IconType } from '@/shared/types';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-icon-button',
  imports: [Icon],
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class IconButton {
  public readonly icon = input.required<IconType>();
  public readonly size = input<number>(ICON_SIZE);
}
