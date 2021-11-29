// global-setup.js
const { chromium } = require('@playwright/test');
const { login } = require('./tests/login')
const { USERS } = require('./tests/config')

module.exports = async config => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://saucedemo.com');
  await login(page, USERS.STANDARD);
  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
};