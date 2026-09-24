import { AuthorizationService, injectProfile } from "@/entities";
import { inject } from "@angular/core";
import { type RegisterPayload } from "@sorokchat-messenger/contracts";
import { injectMutation } from "@tanstack/angular-query-experimental";

export const REGISTER_KEY: string[] = ["LOGIN"];

export function injectRegister() {
    const service: AuthorizationService = inject(AuthorizationService);
    const profile = injectProfile();
    return injectMutation(() => ({
        mutationKey: REGISTER_KEY,
        mutationFn: (payload: RegisterPayload) => service.register(payload),
        onSuccess() {
            profile.refetch();
        }
    }));
}