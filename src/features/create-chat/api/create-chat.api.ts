import { ChatsService, type CreatedChat } from "@/entities";
import { inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { type ErrorPayload, type NewChatPayload } from "@sorokchat-messenger/contracts";
import { injectMutation } from "@tanstack/angular-query-experimental";
import { toast } from "ngx-sonner";

export const CREATE_CHAT_KEY: string[] = ["create_chat"]

export function injectCreateChatMutation() {
    const service: ChatsService = inject(ChatsService);
    const translation: TranslateService = inject(TranslateService);
    return injectMutation<CreatedChat, ErrorPayload, NewChatPayload, void>(() => ({
        mutationKey: CREATE_CHAT_KEY,
        mutationFn: async (payload: NewChatPayload) => await service.create(payload),
        onError(error) {
            toast.error(translation.instant(error.message));
        }
    }));
}