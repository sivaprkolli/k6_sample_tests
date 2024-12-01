import { chromium } from 'k6/experimental/browser';
import { sleep } from 'k6';

export default async function () {
  // const res_browser = `${K6_BROWSER_ENABLED}`;
  // res_browser = true;

  const browser = chromium.launch({ headless: true });
  const page = browser.newPage();

  // 01. Go to the homepage
  try {
    await page.goto('https://www.saucedemo.com/');

    page.waitForSelector('#user-name');
    const usernameInputBox = page.locator('#user-name');
    await usernameInputBox.type("standard_user");
   // page.screenshot({ path: 'screenshots/01_homepage.png' });
    sleep(1);
    const passwordInputBox = page.locator('#password');
    await passwordInputBox.type("secret_sauce");

    sleep(1);
    const loginButton = page.locator("[name='login-button']");
    await loginButton.click();
        sleep('1');
    page.screenshot({ path: 'screenshots/02_view-product.png' });
    sleep(1);
    page.waitForSelector('.shopping_cart_link');
  } finally {
    page.close();
    browser.close();
  }
}
