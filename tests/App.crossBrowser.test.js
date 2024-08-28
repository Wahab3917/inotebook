const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const edge = require('selenium-webdriver/edge');

async function runTest(browserName) {
  let driver;

  switch (browserName) {
    case 'chrome':
      driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
      break;
    case 'firefox':
      driver = await new Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options()).build();
      break;
    case 'edge':
      driver = await new Builder().forBrowser('MicrosoftEdge').setEdgeOptions(new edge.Options()).build();
      break;
    default:
      throw new Error('Unsupported browser!');
  }

  try {
    await driver.get('http://localhost:3000');
    const loginButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Login')]")), 10000);
    await driver.wait(until.elementIsVisible(loginButton), 10000);
    console.log(`${browserName} test passed`);
  } catch (error) {
    console.error(`${browserName} test failed`, error);
  } finally {
    await driver.quit();
  }
}

(async function() {
  try {
    await runTest('chrome');
    await runTest('firefox');
    await runTest('edge');
  } catch (error) {
    console.error('Internal Server Error', error);
  }
})();