const { test, expect } = require("@playwright/test");

test.describe('Swag items list', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/inventory.html')
    await page.locator('.inventory_list').waitFor()
  })

  test('should validate that all products are present', async({page}) => {
    const locator = page.locator('.inventory_item')
    await expect(locator).toHaveCount(6)
  });

  test('should be able to sort the items', async ({page}) => {
      const firstItem = page.locator('.inventory_item').first()
      await expect(firstItem).toContainText('Sauce Labs Backpack')
      await page.selectOption('.product_sort_container', 'hilo')
      await expect(firstItem).toContainText('Sauce Labs Fleece Jacket')
  });

  test('should validate that the details of a product can be opened', async ({page}) => {
      const product = 'Sauce Labs Backpack';
      await page.click(`.inventory_item >> text=${product}`)
      await page.locator(".inventory_details").first().waitFor();
      const desc = page.locator('.inventory_details_desc_container')
      await expect(desc).toContainText(product)
  });

  test('should validate that a product can be added to the cart', async ({page}) => {
      const badge = page.locator('.shopping_cart_badge')
      await expect(badge).not.toBeVisible()
      const firstItem = page.locator('.inventory_item').first()
      await firstItem.locator('.btn_primary.btn_inventory').click()
      await expect(badge).toHaveText('1')
  });

  test('should validate that a product can be removed from the cart', async ({page}) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    const badge = page.locator('.shopping_cart_badge')
    await expect(badge).toHaveText('1')
    await page.click('data-test=remove-sauce-labs-backpack')
    await expect(badge).not.toBeVisible()
  });

  test('should be able to open the cart summary page', async ({page}) => {
      await page.click('.shopping_cart_link')

      const locator = page.locator('#cart_contents_container')
      await expect(locator).toBeVisible()
  });
});