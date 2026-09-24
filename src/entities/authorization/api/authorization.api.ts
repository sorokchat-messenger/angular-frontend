import { BACKEND_API_PATH, type IStorage, STORAGE_TOKEN } from "@/shared";
import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { AUTHORIZATION_CONTROLLER, type UserPayload, type AuthorizedPayload, type LoginPayload, type RegisterPayload } from '@sorokchat-messenger/contracts';
import { lastValueFrom } from "rxjs";
import { AccessTokenStorage } from "../storage";

@Service()
export class AuthorizationService {
    private static readonly CONTROLLER_URL: string = `${BACKEND_API_PATH}/${AUTHORIZATION_CONTROLLER.NAME}`;
    private static readonly REGISTER_URL: string = `${AuthorizationService.CONTROLLER_URL}/${AUTHORIZATION_CONTROLLER.REGISTER}`;
    private static readonly LOGIN_URL: string = `${AuthorizationService.CONTROLLER_URL}/${AUTHORIZATION_CONTROLLER.LOGIN}`;
    private static readonly PROFILE_URL: string = `${AuthorizationService.CONTROLLER_URL}/${AUTHORIZATION_CONTROLLER.PROFILE}`;
    private static readonly LOGOUT_URL: string = `${AuthorizationService.CONTROLLER_URL}/${AUTHORIZATION_CONTROLLER.LOGOUT}`;
    private static readonly REFRESH_TOKENS_URL: string = `${AuthorizationService.CONTROLLER_URL}/${AUTHORIZATION_CONTROLLER.REFRESH_TOKENS}`;

    private readonly client: HttpClient = inject(HttpClient);
    private readonly storage: IStorage = inject(STORAGE_TOKEN);
    private readonly accessTokenStorage: AccessTokenStorage = inject(AccessTokenStorage);

    public async register(payload: RegisterPayload): Promise<void> {
        const { accessToken } = await lastValueFrom(this.client.post<AuthorizedPayload>(AuthorizationService.REGISTER_URL, payload));
        await this.authorize(accessToken);
    }

    public async login(payload: LoginPayload): Promise<void> {
        const { accessToken } = await lastValueFrom(this.client.post<AuthorizedPayload>(AuthorizationService.LOGIN_URL, payload));
        await this.authorize(accessToken);
    }

    public async profile(): Promise<UserPayload> {
        return await lastValueFrom(this.client.get<UserPayload>(AuthorizationService.PROFILE_URL));
    }

    public async refreshTokens(): Promise<void> {
        const { accessToken } = await lastValueFrom(this.client.put<AuthorizedPayload>(AuthorizationService.REFRESH_TOKENS_URL, null));
        await this.authorize(accessToken);
    }

    public async logout(): Promise<void> {
        await lastValueFrom(this.client.delete<void>(AuthorizationService.LOGOUT_URL));
        await this.deauthorize();
    }

    private async authorize(accessToken: string): Promise<void> {
        return await this.accessTokenStorage.setToken(accessToken);
    }

    private async deauthorize(): Promise<void> {
        await this.storage.clear();
    }
} 