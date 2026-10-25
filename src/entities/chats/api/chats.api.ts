import { BACKEND_API_PATH } from "@/shared";
import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { ChatPayload, CHATS_CONTROLLER, type NewChatPayload } from "@sorokchat-messenger/contracts";
import { lastValueFrom } from "rxjs";

export type CreatedChat = { id: string };

@Service()
export class ChatsService {
    private static readonly BASE_URL: string = `${BACKEND_API_PATH}/${CHATS_CONTROLLER.NAME}`;
    private static readonly CREATE_URL: string = `${ChatsService.BASE_URL}/${CHATS_CONTROLLER.CREATE.PATH()}`;
    private static readonly ME_URL: string = ChatsService.BASE_URL;

    private readonly client: HttpClient = inject(HttpClient);

    public async create(payload: NewChatPayload): Promise<CreatedChat> {
        return await lastValueFrom(this.client.post<CreatedChat>(ChatsService.CREATE_URL, payload));
    }

    public async getMyChats(limit: number, offset: number): Promise<ChatPayload[]> {
        return await lastValueFrom(this.client.get<ChatPayload[]>(ChatsService.ME_URL, {
            params: {
                limit,
                offset
            }
        }));
    }
}