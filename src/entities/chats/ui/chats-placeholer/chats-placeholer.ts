import { CHATS_ICON, Icon, NEW_CHAT_ICON, PLACEHOLDER_ICON_SIZE, TEXT_ICON_SIZE, type IconType } from '@/shared';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-chats-placeholer',
  imports: [Icon],
  templateUrl: './chats-placeholer.html',
  styleUrl: './chats-placeholer.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ChatsPlaceholer {
  protected readonly icon: IconType = CHATS_ICON;
  protected readonly iconSize: number = PLACEHOLDER_ICON_SIZE;
  protected readonly newChatIcon: IconType = NEW_CHAT_ICON;
  protected readonly newChatIconSize: number = TEXT_ICON_SIZE;
}
