import { type Signal } from "@angular/core";

export interface IStorage {
    set<T>(key: string, data: T): Promise<void>;
    get<T>(key: string): Signal<T | null | undefined>;
    delete(key: string): Promise<void>
    clear(): Promise<void>;
}