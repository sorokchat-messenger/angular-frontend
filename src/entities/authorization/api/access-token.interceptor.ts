import { type HttpEvent, type HttpHandlerFn, type HttpInterceptorFn, type HttpRequest } from "@angular/common/http";
import { catchError, defer, filter, finalize, from, mergeMap, shareReplay, take, throwError, type Observable } from "rxjs";
import { AccessTokenStorage } from "../storage";
import { inject } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { withJwt } from "@/shared";
import { ErrorSchema, HttpStatus } from "@sorokchat-messenger/contracts";
import { AuthorizationService } from "./authorization.api";

let refresh$: Observable<{ accessToken: string }> | null = null;

function refreshOnce(service: AuthorizationService) {
    refresh$ ??= defer(() => from(service.refreshTokens())).pipe(
        finalize(() => (refresh$ = null)),
        shareReplay({ bufferSize: 1, refCount: false }),
    );
    return refresh$;
}

export const accessTokenInterceptor: HttpInterceptorFn = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const storage: AccessTokenStorage = inject(AccessTokenStorage);
    const service: AuthorizationService = inject(AuthorizationService);
    return toObservable(storage.getToken()).pipe(
        filter(token => token !== undefined),
        take(1),
        mergeMap(token => {
            const authorizedRequest = token ? withJwt(request, token) : request;
            return next(authorizedRequest).pipe(
                catchError(error => {
                    if (!isUnauthorized(error)) return throwError(() => error);
                    return refreshOnce(service).pipe(
                        mergeMap(({ accessToken }) => next(withJwt(request, accessToken)))
                    );
                })
            );
        })
    );
}

function isUnauthorized(error: unknown): boolean {
    if (typeof error !== 'object' || error === null || !('error' in error)) return false;
    const parsed = ErrorSchema.safeParse((error as { error: unknown }).error);
    return parsed.success && parsed.data.status === HttpStatus.UNAUTHORIZED;
}