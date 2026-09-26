import { IconLink, type Page } from '@/shared';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-sidebar-menu',
  imports: [IconLink],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class SidebarMenu {
  public readonly menu = input.required<Page[]>();
}
