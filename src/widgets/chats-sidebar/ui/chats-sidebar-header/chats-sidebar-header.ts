import { IconButton, NEW_CHAT_ICON, type IconType } from '@/shared';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-chats-sidebar-header',
  imports: [IconButton],
  templateUrl: './chats-sidebar-header.html',
  styleUrl: './chats-sidebar-header.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ChatsSidebarHeader {
  protected readonly newChatIcon: IconType = NEW_CHAT_ICON;

  public createChat() {
    alert("Crearate chat");
  }
}
