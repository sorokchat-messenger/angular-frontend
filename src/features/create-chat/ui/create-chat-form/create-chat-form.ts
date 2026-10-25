import { Component, inject, signal } from '@angular/core';
import { Button, Field, Form, withZod } from '@/shared';
import { NewChatSchema, type NewChatPayload } from '@sorokchat-messenger/contracts';
import { form } from '@angular/forms/signals';
import { ModalRef } from '@/shared/utils/modal-ref';
import { injectCreateChatMutation } from '../../api';

@Component({
  selector: 'app-create-chat-form',
  imports: [Form, Field, Button],
  templateUrl: './create-chat-form.html',
  styleUrl: './create-chat-form.scss',
})
export class CreateChatForm {
  private readonly model = signal<Required<NewChatPayload>>({
    name: "",
    description: ""
  });

  private readonly muration = injectCreateChatMutation();

  private readonly ref = inject(ModalRef);

  protected readonly form = form(this.model, withZod(NewChatSchema));

  protected create(payload: NewChatPayload): void {
    this.muration.mutate(payload);
    this.ref.close();
  }
}
