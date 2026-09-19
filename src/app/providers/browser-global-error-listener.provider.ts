import {
  type EnvironmentProviders,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';

export const BROWSER_GLOBAL_ERROR_LISTENER_PROVIDER: EnvironmentProviders =
  provideBrowserGlobalErrorListeners();
