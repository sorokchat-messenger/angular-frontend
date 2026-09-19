import { bootstrapApplication } from '@angular/platform-browser';
import { APPLICATION_CONFIG } from '../config';
import { App } from './app';

bootstrapApplication(App, APPLICATION_CONFIG).catch((err) =>
  console.error(err),
);
