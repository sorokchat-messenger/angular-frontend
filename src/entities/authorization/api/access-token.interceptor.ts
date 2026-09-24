import { type HttpEvent, type HttpHandlerFn, type HttpInterceptorFn, type HttpRequest } from "@angular/common/http";
import { filter, mergeMap, take, type Observable } from "rxjs";
import { AccessTokenStorage } from "../storage";
import { inject } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { withJwt } from "@/shared";

export const accessTokenInterceptor: HttpInterceptorFn = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const accessTokenStorage: AccessTokenStorage = inject(AccessTokenStorage);
    return toObservable(accessTokenStorage.getToken()).pipe(
        filter(token => token !== undefined),
        take(1),
        mergeMap(token => {
            if (token === null) return next(request);
            else return next(withJwt(request, token));
        })
    )
}