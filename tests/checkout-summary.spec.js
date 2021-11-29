const { test, expect } = require("@playwright/test");

// #checkout_summary_container

test.describe('Checkout - Summary', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html')
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.goto('/checkout-step-two.html')
    const locator = page.locator('#checkout_summary_container')
    await locator.waitFor()
  })

  test('should validate that we can continue shopping', async ({ page }) => {
    await page.click('[data-test="finish"]');
    const locator = page.locator('#checkout_complete_container')
    await expect(locator).toBeVisible()
  })

  test('should validate that we can cancel checkout and go to the inventory page', async ({ page }) => {
    await page.click('[data-test="cancel"]');
    const locator = page.locator('.inventory_list')
    await expect(locator).toBeVisible()
  })
  
  test('should validate that we have 1 product in our checkout overview', async ({ page }) => {
    const locator = page.locator('.shopping_cart_badge')
    await expect(locator).toHaveText('1')
  })
});