import { Component, input } from '@angular/core';
import { type ChatPayload } from '@sorokchat-messenger/contracts';

@Component({
  selector: 'app-chats-avatar',
  imports: [],
  templateUrl: './chats-avatar.html',
  styleUrl: './chats-avatar.scss',
})
export class ChatsAvatar {
  public readonly chat = input.required<ChatPayload>();
}
