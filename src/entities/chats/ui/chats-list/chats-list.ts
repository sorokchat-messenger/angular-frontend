import { Component, input } from '@angular/core';
import { type ChatPayload } from '@sorokchat-messenger/contracts';
import { ChatsAvatar } from '../chats-avatar';
import { RouterLink } from '@angular/router';
import { Path } from '@/shared';

@Component({
  selector: 'app-chats-list',
  imports: [ChatsAvatar, RouterLink],
  templateUrl: './chats-list.html',
  styleUrl: './chats-list.scss',
})
export class ChatsList {
  public readonly chats = input.required<ChatPayload[]>();

  protected link(id: string): string {
    return `${Path.CHATS_PAGE.fullPath}/${id}`;
  }
}
