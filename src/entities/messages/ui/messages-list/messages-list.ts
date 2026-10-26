import { Component, computed, inject, input } from '@angular/core';
import { MessagesService } from '../../api';

@Component({
  selector: 'app-messages-list',
  imports: [],
  templateUrl: './messages-list.html',
  styleUrl: './messages-list.scss',
})
export class MessagesList {
  public readonly chatId = input.required<string>();

  private readonly service: MessagesService = inject(MessagesService);

  protected readonly messages = computed(() => this.service.getByChat(this.chatId())());
}
