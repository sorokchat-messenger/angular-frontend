import { injectIsAuthenticated, injectProfile } from "@/entities";
import { Path, type Protection } from "@/shared";
import { inject } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { type CanActivateFn, type UrlTree, Router } from "@angular/router";
import { ROLE_HIERARCHY } from "@sorokchat-messenger/contracts";
import { combineLatest, filter, map, Observable, take } from "rxjs";

export function universalGuard(protection: Protection): CanActivateFn {
    return (): Observable<true | UrlTree> => {
        const isAuthenticatedSignal = injectIsAuthenticated();
        const profile = injectProfile();
        const router: Router = inject(Router);
        return combineLatest([toObservable(isAuthenticatedSignal), toObservable(profile.data), toObservable(profile.status)])
            .pipe(
                filter(([isAuthenticated]) => {
                    if (isAuthenticated === undefined) return false;
                    return true;
                }),
                take(1),
                map(([isAuthenticated, user]) => {
                    switch (protection.type) {
                        case "public": {
                            return true;
                        }
                        case "anonymous": {
                            return isAuthenticated ? router.createUrlTree(["/"]) : true;
                        }
                        case "private": {
                            return isAuthenticated ? true : router.createUrlTree([Path.LOGIN_PAGE.fullPath]);
                        }
                        case "protected": {
                            if (!user || !isAuthenticated) {
                                return router.createUrlTree([Path.LOGIN_PAGE.fullPath]);
                            }
                            const hasRoles: boolean = protection.neededRoles.some(needRole => ROLE_HIERARCHY.hasRole(needRole, user.role));
                            return hasRoles ? true : router.createUrlTree(["/"]);
                        }
                    }
                })
            )
    }
}