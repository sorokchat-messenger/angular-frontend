import { CHATS_ICON, Icon, PLACEHOLDER_ICON_SIZE, type IconType } from '@/shared';
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
}
