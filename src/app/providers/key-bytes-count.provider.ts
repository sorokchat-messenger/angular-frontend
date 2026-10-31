import { KEY_BYTES_COUNT_TOKEN } from "@/shared";
import { type Provider } from "@angular/core";

export const KEY_BYTES_COUNT_PROVIDER: Provider = {
    provide: KEY_BYTES_COUNT_TOKEN,
    useValue: 16
};