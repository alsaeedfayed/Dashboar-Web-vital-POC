// src/app/web-vitals-reporter.ts
import { onCLS, onLCP, onINP, Metric } from 'web-vitals';

export default function runWebVitals() {
  function sendToServer(metric: Metric) {
    console.log('📈 Sending metric:', metric);

    const body = JSON.stringify(metric);

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/__web_vitals', body);
    } else {
      fetch('/__web_vitals', {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  onCLS(sendToServer);
  onLCP(sendToServer);
  onINP(sendToServer);
}
