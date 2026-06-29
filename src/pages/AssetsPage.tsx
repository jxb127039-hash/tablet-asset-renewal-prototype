import { RightOutlined, SafetyCertificateOutlined, TabletOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Shell } from "../components/Shell";
import { purchasedAssets } from "../data";
import { formatMoney } from "../logic";

export function AssetsPage() {
  const navigate = useNavigate();
  return (
    <Shell title="我的已购资产" back>
      <section className="asset-summary">
        <span>3件平板资产</span>
        <strong>预计可回收 ¥3,240–¥3,940</strong>
        <small>根据历史订单自动建档，价格为概念演示</small>
      </section>
      <section className="asset-list">
        {purchasedAssets.map((asset, index) => (
          <button
            key={asset.id}
            className={index === 0 ? "asset-list-item recommended" : "asset-list-item"}
            onClick={() => index === 0 && navigate("/diagnosis")}
          >
            <div className="asset-thumb">
              {asset.image ? <img src={asset.image} alt={asset.model} /> : <TabletOutlined aria-hidden="true" />}
            </div>
            <div className="asset-list-copy">
              <strong>{asset.model}</strong>
              <span>{asset.storage} · {asset.purchasedAt.slice(0, 4)}年购入</span>
              <small>{index === 0 ? <><SafetyCertificateOutlined /> 与购物车新机最匹配</> : "可单独估值"}</small>
            </div>
            <div className="asset-list-value">
              <strong>¥{formatMoney(asset.estimateMin)}–{formatMoney(asset.estimateMax)}</strong>
              <RightOutlined />
            </div>
          </button>
        ))}
      </section>
    </Shell>
  );
}
