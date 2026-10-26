import { type Page } from '@/shared';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SidebarMenu } from '../sidebar-menu';

@Component({
  selector: 'app-left-sidebar',
  imports: [SidebarMenu],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class LeftSidebar {
  public readonly topMenu = input<Page[]>([]);
  public readonly bottomMenu = input<Page[]>([]);
}
