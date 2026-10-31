import { SIGNING_TOKEN } from "@/shared";
import { type Provider } from "@angular/core";
import { HmacSigning } from "@sorokchat-messenger/cryptography-client";

export const SIGNING_PROVIDER: Provider = {
    provide: SIGNING_TOKEN,
    useClass: HmacSigning
}