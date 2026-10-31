import { type IStorage, KEY_BYTES_COUNT_TOKEN, KEY_GENERATION_TOKEN, STORAGE_TOKEN } from "@/shared";
import { inject, Service, type Signal } from "@angular/core";
import { type IKeyGenerator } from "@sorokchat-messenger/cryptography-abstractions";

@Service()
export class MasterKeyService {
    private static readonly KEY: string = "master-key";

    private readonly storage: IStorage = inject(STORAGE_TOKEN);
    private readonly keyGenerator: IKeyGenerator = inject(KEY_GENERATION_TOKEN);
    private readonly keyBytesCount: number = inject(KEY_BYTES_COUNT_TOKEN);

    private readonly masterKey: Signal<string | undefined | null> = this.storage.get<string>(MasterKeyService.KEY);
    private initPromise: Promise<string> | null = null;

    public constructor() {
        this.ensureMasterKeyExists();
    }

    public async ensureMasterKeyExists(): Promise<string> {
        const currentKey = this.masterKey();
        if (currentKey) {
            return currentKey;
        }
        if (!this.initPromise) {
            this.initPromise = (async () => {
                const newKey = await this.keyGenerator.generate(this.keyBytesCount);
                await this.storage.set<string>(MasterKeyService.KEY, newKey);
                return newKey;
            })();
        }
        return this.initPromise;
    }
}