import { inject, Service, type Signal } from "@angular/core";
import { type IStorage } from "./storage.interface";
import { StorageMap } from '@ngx-pwa/local-storage';
import { lastValueFrom } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

@Service()
export class PersistenceStorage implements IStorage {
    private readonly storage: StorageMap = inject(StorageMap);

    public async set<T>(key: string, data: T): Promise<void> {
        await lastValueFrom(this.storage.set(key, data));
    }

    public get<T>(key: string): Signal<T | null | undefined> {
        return toSignal(this.storage.get<T | undefined | null>(key, { type: 'string' }), { initialValue: undefined });
    }

    public async delete(key: string): Promise<void> {
        return await lastValueFrom(this.storage.delete(key));
    }

    public async clear(): Promise<void> {
        return await lastValueFrom(this.storage.clear());
    }
}