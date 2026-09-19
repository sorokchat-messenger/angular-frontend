import { isDevMode, type EnvironmentProviders } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';

export const SERVICE_WORKER_PROVIDER: EnvironmentProviders =
  provideServiceWorker('ngsw-worker.js', {
    enabled: !isDevMode(),
    registrationStrategy: 'registerWhenStable:30000',
  });
