import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { type EnvironmentProviders } from "@angular/core";
import { credentialsInterceptor } from "../interceptors";
import { accessTokenInterceptor } from "@/entities";

export const HTTP_PROVIDER: EnvironmentProviders = provideHttpClient(
    withInterceptors([credentialsInterceptor, accessTokenInterceptor])
);