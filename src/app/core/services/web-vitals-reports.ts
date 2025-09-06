import { Metric, onCLS, onINP, onLCP } from 'web-vitals';

/**
 *
 * @param metric
 * This collects Core Web Vitals from real users and posts them to /__web_vitals. Use the web-vitals library + the web.dev measuring guide for best practices.
 */
function sendToServer(metric: Metric): void {
  // simple RUM endpoint: use sendBeacon if available (non-blocking)
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

//start measuring
onCLS(sendToServer);
onLCP(sendToServer);
onINP(sendToServer);
