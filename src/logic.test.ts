import { describe, expect, it } from "vitest";
import { cartItems, demoQuote, purchasedAssets } from "./data";
import { calculateUpgradePlan, rankEligibleAssets, shouldShowContextRecommendation } from "./logic";

describe("asset matching", () => {
  it("ranks the same-ecosystem iQOO tablet first", () => {
    expect(rankEligibleAssets(purchasedAssets, cartItems[0])[0].id).toBe("iqoo-pad2-pro");
  });

  it("shows a contextual recommendation only with a selected tablet and eligible asset", () => {
    expect(shouldShowContextRecommendation(cartItems, purchasedAssets)).toBe(true);
    expect(shouldShowContextRecommendation(cartItems.map((item) => ({ ...item, selected: false })), purchasedAssets)).toBe(false);
    expect(shouldShowContextRecommendation(cartItems, purchasedAssets.map((asset) => ({ ...asset, status: "sold" })))).toBe(false);
  });
});

describe("upgrade arithmetic", () => {
  it("keeps future depreciation out of today's discount", () => {
    const plan = calculateUpgradePlan(cartItems, purchasedAssets[0], demoQuote);
    expect(plan.cartTotal).toBe(4498);
    expect(plan.currentOffset).toBe(1580);
    expect(plan.netTabletToday).toBe(2319);
    expect(plan.cartPayableToday).toBe(2918);
    expect(plan.delayLoss90).toBe(180);
    expect(plan.netTablet90).toBe(2499);
  });

  it("never returns a negative payable amount", () => {
    const plan = calculateUpgradePlan(cartItems, purchasedAssets[0], {
      ...demoQuote,
      estimateMax: 99999,
      tradeInBonus: 99999,
    });
    expect(plan.netTabletToday).toBe(0);
    expect(plan.cartPayableToday).toBe(0);
  });

  it("rejects carts without a selected tablet", () => {
    expect(() => calculateUpgradePlan(cartItems.map((item) => ({ ...item, selected: false })), purchasedAssets[0], demoQuote)).toThrow();
  });
});
