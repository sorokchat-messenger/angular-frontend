import { type Provider } from "@angular/core";
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';

export const TANSTACK_PROVIDER: Provider = provideTanStackQuery(new QueryClient());