import { computed, inject, Service, Signal } from "@angular/core";
import { type MessagePayload } from "../model";
import { type IStorage, STORAGE_TOKEN } from "@/shared";

@Service()
export class MessagesService {
    private readonly storage: IStorage = inject(STORAGE_TOKEN);

    private static readonly STORAGE_KEY: string = "storage/chat-messages";

    public send(payload: MessagePayload): void {
        const key = this.getKey(payload.chatId);
        const currentMessages = this.storage.get<MessagePayload[]>(key)();
        if (!currentMessages) {
            this.storage.set(key, [payload]);
        } else {
            this.storage.set(key, [...currentMessages, payload]);
        }
    }

    public getByChat(id: string): Signal<MessagePayload[] | null | undefined> {
        return computed<MessagePayload[] | null | undefined>(() => this.storage.get<MessagePayload[]>(this.getKey(id))());
    }

    private getKey(id: string): string {
        return `${MessagesService.STORAGE_KEY}/${id}`;
    }
}