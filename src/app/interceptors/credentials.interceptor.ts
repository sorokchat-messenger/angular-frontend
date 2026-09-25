import {
    type HttpEvent,
    type HttpHandlerFn,
    type HttpInterceptorFn,
    type HttpRequest
} from "@angular/common/http";
import { type Observable } from "rxjs";
export const credentialsInterceptor: HttpInterceptorFn = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    return next(request.clone({ withCredentials: true }));
}