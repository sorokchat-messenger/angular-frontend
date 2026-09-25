import { type HttpRequest } from "@angular/common/http";

export function withJwt(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
}