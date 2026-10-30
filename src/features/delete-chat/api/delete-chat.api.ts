import { ChatsService, MY_CHATS_KEY } from "@/entities";
import { inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ErrorPayload } from "@sorokchat-messenger/contracts";
import { injectMutation, QueryClient } from "@tanstack/angular-query-experimental";
import { toast } from "ngx-sonner";

export function injectDeleteChat(id: () => string) {
    const service: ChatsService = inject(ChatsService);
    const translation: TranslateService = inject(TranslateService);
    const client: QueryClient = inject(QueryClient);
    return injectMutation<void, ErrorPayload>(() => ({
        mutationKey: ["delete chat", id()],
        mutationFn: async () => await service.deleteChat(id()),
        onSuccess() {
            client.resetQueries({ queryKey: MY_CHATS_KEY });
        },
        onError(error) {
            console.log(error);

            toast.error(translation.instant(error.message));
        }
    }));
}