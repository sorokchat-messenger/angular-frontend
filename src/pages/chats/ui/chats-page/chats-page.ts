import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ChatsSidebar } from '@/widgets';
import { ChatsPlaceholer, injectMyChats } from '@/entities';
import { ActivatedRoute } from '@angular/router';
import { ChatPayload } from '@sorokchat-messenger/contracts';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';



@Component({
  selector: 'app-chats-page',
  imports: [ChatsSidebar, ChatsPlaceholer],
  templateUrl: './chats-page.html',
  styleUrl: './chats-page.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ChatsPage {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly myChats = injectMyChats({ limit: 10, offset: 0 });

  private readonly chatId = toSignal(
    this.route.paramMap.pipe(map(params => params.get('id')))
  );

  protected readonly chat = computed<ChatPayload | null>(() => {
    const id = this.chatId();
    const chats = this.myChats.data();

    if (!id || !chats) return null;
    return chats.find(chat => chat.id === id) ?? null;
  });
}
