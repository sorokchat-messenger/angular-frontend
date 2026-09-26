import { CHATS_PAGE, SETTINGS_PAGE } from '@/pages';
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
  protected readonly topMenu: Page[] = [CHATS_PAGE];
  protected readonly bottomMenu: Page[] = [SETTINGS_PAGE];
}
