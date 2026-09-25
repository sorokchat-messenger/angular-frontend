import { type Page } from '@/shared';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  selector: 'app-left-sidebar',
  imports: [RouterLink, RouterLinkActive, LucideDynamicIcon],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class LeftSidebar {
  public readonly menu = input<Page[]>([]);
}
