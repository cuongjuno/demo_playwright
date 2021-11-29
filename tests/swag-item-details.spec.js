const { test, expect } = require("@playwright/test");
const { ITEMS } = require("./config");

test.describe("Swag Item Details", () => {
  test("should validate that we can go back from the details to the inventory page", async ({
    page,
  }) => {
    await page.goto("/inventory.html");
    await page.goto(`/inventory-item.html?id=${ITEMS.BACKPACK}`);

    await page.locator(".inventory_details").first().waitFor();
    const locator = page.locator(".inventory_details");
    await page.goBack();
    await expect(locator).not.toBeVisible();
  });

  test("should validate that a product can be added to a cart", async ({
    page,
  }) => {
    await page.goto("/inventory.html");
    await page.goto(`/inventory-item.html?id=${ITEMS.BACKPACK}`);

    await page.locator(".inventory_details").first().waitFor();
    const badge = page.locator(".shopping_cart_badge");
    await expect(badge).not.toBeVisible();
    await page.click(".btn_primary.btn_inventory");
    await expect(badge).toHaveText("1");
  });

  test("should validate that a product can be removed from the cart", async ({
    page,
  }) => {
    await page.goto("/inventory.html");
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.goto(`/inventory-item.html?id=${ITEMS.BACKPACK}`);

    await page.locator(".inventory_details").first().waitFor();

    const badge = page.locator(".shopping_cart_badge");
    await expect(badge).toHaveText("1");
    await page.click("data-test=remove-sauce-labs-backpack");
    await expect(badge).not.toBeVisible();
  });
});
