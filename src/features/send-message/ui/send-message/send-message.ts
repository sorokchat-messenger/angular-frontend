import { Form, withZod, Input, type IconType, SEND_ICON, IconButton } from '@/shared';
import { Component, inject, input, signal } from '@angular/core';
import { type SendMessagePayload, SendMessageSchema } from '../../model';
import { form } from '@angular/forms/signals';
import { injectProfile, MessagesService } from '@/entities';

@Component({
  selector: 'app-send-message',
  imports: [Form, Input, IconButton],
  templateUrl: './send-message.html',
  styleUrl: './send-message.scss',
})
export class SendMessage {
  private readonly initialState: SendMessagePayload = { text: "" };
  private readonly model = signal<SendMessagePayload>(this.initialState);
  private readonly service: MessagesService = inject(MessagesService);
  private readonly profile = injectProfile();

  public readonly chatId = input.required<string>();

  protected readonly form = form(this.model, withZod(SendMessageSchema));
  protected readonly icon: IconType = SEND_ICON;

  public send(payload: SendMessagePayload): void {
    const authorId = this.profile.data()!.id as unknown as string;
    const chatId = this.chatId();
    this.service.send({ ...payload, authorId, chatId });
    this.model.set(this.initialState);
  }
}
