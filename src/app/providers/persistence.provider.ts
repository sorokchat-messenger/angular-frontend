import { PERSISTENCE_STORAGE_TOKEN, PersistenceStorage } from "@/shared";
import { type Provider } from "@angular/core";

export const PERSISTENCE_STORAGE_PROVIDER: Provider = {
    provide: PERSISTENCE_STORAGE_TOKEN,
    useClass: PersistenceStorage
}