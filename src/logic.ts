import type { CartItem, PurchasedAsset, ResaleQuote, UpgradePlan } from "./types";

export function formatMoney(value: number) {
  return new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 0 }).format(value);
}

export function rankEligibleAssets(assets: PurchasedAsset[], target: CartItem) {
  return assets
    .filter((asset) => asset.status === "active" && asset.category === "tablet")
    .map((asset) => ({
      asset,
      score:
        (asset.category === target.category ? 100 : 0) +
        (asset.ecosystem === target.ecosystem ? 40 : 0) +
        Math.min(30, monthsSince(asset.purchasedAt)) +
        Math.round((asset.estimateMax - asset.forecast90) / 10),
    }))
    .sort((a, b) => b.score - a.score)
    .map(({ asset }) => asset);
}

export function shouldShowContextRecommendation(cart: CartItem[], assets: PurchasedAsset[]) {
  const tablet = cart.find((item) => item.selected && item.category === "tablet");
  return Boolean(tablet && rankEligibleAssets(assets, tablet).length);
}

export function calculateUpgradePlan(
  cart: CartItem[],
  asset: PurchasedAsset,
  quote: ResaleQuote,
): UpgradePlan {
  const tablet = cart.find((item) => item.selected && item.category === "tablet");
  if (!tablet) throw new Error("购物车中没有已选中的平板");
  const cartTotal = cart
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  const accessoryTotal = Math.max(0, cartTotal - tablet.price * tablet.quantity);
  const currentOffset = Math.min(cartTotal, quote.estimateMax + quote.tradeInBonus);
  const delayLoss90 = Math.max(0, quote.estimateMax - quote.forecast90);
  const netTabletToday = Math.max(0, tablet.price - currentOffset);
  return {
    assetId: asset.id,
    cartItemId: tablet.id,
    tabletPrice: tablet.price,
    accessoryTotal,
    cartTotal,
    currentOffset,
    netTabletToday,
    cartPayableToday: Math.max(0, cartTotal - currentOffset),
    netTablet90: Math.max(0, netTabletToday + delayLoss90),
    delayLoss90,
  };
}

function monthsSince(date: string) {
  const start = new Date(date);
  const now = new Date("2026-06-29T00:00:00+08:00");
  return Math.max(0, (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth());
}
