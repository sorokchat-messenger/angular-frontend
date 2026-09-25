import { CHATS_PAGE } from '@/pages';
import { type Page } from '@/shared';
import { LeftSidebar } from '@/widgets';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, LeftSidebar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class MainLayout {
  protected readonly menu: Page[] = [CHATS_PAGE];
}
