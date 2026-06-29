import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/#/cart");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test("completes diagnosis, applies trade-in, and checks out", async ({ page }) => {
  await expect(page.getByText("尚未应用旧机抵扣")).toBeVisible();
  await page.getByRole("button", { name: "选择资产并测算" }).click();
  await expect(page.getByRole("heading", { name: "我的已购资产" })).toBeVisible();
  await page.getByRole("button", { name: "全选" }).click();
  await expect(page.getByText(/已选 4 件/)).toBeVisible();
  await page.getByRole("button", { name: "下一步" }).click();
  await expect(page.getByRole("heading", { name: "确认3C资产状态" })).toBeVisible();
  await page.getByRole("button", { name: "生成4件资产组合换新决策" }).click();
  await expect(page.getByText("今天换，预计比90天后少付 ¥550")).toBeVisible();
  await page.getByRole("button", { name: "锁定今日估值并抵扣" }).click();
  await expect(page.getByText("已优惠 ¥3,800")).toBeVisible();
  await expect(page.getByText("¥698")).toBeVisible();
  await page.getByRole("button", { name: /去结算/ }).click();
  await expect(page.getByText("模拟换新订单已创建")).toBeVisible();
});

test("opens purchased assets from the lightweight entry", async ({ page }) => {
  await page.getByRole("button", { name: /我的3C已购资产/ }).click();
  await expect(page.getByRole("heading", { name: "我的已购资产" })).toBeVisible();
  await expect(page.getByText("iQOO Pad2 Pro")).toBeVisible();
});

test("persists a reminder across reload", async ({ page }) => {
  await page.evaluate(() => localStorage.setItem("tablet-renewal-selected-assets-v1", JSON.stringify(["iqoo-pad2-pro"])));
  await page.goto("/#/plan");
  await page.getByRole("button", { name: /价格合适时提醒我/ }).click();
  await page.reload();
  await expect.poll(async () => page.evaluate(() => localStorage.getItem("tablet-renewal-reminder-v1"))).toBe("2026-07-29");
});
