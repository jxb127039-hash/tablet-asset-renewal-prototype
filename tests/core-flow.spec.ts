import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/#/cart");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test("completes diagnosis, applies trade-in, and checks out", async ({ page }) => {
  await expect(page.getByText("尚未应用旧机抵扣")).toBeVisible();
  await page.getByRole("button", { name: "测算并抵扣" }).click();
  await expect(page.getByRole("heading", { name: "确认旧机状态" })).toBeVisible();
  await page.getByRole("button", { name: "生成换新决策" }).click();
  await expect(page.getByText("今天换，预计比90天后少付 ¥180")).toBeVisible();
  await page.getByRole("button", { name: "锁定今日估值并抵扣" }).click();
  await expect(page.getByText("已优惠 ¥1,580")).toBeVisible();
  await expect(page.getByText("¥2,918")).toBeVisible();
  await page.getByRole("button", { name: /去结算/ }).click();
  await expect(page.getByText("模拟换新订单已创建")).toBeVisible();
});

test("opens purchased assets from the lightweight entry", async ({ page }) => {
  await page.getByRole("button", { name: /我的3C已购资产/ }).click();
  await expect(page.getByRole("heading", { name: "我的已购资产" })).toBeVisible();
  await expect(page.getByText("iQOO Pad2 Pro")).toBeVisible();
});

test("persists a reminder across reload", async ({ page }) => {
  await page.goto("/#/plan");
  await page.getByRole("button", { name: /价格合适时提醒我/ }).click();
  await page.reload();
  await expect.poll(async () => page.evaluate(() => localStorage.getItem("tablet-renewal-reminder-v1"))).toBe("2026-07-29");
});
