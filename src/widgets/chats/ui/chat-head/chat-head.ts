import { DeleteChat } from '@/features';
import { Component, input } from '@angular/core';
import { type ChatPayload } from '@sorokchat-messenger/contracts';

@Component({
  selector: 'app-chat-head',
  imports: [DeleteChat],
  templateUrl: './chat-head.html',
  styleUrl: './chat-head.scss',
})
export class ChatHead {
  public readonly chat = input.required<ChatPayload>();
}
