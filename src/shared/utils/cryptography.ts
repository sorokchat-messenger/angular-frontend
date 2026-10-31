import { InjectionToken } from "@angular/core";
import { type IKeyGenerator, type IEncryption, type ISigning } from '@sorokchat-messenger/cryptography-abstractions';

export const ENCRYPTION_TOKEN = new InjectionToken<IEncryption<unknown>>("ENCRYPTION_TOKEN");

export const KEY_GENERATION_TOKEN = new InjectionToken<IKeyGenerator>("KEY_GENERATION");

export const KEY_BYTES_COUNT_TOKEN = new InjectionToken<number>("KEY_BYTES_COUNT");

export const SIGNING_TOKEN = new InjectionToken<ISigning>("SIGNING");