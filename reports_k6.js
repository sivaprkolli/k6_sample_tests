import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';

function handleSummary(data) {
  return {
    "result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

 function test() {
    const payload = JSON.stringify({
      name: 'lorem',
      surname: 'ipsum',
    });
  
    const headers = { 'Content-Type': 'application/json' };
    const response = http.post('https://httpbin.test.k6.io/post', payload, { headers });
  
    console.log(response.body);
    console.log("Data parameters :: " + response.json().data)
    console.log("User Agent Name :: " + response.json().headers['User-Agent'])
  
   // check(response, {"response code was 200": (res) => response.status == 200});
    handleSummary("API Report");
  } 

  export default function() {
    test();
  }
  

