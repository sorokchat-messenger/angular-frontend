import { injectIsAuthenticated, injectProfile } from "@/entities";
import { Path, type Protection } from "@/shared";
import { inject } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { type CanActivateFn, type UrlTree, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AuthorizationCodes, ROLE_HIERARCHY } from "@sorokchat-messenger/contracts";
import { toast } from "ngx-sonner";
import { combineLatest, filter, map, Observable, take } from "rxjs";

export function universalGuard(protection: Protection): CanActivateFn {
    return (): Observable<true | UrlTree> => {
        const isAuthenticatedSignal = injectIsAuthenticated();
        const profile = injectProfile();
        const router: Router = inject(Router);
        const translation: TranslateService = inject(TranslateService);
        return combineLatest([toObservable(isAuthenticatedSignal), toObservable(profile.data), toObservable(profile.status)])
            .pipe(
                filter(([isAuthenticated]) => isAuthenticated !== undefined),
                take(1),
                map(([isAuthenticated, user]) => {
                    switch (protection.type) {
                        case "public": {
                            return true;
                        }
                        case "anonymous": {
                            if (!isAuthenticated) return true;
                            toast.error(translation.instant(AuthorizationCodes.ACCESS_DENIED));
                            return router.createUrlTree(["/"]);
                        }
                        case "private": {
                            if (isAuthenticated) return true;
                            toast.error(translation.instant(AuthorizationCodes.UNAUTHORIZED));
                            return router.createUrlTree([Path.LOGIN_PAGE.fullPath]);
                        }
                        case "protected": {
                            if (!user || !isAuthenticated) {
                                toast.error(translation.instant(AuthorizationCodes.UNAUTHORIZED));
                                return router.createUrlTree([Path.LOGIN_PAGE.fullPath]);
                            }
                            const hasRoles: boolean = protection.neededRoles.some(needRole => ROLE_HIERARCHY.hasRole(needRole, user.role));
                            if (hasRoles) return true;
                            toast.error(translation.instant(AuthorizationCodes.ACCESS_DENIED));
                            return router.createUrlTree(["/"]);
                        }
                    }
                })
            )
    }
}