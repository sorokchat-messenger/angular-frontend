import { inject, Injector, Service, type Signal } from "@angular/core";
import { type IStorage } from "./storage.interface";
import { type JSONSchema, StorageMap } from '@ngx-pwa/local-storage';
import { catchError, lastValueFrom, map, throwError } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

@Service()
export class PersistenceStorage implements IStorage {
    private readonly storage: StorageMap = inject(StorageMap);
    private readonly injector: Injector = inject(Injector);

    public async set<T>(key: string, data: T): Promise<void> {
        await lastValueFrom(this.storage.set(key, data));
    }

    public get<T>(key: string): Signal<T | null | undefined> {
        return toSignal(this.storage.get<T | undefined | null>(key, undefined as unknown as JSONSchema).pipe(
            catchError((error) => {
                return throwError(() => error);
            }),
            map((value => {
                return value === undefined ? null : value;
            }))
        ), { initialValue: undefined, injector: this.injector });
    }

    public async delete(key: string): Promise<void> {
        return await lastValueFrom(this.storage.delete(key));
    }

    public async clear(): Promise<void> {
        return await lastValueFrom(this.storage.clear());
    }
}