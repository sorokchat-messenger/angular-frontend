import { Component, inject, input } from '@angular/core';
import { injectMessagesByChat } from '../../api';
import { injectProfile } from '@/entities/authorization';
import { type MessagePayload } from '../../model';
import { ISigning } from '@sorokchat-messenger/cryptography-abstractions';
import { SIGNING_TOKEN } from '@/shared';
import { MasterKeyService } from '@/entities/master-key';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  imports: [AsyncPipe],
  templateUrl: './messages-list.html',
  styleUrl: './messages-list.scss',
})
export class MessagesList {
  private readonly profile = injectProfile();

  public readonly chatId = input.required<string>();
  private readonly signing: ISigning = inject(SIGNING_TOKEN);
  private readonly keyService: MasterKeyService = inject(MasterKeyService);

  protected readonly messages = injectMessagesByChat(this.chatId);

  public isMy(message: MessagePayload): boolean {
    const user = this.profile.data();
    if (!user) return false;
    return user.id as unknown as string === message.authorId;
  }

  protected async isSigned(message: MessagePayload): Promise<boolean> {
    const key = await this.keyService.ensureMasterKeyExists();
    return await this.signing.verify(message.text, message.signing, key);
  }
}
