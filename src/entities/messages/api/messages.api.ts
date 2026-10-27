import { computed, inject, Service, Signal } from "@angular/core";
import { type MessagePayload } from "../model";
import { type IStorage, STORAGE_TOKEN } from "@/shared";

@Service()
export class MessagesService {
    private readonly storage: IStorage = inject(STORAGE_TOKEN);

    private static readonly STORAGE_KEY: string = "storage-chat-messages";

    public readonly messages = this.storage.get<MessagePayload[]>(MessagesService.STORAGE_KEY);

    public send(payload: MessagePayload): void {
        const currentMessages = this.messages();
        let updatedMessages: MessagePayload[] = [];
        if (!!currentMessages) updatedMessages = [...currentMessages];
        updatedMessages.push(payload);
        this.storage.set(MessagesService.STORAGE_KEY, updatedMessages);
    }
}