import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-chats-page',
  imports: [],
  templateUrl: './chats-page.html',
  styleUrl: './chats-page.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ChatsPage {}
