import { CheckOutlined, ClockCircleOutlined, RightOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "../logic";
import type { PurchasedAsset, UpgradePlan } from "../types";

export function RenewalRecommendation({
  applied,
  plan,
  selectedAssets,
  hasSelection,
  onRemove,
}: {
  applied: boolean;
  plan: UpgradePlan;
  selectedAssets: PurchasedAsset[];
  hasSelection: boolean;
  onRemove: () => void;
}) {
  const navigate = useNavigate();
  return (
    <section className={applied ? "renewal-panel applied" : "renewal-panel"} aria-labelledby="renewal-title">
      <div className="renewal-heading">
        <div>
          <span className="eyebrow">智能换新建议</span>
          <h2 id="renewal-title">{hasSelection ? `已选${selectedAssets.length}件3C资产` : "发现1件优先换新资产"}</h2>
        </div>
        <span className="match-confidence"><SafetyCertificateOutlined /> 中等置信度</span>
      </div>
      <p className="match-explanation">已从历史订单自动带入型号、配置和购买时间，可添加手机、平板和耳机组合抵扣。</p>

      <div className="suggested-asset">
        <span className={applied ? "asset-selector active" : "asset-selector"}>{applied ? <CheckOutlined /> : null}</span>
        <div className="asset-stack">
          {selectedAssets.map((asset) => <img key={asset.id} src={asset.image} alt={asset.model} />)}
        </div>
        <div>
          <strong>{selectedAssets.length === 1 ? selectedAssets[0].model : `${selectedAssets.length}件3C资产组合抵扣`}</strong>
          <span>今日预计合计 ¥{formatMoney(plan.assetValueToday)}</span>
          <small>90天预计合计少值 ¥{formatMoney(plan.delayLoss90)}</small>
        </div>
        <button className="text-action" onClick={() => navigate("/assets")}>调整资产 <RightOutlined /></button>
      </div>

      <div className="timing-compare">
        <div className="timing-option recommended">
          <span>今天换</span>
          <strong>平板再付 ¥{formatMoney(plan.netTabletToday)}</strong>
          <small>建议先完成准确估价</small>
        </div>
        <div className="timing-option">
          <span>90天后预计</span>
          <strong>约 ¥{formatMoney(plan.netTablet90)}</strong>
          <small>可能多付 ¥{formatMoney(plan.delayLoss90)}</small>
        </div>
      </div>

      <div className="price-formula" aria-label="今日换新金额明细">
        <div><span>新平板</span><strong>¥{formatMoney(plan.tabletPrice)}</strong></div>
        <div><span>{selectedAssets.length}件3C资产预计回收</span><strong className="deduction">-¥{formatMoney(plan.assetValueToday)}</strong></div>
        <div><span>换新补贴（单次）</span><strong className="deduction">-¥{formatMoney(plan.tradeInBonus)}</strong></div>
        <div className="formula-total"><span>今天平板换新再付</span><strong>¥{formatMoney(plan.netTabletToday)}</strong></div>
      </div>

      <div className="future-note"><ClockCircleOutlined /> 90天预计少值仅用于时机比较，不计入今天优惠。</div>

      {applied ? (
        <div className="applied-actions">
          <span>已应用旧机抵扣，结算后预约上门验机</span>
          <button className="link-button" onClick={onRemove}>取消抵扣</button>
        </div>
      ) : (
        <div className="recommendation-actions">
          <button className="secondary-button" onClick={() => navigate(hasSelection ? "/diagnosis" : "/assets")}>查看依据</button>
          <button className="primary-button" onClick={() => navigate("/assets")}>选择资产并测算</button>
        </div>
      )}
    </section>
  );
}
