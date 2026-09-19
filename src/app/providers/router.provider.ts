import { type EnvironmentProviders } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APPLICATION_ROUTES } from '../routes';

export const ROUTER_PROVIDER: EnvironmentProviders =
  provideRouter(APPLICATION_ROUTES);
