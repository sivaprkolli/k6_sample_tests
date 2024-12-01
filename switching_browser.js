import { browser } from 'k6/browser';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';
import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('https://the-internet.herokuapp.com/windows');
    await page.waitForSelector('[href="/windows/new"]');
    await page.screenshot({ path: 'screenshot1.png' });

    // const pages=browser.context().pages();
    // const newPage = pages[pages.length-1];


    await page.click('[href="/windows/new"]'); 
    await sleep(randomIntBetween(3, 5));
    const pages = await browser.context().pages();
    const page2 = await pages[pages.length - 1];
    const newPage = await pages[pages.length-1];
  
    console.log("=========================");
    console.log('Current URL before switching: ', page.url())
    console.log(await page.title());
    await sleep(randomIntBetween(3, 6));
    await page2.waitForLoadState(); // Ensure the page has loaded

    //await page2.bringToFront();
    console.log('Current URL after switching: ', page2.url())
    console.log(await page2.title());
    console.log("=========================");


   // console.log('New tab title:', await newPage.title());


    await page2.waitForSelector('div>h3');
    await page2.screenshot({ path: 'new-tab1.png' });

    await page2.close();
    await sleep(randomIntBetween(2, 4));


    await page.bringToFront();
    console.log('Switched back to the main page');
    await page.screenshot({ path: 'screenshot2.png' });

  } finally {
    await page.close();
  }
}

// K6_BROWSER_HEADLESS=false k6 run browser_test.js
