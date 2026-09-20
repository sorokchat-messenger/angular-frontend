import { computed, inject, Service, type Signal } from "@angular/core";
import { type IStorage } from "./storage.interface";
import { CACHE_STORAGE_TOKEN, PERSISTENCE_STORAGE_TOKEN } from "./storage.tokens";

@Service()
export class PwaStorage implements IStorage {
    private readonly cache: IStorage = inject(CACHE_STORAGE_TOKEN);
    private readonly persistence: IStorage = inject(PERSISTENCE_STORAGE_TOKEN);

    public async set<T>(key: string, data: T): Promise<void> {
        await this.persistence.set(key, data);
        await this.cache.set(key, data);
    }

    public get<T>(key: string): Signal<T | null | undefined> {
        const cachedSignal = this.cache.get<T>(key);
        return computed<T | null | undefined>(() => {
            const cachedValue = cachedSignal();
            if (cachedValue === undefined) {
                const persistenceSignal = this.persistence.get<T>(key);
                return persistenceSignal();
            }
            return cachedValue;
        });
    }

    public async delete(key: string): Promise<void> {
        await this.persistence.delete(key);
        await this.cache.delete(key);
    }

    public async clear(): Promise<void> {
        await this.persistence.clear();
        await this.cache.clear();
    }

}