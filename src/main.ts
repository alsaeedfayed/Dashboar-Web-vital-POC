import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
// 👇 Run only in browser (not during SSR)
if (typeof window !== 'undefined') {
  import('./app/core/services/web-vitals-reports').then(
    ({ default: runWebVitals }) => {
      runWebVitals();
    }
  );
}
