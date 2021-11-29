const { test, expect } = require("@playwright/test");

test.describe("Menu", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/inventory.html");
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.goto("/cart.html");
    await page.locator(".cart_contents_container").waitFor();
    await page.click(".bm-burger-button");
    await page.locator('.bm-menu').waitFor()
  });

  test("should be able to the swag items overview page", async ({ page }) => {
    await page.click("#inventory_sidebar_link");
    const locator = page.locator(".inventory_list");
    await expect(locator).toBeVisible();
  });

  test("should be able to log out", async ({ page }) => {
    await page.click("#logout_sidebar_link");
    const locator = page.locator("#login_button_container");
    await expect(locator).toBeVisible();
  });

  test("should be able to clear the cart", async ({ page }) => {
    const badge = page.locator(".shopping_cart_badge");
    await expect(badge).toHaveText("1");
    await page.click("#reset_sidebar_link");
    await expect(badge).not.toBeVisible();
  });
});
