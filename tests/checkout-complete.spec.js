const { test, expect } = require("@playwright/test");

test.describe('Checkout - Complete', () => {
  test('should be able to test loading of login page', async ({ page }) => {
    await page.goto('/checkout-complete.html')
    const locator = page.locator('#checkout_complete_container')
    await expect(locator).toBeVisible()
  })
})