const { test, expect } = require("@playwright/test");

test.describe("Cart Summary page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/cart.html");
  });

  test("should validate that we can continue shopping", async ({ page }) => {
    const locator = page.locator("#cart_contents_container");
    await expect(locator).toBeVisible();
  });

  test("should validate that we can go from the cart to the checkout page", async ({
    page,
  }) => {
    await page.click("data-test=checkout");
    const locator = page.locator("#checkout_info_container");
    await expect(locator).toBeVisible();
  });

  test("should validate that a product can be removed from the cart", async ({
    page,
  }) => {
    await page.goto("https://www.saucedemo.com/inventory.html");

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

    // Click [data-test="remove-sauce-labs-backpack"]
    const badge = page.locator('.shopping_cart_badge')
    const list = page.locator('.cart_item')
    await expect(badge).toHaveText('1')
    await expect(list).toHaveCount(1)
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    await expect(badge).not.toBeVisible()
    await expect(list).toHaveCount(0)
  });
});
