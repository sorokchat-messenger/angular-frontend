import { AuthorizationService, injectProfile } from "@/entities";
import { inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { type ErrorPayload, type RegisterPayload } from "@sorokchat-messenger/contracts";
import { injectMutation } from "@tanstack/angular-query-experimental";
import { toast } from "ngx-sonner";

export const REGISTER_KEY: string[] = ["LOGIN"];

export function injectRegister() {
    const service: AuthorizationService = inject(AuthorizationService);
    const profile = injectProfile();
    const translation: TranslateService = inject(TranslateService);
    return injectMutation<void, { error: ErrorPayload }, RegisterPayload, unknown>(() => ({
        mutationKey: REGISTER_KEY,
        mutationFn: (payload: RegisterPayload) => service.register(payload),
        onSuccess() {
            profile.refetch();
        },
        onError(error) {
            toast.error(translation.instant(error.error.message));
        }
    }));
}