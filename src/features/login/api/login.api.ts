import { AuthorizationService, injectProfile } from "@/entities";
import { inject } from "@angular/core";
import { type ErrorPayload, type LoginPayload } from "@sorokchat-messenger/contracts";
import { injectMutation } from "@tanstack/angular-query-experimental";
import { toast } from "ngx-sonner";
import { TranslateService } from "@ngx-translate/core";

export const LOGIN_KEY: string[] = ["LOGIN"];

export function injectLogin() {
    const service: AuthorizationService = inject(AuthorizationService);
    const profile = injectProfile();
    const translation: TranslateService = inject(TranslateService);
    return injectMutation<void, { error: ErrorPayload }, LoginPayload, unknown>(() => ({
        mutationKey: LOGIN_KEY,
        mutationFn: (payload: LoginPayload) => service.login(payload),
        onSuccess() {
            profile.refetch();
        },
        onError(error) {
            toast.error(translation.instant(error.error.message));
        }
    }));
}