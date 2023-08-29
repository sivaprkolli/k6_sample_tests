import http from 'k6/http';
import { sleep } from 'k6';

describe("Scenario", () => {
    it("Test case", ()=> {
  http.get('https://test.k6.io');
  sleep(1);
    })
})