import { provideHttpClient } from "@angular/common/http";
import { type EnvironmentProviders } from "@angular/core";

export const HTTP_PROVIDER: EnvironmentProviders = provideHttpClient();