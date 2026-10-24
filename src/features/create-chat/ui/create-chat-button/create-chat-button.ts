import { IconButton, IconType, ModalService, NEW_CHAT_ICON } from '@/shared';
import { Component, inject } from '@angular/core';
import { CreateChatModal } from '../create-chat-modal';

@Component({
  selector: 'app-create-chat-button',
  imports: [IconButton],
  templateUrl: './create-chat-button.html',
  styleUrl: './create-chat-button.scss',
})
export class CreateChatButton {
  protected readonly newChatIcon: IconType = NEW_CHAT_ICON;

  private readonly modalService = inject(ModalService);

  public createChat() {
    this.modalService.open(CreateChatModal);
  }
}
