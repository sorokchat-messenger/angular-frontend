import { accessTokenInterceptor, refreshTokensInterceptor } from "@/entities";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { type EnvironmentProviders } from "@angular/core";

export const HTTP_PROVIDER: EnvironmentProviders = provideHttpClient(
    withInterceptors([accessTokenInterceptor, refreshTokensInterceptor])
);