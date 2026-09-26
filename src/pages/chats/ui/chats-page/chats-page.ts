import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatsSidebar } from '@/widgets';
import { ChatsPlaceholer } from '@/entities';



@Component({
  selector: 'app-chats-page',
  imports: [ChatsSidebar, ChatsPlaceholer],
  templateUrl: './chats-page.html',
  styleUrl: './chats-page.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ChatsPage {

}
