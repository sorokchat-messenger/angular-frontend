import { type EnvironmentProviders, type Provider } from '@angular/core';
import { BROWSER_GLOBAL_ERROR_LISTENER_PROVIDER } from './browser-global-error-listener.provider';
import { ROUTER_PROVIDER } from './router.provider';
import { SERVICE_WORKER_PROVIDER } from './service.worker.provider';
import { HTTP_PROVIDER } from './http.provider';
import { CACHE_PROVIDER } from './cache.provider';
import { PERSISTENCE_STORAGE_PROVIDER } from './persistence.provider';
import { STORAGE_PROVIDER } from './storage.provider';
import { TANSTACK_PROVIDER } from './tanstack.provider';

export const PROVIDERS: (Provider | EnvironmentProviders)[] = [
  BROWSER_GLOBAL_ERROR_LISTENER_PROVIDER,
  ROUTER_PROVIDER,
  SERVICE_WORKER_PROVIDER,
  HTTP_PROVIDER,
  CACHE_PROVIDER,
  PERSISTENCE_STORAGE_PROVIDER,
  STORAGE_PROVIDER,
  TANSTACK_PROVIDER
];
