import { computed, inject, type Signal } from "@angular/core";
import { MessagesService } from "./messages.api";
import { type MessagePayload } from "../model";

export function injectMessagesByChat(id: () => string): Signal<MessagePayload[]> {
    const service: MessagesService = inject(MessagesService);
    return computed(() => {
        const messages = service.messages();
        if (!messages) return [];
        return messages.filter(message => message.chatId === id());
    });
}