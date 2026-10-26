import { Form, withZod, Input, type IconType, SEND_ICON, IconButton } from '@/shared';
import { Component, signal } from '@angular/core';
import { type SendMessagePayload, SendMessageSchema } from '../../model';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-send-message',
  imports: [Form, Input, IconButton],
  templateUrl: './send-message.html',
  styleUrl: './send-message.scss',
})
export class SendMessage {
  private readonly model = signal<SendMessagePayload>({ text: "" });
  protected readonly form = form(this.model, withZod(SendMessageSchema));
  protected readonly icon: IconType = SEND_ICON;

  public send(payload: SendMessagePayload): void {
    console.log(payload);
  }
}
