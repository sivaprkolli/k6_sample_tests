import http from 'k6/http';
import { check } from "k6";


export const options = {
  stages: [
    { duration: '10s', target: 10 }, // simulate ramp-up of traffic from 1 to 100 users over 1 minute.
    { duration: '15s', target: 20 }, // stay at 200 users for 1 minute
    { duration: '5s', target: 0 }, // ramp-down to 0 users
  ],
 thresholds: {
    http_req_duration: ['p(90)<2500'], // 90% of requests must complete below 2.5s
  },
};

export default function () {

  const payload = JSON.stringify({
    name: 'lorem',
    surname: 'ipsum',
  });

  const headers = { 'Content-Type': 'application/json'};
  const response = http.post('https://httpbin.test.k6.io/post', payload, { headers });

  console.log(response.body);
  console.log("Data parameters :: " + response.json().data)
  console.log("User Agent Name :: " + response.json().headers['User-Agent'])

  check(response, {"response code was 200": (res) => response.status == 200});
} 
