import { STORAGE_TOKEN, type IStorage } from "@/shared";
import { inject, Service, Signal } from "@angular/core";

@Service()
export class AccessTokenStorage {
    private static readonly KEY: string = "access-token";

    private readonly storage: IStorage = inject(STORAGE_TOKEN);

    public async setToken(accessToken: string): Promise<void> {
        return await this.storage.set(AccessTokenStorage.KEY, accessToken);
    }

    public getToken(): Signal<string | undefined | null> {
        return this.storage.get(AccessTokenStorage.KEY);
    }

    public async deleteToken(): Promise<void> {
        return await this.storage.delete(AccessTokenStorage.KEY);
    }
}