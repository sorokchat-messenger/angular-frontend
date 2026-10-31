import { Component, input } from '@angular/core';
import { injectMessagesByChat, Message } from '../../api';
import { injectProfile } from '@/entities/authorization';

@Component({
  selector: 'app-messages-list',
  imports: [],
  templateUrl: './messages-list.html',
  styleUrl: './messages-list.scss',
})
export class MessagesList {
  private readonly profile = injectProfile();

  public readonly chatId = input.required<string>();

  protected readonly messages = injectMessagesByChat(this.chatId);

  public isMy(message: Message): boolean {
    const user = this.profile.data();
    if (!user) return false;
    return user.id as unknown as string === message.authorId;
  }
}
