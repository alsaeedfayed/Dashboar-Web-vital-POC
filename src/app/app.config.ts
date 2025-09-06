import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
  withIncrementalHydration,
} from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    /**
     *incremental hydration => reduces initial JS work and helps LCP/INP; zoneless is available as a preview to reduce ZoneJS overhead.
     */
    provideClientHydration(withIncrementalHydration()),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
  ],
};
