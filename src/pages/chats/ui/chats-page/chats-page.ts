import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ChatsSidebar, ChatHead } from '@/widgets';
import { ChatsPlaceholer, injectMyChats } from '@/entities';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatPayload } from '@sorokchat-messenger/contracts';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, reduce } from 'rxjs';
import { Path } from '@/shared';

@Component({
  selector: 'app-chats-page',
  imports: [ChatsSidebar, ChatsPlaceholer, ChatHead],
  templateUrl: './chats-page.html',
  styleUrl: './chats-page.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ChatsPage {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly myChats = injectMyChats({ limit: 10, offset: 0 });

  private readonly chatId = toSignal(
    this.route.paramMap.pipe(map(params => params.get('id')))
  );

  protected readonly chat = computed<ChatPayload | null>(() => {
    const id = this.chatId();
    const chats = this.myChats.data();
    if (!id) return null;
    if (!chats) return this.readirect();
    const chat = chats.find(chat => chat.id === id) ?? null;
    if (!!id && !chat) return this.readirect();
    return chat;
  });

  private readirect(): null {
    this.router.navigateByUrl(Path.CHATS_PAGE.fullPath);
    return null;
  }
}
