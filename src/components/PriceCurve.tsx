import { formatMoney } from "../logic";
import type { PurchasedAsset } from "../types";

export function PriceCurve({ asset }: { asset: PurchasedAsset }) {
  const data = [
    { label: "今天", value: asset.estimateMax },
    { label: "30天", value: asset.forecast30 },
    { label: "60天", value: asset.forecast60 },
    { label: "90天", value: asset.forecast90 },
  ];
  const loss = asset.estimateMax - asset.forecast90;
  const values = data.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(1, max - min);
  const points = data.map((point, index) => ({
    ...point,
    x: 18 + index * 94,
    y: 16 + ((max - point.value) / range) * 48,
  }));
  const path = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <div className="asset-curve" role="img" aria-label={`${asset.model}未来90天预计残值曲线，预计少值${loss}元`}>
      <div className="curve-heading">
        <span>预计残值变化</span>
        <strong>90天预计少 ¥{formatMoney(loss)}</strong>
      </div>
      <div className="curve-chart">
        <svg viewBox="0 0 318 88" preserveAspectRatio="none" aria-hidden="true">
          <line x1="18" y1="16" x2="300" y2="16" className="curve-grid" />
          <line x1="18" y1="40" x2="300" y2="40" className="curve-grid" />
          <line x1="18" y1="64" x2="300" y2="64" className="curve-grid" />
          <polyline points={path} className="curve-line" />
          {points.map((point) => (
            <g key={point.label}>
              <circle cx={point.x} cy={point.y} r="3" className="curve-dot">
                <title>{point.label}预计 ¥{formatMoney(point.value)}</title>
              </circle>
              <text x={point.x} y="83" textAnchor="middle">{point.label}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className="curve-values">
        <span>今日 ¥{formatMoney(asset.estimateMax)}</span>
        <strong>90天预计 ¥{formatMoney(asset.forecast90)}</strong>
      </div>
      <p>预测用于换新时机参考，不计入今天优惠。</p>
    </div>
  );
}
