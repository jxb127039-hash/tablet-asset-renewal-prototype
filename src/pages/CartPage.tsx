import { DeleteOutlined, DownloadOutlined, RightOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RenewalRecommendation } from "../components/RenewalRecommendation";
import { ProductRow } from "../components/ProductRow";
import { SelectMark, Shell } from "../components/Shell";
import { cartItems, purchasedAssets, TRADE_IN_BONUS } from "../data";
import { exportEvents, recordEvent } from "../events";
import { calculateUpgradePlan, formatMoney, rankEligibleAssets, shouldShowContextRecommendation } from "../logic";
import { getSelectedAssetIds, isTradeInApplied, setTradeInApplied } from "../store";

export function CartPage() {
  const navigate = useNavigate();
  const [applied, setApplied] = useState(isTradeInApplied());
  const [items, setItems] = useState(() => cartItems.map((item) => ({ ...item })));
  const selectedAssetIds = getSelectedAssetIds();
  const selectedAssets = purchasedAssets.filter((asset) => selectedAssetIds.includes(asset.id));
  const suggestedAsset = rankEligibleAssets(purchasedAssets, cartItems[0])[0];
  const displayAssets = selectedAssets.length ? selectedAssets : [suggestedAsset];
  const hasSelectedTablet = items.some((item) => item.selected && item.category === "tablet");
  const plan = useMemo(
    () => calculateUpgradePlan(hasSelectedTablet ? items : cartItems, displayAssets, TRADE_IN_BONUS),
    [hasSelectedTablet, items, displayAssets],
  );
  const showRecommendation = shouldShowContextRecommendation(items, purchasedAssets);

  useEffect(() => {
    recordEvent("cart_asset_entry_impression");
    if (showRecommendation) recordEvent("context_recommendation_impression", { assetId: selectedAssetIds.join(","), cartItemId: cartItems[0].id });
  }, [showRecommendation]);

  const checkout = () => {
    recordEvent(applied ? "tradein_checkout_completed" : "regular_checkout_started", {
      assetId: applied ? selectedAssetIds.join(",") : undefined,
      cartItemId: items[0].id,
    });
    navigate(applied ? "/success" : "/success?mode=regular");
  };

  const selectedTotal = items.filter((item) => item.selected).reduce((sum, item) => sum + item.price * item.quantity, 0);
  const payable = applied && hasSelectedTablet ? Math.max(0, selectedTotal - plan.currentOffset) : selectedTotal;

  return (
    <Shell
      title="购物车"
      action={<button className="text-header-button" onClick={exportEvents}><DownloadOutlined /> 评审数据</button>}
      bottom={
        <div className="checkout-bar">
          <div className="checkout-select">
            <SelectMark
              selected={items.every((item) => item.selected)}
              label="全选商品"
              onClick={() => {
                const next = !items.every((item) => item.selected);
                setItems((current) => current.map((item) => ({ ...item, selected: next })));
              }}
            />
            <span>全选</span>
          </div>
          <div className="checkout-total">
            <span>应付</span>
            <strong>¥{formatMoney(payable)}</strong>
            <small>{applied ? `已优惠 ¥${formatMoney(plan.currentOffset)}` : "尚未应用旧机抵扣"}</small>
          </div>
          <button className="checkout-button" onClick={checkout}>去结算（{items.filter((item) => item.selected).length}）</button>
        </div>
      }
    >
      <button
        className="asset-entry"
        onClick={() => {
          recordEvent("asset_entry_clicked");
          navigate("/assets");
        }}
      >
        <span className="asset-entry-icon"><ShoppingCartOutlined /></span>
        <span><strong>我的3C已购资产</strong><small>{selectedAssets.length ? `已选${selectedAssets.length}件 · 预计抵扣¥${formatMoney(plan.currentOffset)}` : `${purchasedAssets.length}件可选 · 支持跨品类组合抵扣`}</small></span>
        <RightOutlined />
      </button>

      <section className="cart-group" aria-label="购物车商品">
        {items.map((item) => (
          <ProductRow
            key={item.id}
            item={item}
            onToggle={() => setItems((current) => current.map((row) => row.id === item.id ? { ...row, selected: !row.selected } : row))}
            onQuantityChange={(quantity) => setItems((current) => current.map((row) => row.id === item.id ? { ...row, quantity } : row))}
          />
        ))}
      </section>

      {showRecommendation ? (
        <RenewalRecommendation
          applied={applied}
          plan={plan}
          selectedAssets={displayAssets}
          hasSelection={Boolean(selectedAssets.length)}
          onRemove={() => {
            setTradeInApplied(false);
            setApplied(false);
          }}
        />
      ) : null}

      <p className="prototype-note"><DeleteOutlined /> 本原型不读取真实订单，不产生实际回收或支付。</p>
    </Shell>
  );
}
