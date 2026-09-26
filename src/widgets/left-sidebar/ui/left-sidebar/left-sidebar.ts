import { IconLink, type Page } from '@/shared';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  imports: [IconLink],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class LeftSidebar {
  public readonly topMenu = input<Page[]>([]);
  public readonly bottomMenu = input<Page[]>([]);
}
