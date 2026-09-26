import { AuthorizationService, PROFILE_KEY } from "@/entities";
import { Path } from "@/shared";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { injectMutation, QueryClient } from "@tanstack/angular-query-experimental";

export const LOGOUT_KEY: string[] = ["logout"];

export function injectLogout() {
    const service: AuthorizationService = inject(AuthorizationService);
    const client: QueryClient = inject(QueryClient);
    const router: Router = inject(Router);
    return injectMutation(() => ({
        mutationKey: LOGOUT_KEY,
        mutationFn: () => service.logout(),
        async onSuccess() {
            client.resetQueries({ queryKey: [PROFILE_KEY] })
            router.navigateByUrl(Path.LOGIN_PAGE.fullPath);
        }
    }));
}