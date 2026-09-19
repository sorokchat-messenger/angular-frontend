import { type EnvironmentProviders, type Provider } from '@angular/core';
import { BROWSER_GLOBAL_ERROR_LISTENER_PROVIDER } from './browser-global-error-listener.provider';
import { ROUTER_PROVIDER } from './router.provider';
import { SERVICE_WORKER_PROVIDER } from './service.worker.provider';

export const PROVIDERS: (Provider | EnvironmentProviders)[] = [
  BROWSER_GLOBAL_ERROR_LISTENER_PROVIDER,
  ROUTER_PROVIDER,
  SERVICE_WORKER_PROVIDER,
];
