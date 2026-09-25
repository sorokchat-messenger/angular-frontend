import { type Page } from '@/shared';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  imports: [RouterLink],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class LeftSidebar {
  public readonly menu = input<Page[]>([]);
}
