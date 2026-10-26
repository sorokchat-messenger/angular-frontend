import { CreateChatButton } from '@/features';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-chats-sidebar-header',
  templateUrl: './chats-sidebar-header.html',
  styleUrl: './chats-sidebar-header.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CreateChatButton]
})
export class ChatsSidebarHeader {

}
