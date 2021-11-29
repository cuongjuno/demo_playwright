const { test, expect } = require("@playwright/test");

test.describe("Checkout - Personal info", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/checkout-step-one.html");
  });

  test("should validate we get an error if we don not provide all personal information", async ({
    page,
  }) => {
    await page.fill('[data-test="firstName"]', "Sauce");
    await page.fill('[data-test="lastName"]', "Bot");
    await page.click('[data-test="continue"]');

    const locator = page.locator('data-test=error')
    await expect(locator).toHaveText('Error: Postal Code is required')
  });
  
  test("should validate that we can cancel the first checkout", async ({
    page,
  }) => {
    await page.click('data-test=cancel')
    const locator = page.locator('#cart_contents_container')
    await expect(locator).toBeVisible()
  })

  test("should be able to continue the checkout", async ({
    page,
  }) => {
    await page.fill('[data-test="firstName"]', "Sauce");
    await page.fill('[data-test="lastName"]', "Bot");
    await page.fill('[data-test="postalCode"]', '10000');
    await page.click('[data-test="continue"]');

    const locator = page.locator('#checkout_summary_container')
    await expect(locator).toBeVisible()
  })
});
