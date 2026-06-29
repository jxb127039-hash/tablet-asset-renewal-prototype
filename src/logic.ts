import type { CartItem, PurchasedAsset, UpgradePlan } from "./types";

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
  assets: PurchasedAsset[],
  tradeInBonus = 200,
): UpgradePlan {
  const tablet = cart.find((item) => item.selected && item.category === "tablet");
  if (!tablet) throw new Error("购物车中没有已选中的平板");
  if (!assets.length) throw new Error("至少选择一件旧资产");
  const cartTotal = cart
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  const accessoryTotal = Math.max(0, cartTotal - tablet.price * tablet.quantity);
  const assetValueToday = assets.reduce((sum, asset) => sum + asset.estimateMax, 0);
  const assetValue90 = assets.reduce((sum, asset) => sum + asset.forecast90, 0);
  const currentOffset = Math.min(cartTotal, assetValueToday + tradeInBonus);
  const delayLoss90 = Math.max(0, assetValueToday - assetValue90);
  const netTabletToday = Math.max(0, tablet.price - currentOffset);
  return {
    assetIds: assets.map((asset) => asset.id),
    selectedAssetCount: assets.length,
    cartItemId: tablet.id,
    tabletPrice: tablet.price,
    accessoryTotal,
    cartTotal,
    assetValueToday,
    assetValue90,
    tradeInBonus,
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
