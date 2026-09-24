import { AuthorizationService, injectProfile } from "@/entities";
import { inject } from "@angular/core";
import { type LoginPayload } from "@sorokchat-messenger/contracts";
import { injectMutation } from "@tanstack/angular-query-experimental";

export const LOGIN_KEY: string[] = ["LOGIN"];

export function injectLogin() {
    const service: AuthorizationService = inject(AuthorizationService);
    const profile = injectProfile();
    return injectMutation(() => ({
        mutationKey: LOGIN_KEY,
        mutationFn: (payload: LoginPayload) => service.login(payload),
        onSuccess() {
            profile.refetch();
        }
    }));
}