import { injectQuery } from "@tanstack/angular-query-experimental";
import { AuthorizationService } from "./authorization.api";
import { inject } from "@angular/core";

export const PROFILE_KEY: string = "profile";

export function injectProfile() {
    const service: AuthorizationService = inject(AuthorizationService);
    return injectQuery(() => ({
        queryKey: [PROFILE_KEY],
        queryFn: async () => await service.profile()
    }))
}