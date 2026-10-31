import { ENCRYPTION_TOKEN } from "@/shared";
import { type Provider } from "@angular/core";
import { AesEncryption } from '@sorokchat-messenger/cryptography-client';

export const ENCRYPTION_PROVIDER: Provider = {
    provide: ENCRYPTION_TOKEN,
    useClass: AesEncryption
}