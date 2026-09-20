import { PwaStorage, STORAGE_TOKEN } from "@/shared";
import { type Provider } from "@angular/core";

export const STORAGE_PROVIDER: Provider = {
    provide: STORAGE_TOKEN,
    useClass: PwaStorage
}