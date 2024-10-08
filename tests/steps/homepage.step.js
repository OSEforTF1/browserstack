const { Given, When, Then, Before, BeforeAll, After, setDefaultTimeout } = require("@cucumber/cucumber");

const { chromium, expect, test, Page, Browser, BrowserContext } = require("@playwright/test");

//const { Page } = require("playwright");
const userName = "olivierservant_Oe12yV";
const accessKey = "s3DmZgQN3YkKYqPJE8TU"

setDefaultTimeout(60 * 1000);

let browser = Browser;
let context = BrowserContext;
let page = Page;

BeforeAll(async function () {

    const cp = require('child_process');
      const clientPlaywrightVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];    
      const caps = {
              browser: "chrome",
              browserVersion: "latest",
              os: "Windows",
              osVersion: "11",
              debug : true,
              networkLogs : true,
              'browserstack.username': userName,
              'browserstack.accessKey': accessKey,
              'client.playwrightVersion': clientPlaywrightVersion
          }
        const wsEndpoint = `wss://cdp.browserstack.com/playwright?caps=` + `${encodeURIComponent(JSON.stringify(caps))}`;
        browser = await chromium.connect(wsEndpoint);

});
Before(async function() {
    context = await browser.newContext()
    page = await context.newPage()
  });

Given("User navigates to the Browserstack Homepage", async ({ page }) => {

    await page.goto("https://www.browserstack.com/");

});

When('User clicks on Product Menu', async function ({ page }) {

    await page.locator('button[aria-label="Products"]').waitFor();

    await page.locator('button[aria-label="Products"]').click();

});

Then('It should show Web Testing Product', async function () {

    await page.locator('div[aria-label="Products"] button[title="Web Testing"]').waitFor();

    expect(await page.locator('div[aria-label="Products"] button[title="Web Testing"] span').isVisible()).toBeTruthy()

});

Given('User Navigates to Browserstack Homepage', async function () {

    await page.goto("https://www.browserstack.com/");

});

When('User clicks on Pricing Menu', async function () {

    await page.locator('a[title="Pricing"]').click();

});

Then('It should Display correct Product lists in left Nav', async function () {

    var leftNavProducts = await page.locator('div[id="sidenav__list"]').textContent()

    var productArray = await leftNavProducts.split("\n").map((item) => { return item.trim(); });

    expect(productArray).toEqual(expect.arrayContaining(['Live', 'App Live']));

});

After(async function () {

    await browser.close();

})