const reporter = require('k6-html-reporter');

const options = {
        jsonFile: "/reports",
        output: "/reports",
        thresholds: {
            http_req_duration: ["p(95)<150"],
          },
      vus: 100,
      duration: '10s',
    };

    export default function () {      
        const response = http.get('https://reqres.in/api/users?page=2');
        check(response, {"response code was 200": (res) => response.status == 200});
      }

reporter.generateSummaryReport(options);