import { inject } from "@angular/core";
import { ChatsService } from "./chats.api";
import { injectQuery } from "@tanstack/angular-query-experimental";

export const MY_CHATS_KEY: string[] = ["CHATS"];

type Payload = { limit: number, offset: number };

export function injectMyChats({ limit, offset }: Payload) {
    const service: ChatsService = inject(ChatsService);
    return injectQuery(() => ({
        queryKey: MY_CHATS_KEY,
        queryFn: async () => await service.getMyChats(limit, offset)
    }));
}