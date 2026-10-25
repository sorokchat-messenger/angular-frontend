import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { ChatsSidebarHeader } from '../chats-sidebar-header';
import { SearchChats } from '@/features';
import { ChatsList, injectMyChats } from '@/entities';

@Component({
  selector: 'app-chats-sidebar',
  imports: [ChatsSidebarHeader, SearchChats, ChatsList],
  templateUrl: './chats-sidebar.html',
  styleUrl: './chats-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ChatsSidebar {
  private readonly myChats = injectMyChats({ limit: 10, offset: 0 });

  protected readonly chats = computed(() => this.myChats.data() || []);
}
