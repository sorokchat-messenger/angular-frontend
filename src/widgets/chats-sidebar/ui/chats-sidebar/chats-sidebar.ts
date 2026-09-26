import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatsSidebarHeader } from '../chats-sidebar-header';
import { SearchChats } from '@/features';

@Component({
  selector: 'app-chats-sidebar',
  imports: [ChatsSidebarHeader, SearchChats],
  templateUrl: './chats-sidebar.html',
  styleUrl: './chats-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ChatsSidebar { }
