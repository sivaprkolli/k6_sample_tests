import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { check } from "k6";

  
export const options = {
    thresholds: {
        http_req_duration: ["p(95)<150"],
      },
  vus: 100,
  duration: '10s',
};

export default function () {
  http.get('http://test.k6.io');
  sleep(1);

  const response = http.get('https://reqres.in/api/users?page=2');
  check(response, {"response code was 200": (res) => response.status == 200});
 // check(response, {"response code was 200": (res) => response.status == 200});
}

export function handleSummary(data) {
    return {
      "sample_test_result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}
