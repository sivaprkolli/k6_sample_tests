import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// export const options = {
//     stages: [
//       { duration: '1m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 1 minute.
//       { duration: '1m', target: 200 }, // stay at 200 users for 1 minute
//       { duration: '1m', target: 0 }, // ramp-down to 0 users
//     ],
//    thresholds: {
//       http_req_duration: ['p(90)<2500'], // 90% of requests must complete below 2.5s
//     },
//   };

export let errorRate = new Rate('errors');

export function handleSummary(data) {
    return {
      "result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }

export default function () {
  var url = 'https://test-api.k6.io/public/crocodiles/';
  check(http.get(url), {
    'status is 200': (r) => r.status == 200,
  }) || errorRate.add(1);
  handleSummary("Report API")

}