import { computed, inject, resource, type Signal } from "@angular/core";
import { MessagesService } from "./messages.api";
import { type MessagePayload } from "../model";
import { ENCRYPTION_TOKEN, SIGNING_TOKEN } from "@/shared";
import { MasterKeyService } from "@/entities/master-key";
import { ISigning } from "@sorokchat-messenger/cryptography-abstractions";

export type Message = Omit<MessagePayload, "signing"> & {
    isSigned: boolean;
}

export function injectMessagesByChat(id: () => string): Signal<Message[]> {
    const service: MessagesService = inject(MessagesService);
    const encryption = inject(ENCRYPTION_TOKEN);
    const keyService: MasterKeyService = inject(MasterKeyService);
    const signing: ISigning = inject(SIGNING_TOKEN);
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
            return Promise.all(filterred.map(async message => {
                let text = '[Помилка розшифрування]';
                let isSigned = false;
                try {
                    text = await encryption.decrypt(message.text, key, { iv: message.iv });
                    if (message.signing) {
                        isSigned = await signing.verify(text, message.signing, key);
                    }
                } catch (error) {
                    console.error("Помилка криптографії: ", error);
                }
                return {
                    ...message,
                    text,
                    isSigned
                }
            }));
        }
    });
    return computed(() => decryptedMessagesResource.value() ?? []);
}