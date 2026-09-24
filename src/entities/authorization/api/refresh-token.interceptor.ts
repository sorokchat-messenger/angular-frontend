import { type HttpEvent, type HttpHandlerFn, type HttpInterceptorFn, type HttpRequest } from "@angular/common/http";
import { catchError, filter, from, mergeMap, take, throwError, type Observable } from "rxjs";
import { AuthorizationService } from "./authorization.api";
import { inject, Injector } from "@angular/core";
import { AccessTokenStorage } from "../storage";
import { ErrorSchema, HttpStatus } from "@sorokchat-messenger/contracts";
import { withJwt } from "@/shared";
import { toObservable } from "@angular/core/rxjs-interop";

export const refreshTokensInterceptor: HttpInterceptorFn = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const service: AuthorizationService = inject(AuthorizationService);
    const storage: AccessTokenStorage = inject(AccessTokenStorage);
    const injector: Injector = inject(Injector);
    const accessToken = storage.getToken();
    return next(request).pipe(
        catchError(error => {
            const result = ErrorSchema.safeParse(error.error);
            if (result.success && result.data.status === HttpStatus.UNAUTHORIZED) {
                return from(service.refreshTokens());
            }
            return throwError(() => error);
        }),
        mergeMap(() => toObservable(accessToken, { injector })),
        filter(token => token !== undefined),
        take(1),
        mergeMap(token => {
            if (token === null) return next(request);
            else return next(withJwt(request, token));
        })
    );
}