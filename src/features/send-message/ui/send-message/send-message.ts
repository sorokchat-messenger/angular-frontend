import { Form, withZod, Input, type IconType, SEND_ICON, IconButton, ENCRYPTION_TOKEN, KEY_BYTES_COUNT_TOKEN, KEY_GENERATION_TOKEN, SIGNING_TOKEN } from '@/shared';
import { Component, inject, input, signal } from '@angular/core';
import { type SendMessagePayload, SendMessageSchema } from '../../model';
import { form } from '@angular/forms/signals';
import { injectProfile, MasterKeyService, MessagesService } from '@/entities';
import { ISigning, type IKeyGenerator } from '@sorokchat-messenger/cryptography-abstractions';

@Component({
  selector: 'app-send-message',
  imports: [Form, Input, IconButton],
  templateUrl: './send-message.html',
  styleUrl: './send-message.scss',
})
export class SendMessage {
  private readonly initialState: SendMessagePayload = { text: "" };
  private readonly model = signal<SendMessagePayload>(this.initialState);
  private readonly service: MessagesService = inject(MessagesService);
  private readonly profile = injectProfile();
  private readonly masterKeyService: MasterKeyService = inject(MasterKeyService);
  private readonly encryption = inject(ENCRYPTION_TOKEN);
  private readonly generation: IKeyGenerator = inject(KEY_GENERATION_TOKEN);
  private readonly signing: ISigning = inject(SIGNING_TOKEN);
  private readonly bytesCount: number = inject(KEY_BYTES_COUNT_TOKEN);

  public readonly chatId = input.required<string>();

  protected readonly form = form(this.model, withZod(SendMessageSchema));
  protected readonly icon: IconType = SEND_ICON;

  public async send(payload: SendMessagePayload): Promise<void> {
    const authorId = this.profile.data()!.id as unknown as string;
    const chatId = this.chatId();
    const iv = await this.generation.generate(this.bytesCount);
    const key = await this.masterKeyService.ensureMasterKeyExists();
    const text = await this.encryption.encrypt(payload.text, key, { iv });
    const signing = await this.signing.sign(payload.text, key);
    this.service.send({ ...payload, authorId, chatId, text, iv, signing });
    this.model.set(this.initialState);
  }
}
