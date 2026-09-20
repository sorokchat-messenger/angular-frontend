import { type Provider } from "@angular/core";
import { CACHE_STORAGE_TOKEN, CacheStorage } from "@/shared";

export const CACHE_PROVIDER: Provider = {
    provide: CACHE_STORAGE_TOKEN,
    useClass: CacheStorage
}