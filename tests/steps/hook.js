require('dotenv').config();

const {
    setWorldConstructor,
    World,
    Before,
    After
  } = require("@cucumber/cucumber");
  const { chromium } = require('playwright')
  
  class CustomWorld extends World {
    async setTestStatus(status, remark) {
      //do something
    }
  }
  
  Before(async (scenario) => {
    const caps = {
      browser: 'chrome',
      browser_version: 'latest',
      os: 'osx',
      os_version: 'catalina',
      name: 'My first playwright test',
      build: 'playwright cucumber js',
      'browserstack.username': process.env.BROWSERSTACK_USERNAME || 'YOUR BROWSERSTACK USER NAME',
      'browserstack.accessKey': process.env.BROWSERSTACK_ACCESSKEY || 'YOUR BROWSERSTACK ACCESS KEY',
      //'client.playwrightVersion':'1.17.2'
    }
    // Create page and browser globals to be used in the scenarios
    const wsEndpoint = `wss://cdp.browserstack.com/playwright?caps=` + `${encodeURIComponent(JSON.stringify(caps))}`;
    global.vBrowser = await chromium.connect(wsEndpoint);
    const context = await global.vBrowser.newContext();
    global.page = await context.newPage();
  })
  
  After(async () => {
    await vBrowser.close()
  })
  
  setWorldConstructor(CustomWorld);