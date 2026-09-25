import { isDevMode, type Provider } from "@angular/core";
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { withDevtools } from '@tanstack/angular-query-experimental/devtools';

export const TANSTACK_PROVIDER: Provider = provideTanStackQuery(new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            retryOnMount: false,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5
        },
        mutations: {
            retry: false,
        }
    }
}), withDevtools(() => ({ loadDevtools: isDevMode() })));