import { chromium } from "@playwright/test";

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
await page.goto("http://127.0.0.1:4173/#/cart");
await page.evaluate(() => localStorage.clear());
await page.reload();
await page.screenshot({ path: "qa/cart-390x844.png", fullPage: false });
await page.screenshot({ path: "qa/cart-full-playwright.png", fullPage: true });
await page.evaluate(() => window.scrollTo(0, 560));
await page.screenshot({ path: "qa/cart-recommendation-390x844.png", fullPage: false });
await browser.close();
