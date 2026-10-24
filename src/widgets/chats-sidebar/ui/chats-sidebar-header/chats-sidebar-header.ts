import { CreateChat } from '@/features';
import { IconButton, ModalService, NEW_CHAT_ICON, type IconType } from '@/shared';
import { ModalRef } from '@/shared/utils/modal-ref';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-chats-sidebar-header',
  imports: [IconButton],
  templateUrl: './chats-sidebar-header.html',
  styleUrl: './chats-sidebar-header.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ChatsSidebarHeader {
  protected readonly newChatIcon: IconType = NEW_CHAT_ICON;

  private readonly modalService = inject(ModalService);

  public createChat() {
    this.modalService.open(CreateChat);
  }
}
