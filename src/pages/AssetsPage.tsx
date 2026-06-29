import { SafetyCertificateOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PriceCurve } from "../components/PriceCurve";
import { SelectMark, Shell } from "../components/Shell";
import { purchasedAssets, TRADE_IN_BONUS } from "../data";
import { recordEvent } from "../events";
import { formatMoney } from "../logic";
import { getSelectedAssetIds, setSelectedAssetIds, setTradeInApplied } from "../store";

export function AssetsPage() {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState(getSelectedAssetIds);
  const selectedAssets = useMemo(
    () => purchasedAssets.filter((asset) => selectedIds.includes(asset.id)),
    [selectedIds],
  );
  const selectedValue = selectedAssets.reduce((sum, asset) => sum + asset.estimateMax, 0);
  const selectedOffset = selectedValue + (selectedAssets.length ? TRADE_IN_BONUS : 0);
  const estimateMin = purchasedAssets.reduce((sum, asset) => sum + asset.estimateMin, 0);
  const estimateMax = purchasedAssets.reduce((sum, asset) => sum + asset.estimateMax, 0);
  const categoryLabel = { tablet: "平板", phone: "手机", earbuds: "耳机" } as const;

  const updateSelection = (ids: string[]) => {
    setSelectedIds(ids);
    setSelectedAssetIds(ids);
    setTradeInApplied(false);
    recordEvent("asset_selection_changed", { assetId: ids.join(",") });
  };

  const toggle = (id: string) => {
    updateSelection(selectedIds.includes(id) ? selectedIds.filter((item) => item !== id) : [...selectedIds, id]);
  };

  return (
    <Shell
      title="我的已购资产"
      back
      action={
        <button
          className="text-header-button"
          onClick={() => updateSelection(selectedIds.length === purchasedAssets.length ? [] : purchasedAssets.map((asset) => asset.id))}
        >
          {selectedIds.length === purchasedAssets.length ? "清空" : "全选"}
        </button>
      }
      bottom={
        <div className="asset-selection-bar">
          <div><span>已选 {selectedAssets.length} 件{selectedAssets.length ? ` · 含补贴¥${TRADE_IN_BONUS}` : ""}</span><strong>合计预计抵扣 ¥{formatMoney(selectedOffset)}</strong></div>
          <button
            className="checkout-button"
            disabled={!selectedAssets.length}
            onClick={() => navigate("/diagnosis")}
          >
            下一步
          </button>
        </div>
      }
    >
      <section className="asset-summary">
        <span>{purchasedAssets.length}件3C资产</span>
        <strong>预计可回收 ¥{formatMoney(estimateMin)}–¥{formatMoney(estimateMax)}</strong>
        <small>可多选组合抵扣；一单仅计算一次换新补贴</small>
      </section>

      <section className="multi-select-tip">
        <SafetyCertificateOutlined />
        <span><strong>选择越多，净换新成本越低</strong>最终回收金额仍以逐台验机结果为准。</span>
      </section>

      <section className="asset-card-list" aria-label="可选择的3C资产">
        {purchasedAssets.map((asset, index) => {
          const selected = selectedIds.includes(asset.id);
          return (
            <article key={asset.id} className={selected ? "asset-card selected" : "asset-card"}>
              <div className="asset-card-main">
                <SelectMark selected={selected} onClick={() => toggle(asset.id)} label={`${selected ? "取消选择" : "选择"}${asset.model}`} />
                <img src={asset.image} alt={asset.model} />
                <div className="asset-card-copy">
                  <strong>{asset.model}</strong>
                  <span>{categoryLabel[asset.category]}｜{asset.color}｜{asset.storage}</span>
                  <small>{asset.purchasedAt.slice(0, 4)}年购入 · {index === 0 ? "同品类优先推荐" : "支持跨品类组合抵扣"}</small>
                </div>
                <div className="asset-card-value">
                  <span>今日预计</span>
                  <strong>¥{formatMoney(asset.estimateMin)}–{formatMoney(asset.estimateMax)}</strong>
                </div>
              </div>
              <PriceCurve asset={asset} />
            </article>
          );
        })}
      </section>
    </Shell>
  );
}
