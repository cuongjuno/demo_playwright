const { test, expect } = require("@playwright/test");
const { USERS } = require("./config");
const { login } = require("./login");

test.use({ storageState: undefined });

test.describe("LoginPage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should be able to test loading of login page", async ({ page }) => {
    expect(await page.screenshot()).toMatchSnapshot('login.png');
    const locator = page.locator("#login_button_container");
    expect(await locator.screenshot()).toMatchSnapshot('login-form.png');
  });

  test("should be able to login with a standard user", async ({ page }) => {
    await login(page, USERS.STANDARD);

    const locator = page.locator(".inventory_list");
    await expect(locator).toBeVisible();
  });

  test("should not be able to login with a locked user", async ({ page }) => {
    await login(page, USERS.LOCKED);

    const locator = page.locator("data-test=error");
    await expect(locator).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });
});
