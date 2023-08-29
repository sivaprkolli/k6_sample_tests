import http from 'k6/http';
import { check } from "k6";

export default function () {
  const payload = JSON.stringify({
    name: 'lorem',
    surname: 'ipsum',
  });

  const headers = { 'Content-Type': 'application/json' };
  const response = http.post('https://httpbin.test.k6.io/post', payload, { headers });

  console.log(response.body);
  console.log("Data parameters :: " + response.json().data)
  console.log("User Agent Name :: " + response.json().headers['User-Agent'])

  check(response, {"response code was 200": (res) => response.status == 200});
} 
