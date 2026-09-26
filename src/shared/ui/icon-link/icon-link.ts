import { ICON_SIZE } from '../../constants';
import { type IconType } from '../../types';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-icon-link',
  imports: [RouterLink, RouterLinkActive, Icon],
  templateUrl: './icon-link.html',
  styleUrl: './icon-link.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class IconLink {
  public readonly icon = input.required<IconType>();
  public readonly size = input<number>(ICON_SIZE);
  public readonly path = input.required<string>();
}
