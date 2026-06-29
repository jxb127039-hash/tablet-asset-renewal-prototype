import { CheckOutlined, ClockCircleOutlined, RightOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { demoQuote, purchasedAssets } from "../data";
import { formatMoney } from "../logic";
import type { UpgradePlan } from "../types";

export function RenewalRecommendation({ applied, plan, onRemove }: { applied: boolean; plan: UpgradePlan; onRemove: () => void }) {
  const navigate = useNavigate();
  const asset = purchasedAssets[0];
  return (
    <section className={applied ? "renewal-panel applied" : "renewal-panel"} aria-labelledby="renewal-title">
      <div className="renewal-heading">
        <div>
          <span className="eyebrow">智能换新建议</span>
          <h2 id="renewal-title">历史订单已匹配旧平板</h2>
        </div>
        <span className="match-confidence"><SafetyCertificateOutlined /> 中等置信度</span>
      </div>
      <p className="match-explanation">已匹配你在2024年购买的 {asset.model}，型号和配置无需重新填写。</p>

      <div className="suggested-asset">
        <span className={applied ? "asset-selector active" : "asset-selector"}>{applied ? <CheckOutlined /> : null}</span>
        <img src={asset.image} alt={asset.model} />
        <div>
          <strong>{asset.model}</strong>
          <span>{asset.color}｜{asset.storage}</span>
          <small>外观良好 · 功能正常</small>
        </div>
        <button className="text-action" onClick={() => navigate("/assets")}>更换设备 <RightOutlined /></button>
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
        <div><span>旧机预计抵扣</span><strong className="deduction">-¥{formatMoney(demoQuote.estimateMax)}</strong></div>
        <div><span>换新补贴</span><strong className="deduction">-¥{formatMoney(demoQuote.tradeInBonus)}</strong></div>
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
          <button className="secondary-button" onClick={() => navigate("/diagnosis")}>查看依据</button>
          <button className="primary-button" onClick={() => navigate("/diagnosis")}>测算并抵扣</button>
        </div>
      )}
    </section>
  );
}
