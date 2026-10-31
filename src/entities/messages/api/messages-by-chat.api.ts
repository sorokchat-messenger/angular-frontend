import { ENCRYPTION_TOKEN, SIGNING_TOKEN } from "@/shared";
import { MessagesService } from "./messages.api";
import { MasterKeyService } from "@/entities/master-key";
import { type ISigning } from "@sorokchat-messenger/cryptography-abstractions";
import { computed, inject, resource, Signal } from "@angular/core";
import { MessagePayload } from "../model";

export type Message = Omit<MessagePayload, 'signing'> & {
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
            if (!messages || messages.length === 0) return [];

            const key = await keyService.ensureMasterKeyExists();
            if (!key) return [];

            const filtered = messages.filter((message) => message.chatId === chatId);

            return Promise.all(
                filtered.map(async (message) => {
                    let decryptedText = '[Помилка розшифрування]';
                    let isSigned = false;
                    if (message.signing && decryptedText !== '[Помилка розшифрування]') {
                        try {
                            isSigned = await signing.verify(message.text, message.signing, key);
                        } catch (signingError) {
                            console.error(`Помилка перевірки підпису:`, signingError);
                        }
                    }
                    try {
                        decryptedText = await encryption.decrypt(message.text, key, { iv: message.iv });
                    } catch (decryptError) {
                        console.error(`Помилка розшифрування повідомлення:`, decryptError);
                    }
                    return {
                        ...message,
                        text: decryptedText,
                        isSigned,
                    };
                })
            );
        },
    });

    return computed(() => decryptedMessagesResource.value() ?? []);
}