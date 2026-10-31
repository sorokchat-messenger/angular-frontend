import { KEY_GENERATION_TOKEN } from "@/shared";
import { type Provider } from "@angular/core";
import { BytesGenerator } from "@sorokchat-messenger/cryptography-client";

export const KEY_GENERATION_PROVIDER: Provider = {
    provide: KEY_GENERATION_TOKEN,
    useClass: BytesGenerator
};