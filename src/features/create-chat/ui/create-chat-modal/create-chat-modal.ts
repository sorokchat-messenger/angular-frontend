import { Modal } from '@/shared';
import { Component } from '@angular/core';
import { CreateChatForm } from '../create-chat-form';

@Component({
  selector: 'app-create-chat',
  imports: [Modal, CreateChatForm],
  templateUrl: './create-chat-modal.html',
  styleUrl: './create-chat-modal.scss',
})
export class CreateChatModal {
}
