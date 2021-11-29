// playwright.config.js
// @ts-check

const { devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  projects: [
    {
      name: 'Pixel 4',
      use: {
        browserName: 'chromium',
        ...devices['Pixel 4'],
      },
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  globalSetup: require.resolve('./global-setup'),
  use: {
    baseURL: 'https://www.saucedemo.com',
    // Tell all tests to load signed-in state from 'storageState.json'.
    storageState: 'storageState.json',
    video: 'retain-on-failure'
  }
};

module.exports = config;