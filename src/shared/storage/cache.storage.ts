import { Service, signal, type Signal, type WritableSignal } from "@angular/core";
import { type IStorage } from "./storage.interface";

@Service()
export class CacheStorage implements IStorage {
    private readonly cache: Map<string, WritableSignal<unknown | null | undefined>>;

    public constructor() {
        this.cache = new Map<string, WritableSignal<unknown | null | undefined>>();
    }

    public async set<T>(key: string, data: T): Promise<void> {
        const cachedSignal = this.cache.get(key);
        if (cachedSignal) {
            cachedSignal.set(data);
        }
        else {
            this.cache.set(key, signal(data));
        }
    }

    public get<T>(key: string): Signal<T | null | undefined> {
        const cachedSignal = this.cache.get(key);
        if (cachedSignal) return cachedSignal.asReadonly() as Signal<T | null | undefined>;
        const newSignal = signal(null);
        this.cache.set(key, newSignal);
        return newSignal.asReadonly();
    }

    public async delete(key: string): Promise<void> {
        const cachedSignal = this.cache.get(key);
        if (cachedSignal) cachedSignal.set(null);
    }

    public async clear(): Promise<void> {
        this.cache.forEach(signal => signal.set(null));
    }
}