import { computed, inject, resource, type Signal } from "@angular/core";
import { MessagesService } from "./messages.api";
import { type MessagePayload } from "../model";
import { ENCRYPTION_TOKEN } from "@/shared";
import { MasterKeyService } from "@/entities/master-key";

export function injectMessagesByChat(id: () => string): Signal<MessagePayload[]> {
    const service: MessagesService = inject(MessagesService);
    const encryption = inject(ENCRYPTION_TOKEN);
    const keyService: MasterKeyService = inject(MasterKeyService);
    const decryptedMessagesResource = resource({
        params: () => ({
            chatId: id(),
            messages: service.messages(),
        }),
        loader: async ({ params }) => {
            const { chatId, messages } = params;
            const key = await keyService.ensureMasterKeyExists();
            if (!messages || !key) return [];
            const filterred = messages.filter(message => message.chatId === chatId);
            return Promise.all(filterred.map(async message => ({
                ...message,
                text: await encryption.decrypt(message.text, key, { iv: message.iv })
            })));
        }
    });
    return computed(() => decryptedMessagesResource.value() ?? []);
}