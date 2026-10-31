import { type IStorage, KEY_BYTES_COUNT_TOKEN, KEY_GENERATION_TOKEN, STORAGE_TOKEN } from "@/shared";
import { effect, inject, Injectable, type Signal } from "@angular/core";
import { type IKeyGenerator } from "@sorokchat-messenger/cryptography-abstractions";

@Injectable({ providedIn: 'root' })
export class MasterKeyService {
    private static readonly KEY: string = "master-key";

    private readonly storage: IStorage = inject(STORAGE_TOKEN);
    private readonly keyGenerator: IKeyGenerator = inject(KEY_GENERATION_TOKEN);
    private readonly keyBytesCount: number = inject(KEY_BYTES_COUNT_TOKEN);

    private readonly masterKey: Signal<string | null | undefined> = this.storage.get<string>(MasterKeyService.KEY);

    private resolveKey!: (key: string) => void;
    private readonly keyPromise: Promise<string> = new Promise((resolve) => {
        this.resolveKey = resolve;
    });

    private isResolved = false;

    public constructor() {
        effect(() => {
            if (this.isResolved) return;
            const currentKey = this.masterKey();
            if (currentKey === undefined) return;
            this.isResolved = true;
            if (currentKey) {
                this.resolveKey(currentKey);
                return;
            }
            this.generateAndSaveKey();
        });
    }

    private async generateAndSaveKey(): Promise<void> {
        try {
            const newKey = await this.keyGenerator.generate(this.keyBytesCount * 2);
            await this.storage.set<string>(MasterKeyService.KEY, newKey);
            this.resolveKey(newKey);
        } catch (error) {
            console.error("Помилка генерації MasterKey:", error);
        }
    }

    public ensureMasterKeyExists(): Promise<string> {
        return this.keyPromise;
    }
}