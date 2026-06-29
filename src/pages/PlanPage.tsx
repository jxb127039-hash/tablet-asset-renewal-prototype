import { BellOutlined, CheckCircleFilled, ClockCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shell } from "../components/Shell";
import { cartItems, demoQuote, purchasedAssets } from "../data";
import { recordEvent } from "../events";
import { calculateUpgradePlan, formatMoney } from "../logic";
import { setReminder, setTradeInApplied } from "../store";

export function PlanPage() {
  const navigate = useNavigate();
  const plan = useMemo(() => calculateUpgradePlan(cartItems, purchasedAssets[0], demoQuote), []);
  const [reminded, setReminded] = useState(false);

  const applyTradeIn = () => {
    setTradeInApplied(true);
    recordEvent("tradein_applied", { assetId: purchasedAssets[0].id, cartItemId: cartItems[0].id });
    navigate("/cart");
  };

  const remind = () => {
    const date = "2026-07-29";
    setReminder(date);
    recordEvent("reminder_set", { assetId: purchasedAssets[0].id, cartItemId: cartItems[0].id });
    setReminded(true);
  };

  return (
    <Shell title="AI换新决策" back>
      <section className="decision-hero">
        <span className="decision-pill">建议现在完成准确估值</span>
        <h2>今天换，预计比90天后少付 ¥{formatMoney(plan.delayLoss90)}</h2>
        <p>结论来自旧机残值预测与当前换新补贴，不把设备年份单独作为换机理由。</p>
      </section>

      <section className="decision-comparison">
        <div className="decision-column active">
          <span>今天换</span>
          <strong>¥{formatMoney(plan.netTabletToday)}</strong>
          <small>平板净换新成本</small>
          <i><CheckCircleFilled /> 推荐</i>
        </div>
        <div className="decision-column">
          <span>90天后预计</span>
          <strong>¥{formatMoney(plan.netTablet90)}</strong>
          <small>其他条件不变</small>
          <i className="neutral"><ClockCircleOutlined /> 多付约¥{formatMoney(plan.delayLoss90)}</i>
        </div>
      </section>

      <section className="decision-section">
        <h2>今天的金额怎么算</h2>
        <div className="decision-formula">
          <div><span>iQOO Pad6 Pro</span><strong>¥{formatMoney(plan.tabletPrice)}</strong></div>
          <div><span>iQOO Pad2 Pro 预计抵扣</span><strong className="deduction">-¥{formatMoney(demoQuote.estimateMax)}</strong></div>
          <div><span>换新补贴</span><strong className="deduction">-¥{formatMoney(demoQuote.tradeInBonus)}</strong></div>
          <div className="formula-total"><span>今天平板再付</span><strong>¥{formatMoney(plan.netTabletToday)}</strong></div>
        </div>
        <p className="formula-caveat"><InfoCircleOutlined /> 最终回收价以验机结果为准；键盘等配件单独计入购物车。</p>
      </section>

      <section className="decision-section reasons">
        <h2>为什么推荐这台旧设备</h2>
        <div><CheckCircleFilled /><span><strong>历史订单自动匹配</strong>同一生态、同一品类，无需重新找型号。</span></div>
        <div><CheckCircleFilled /><span><strong>残值风险可解释</strong>90天预计少值¥{formatMoney(plan.delayLoss90)}，不计入今天优惠。</span></div>
        <div><CheckCircleFilled /><span><strong>履约仍走现有以旧换新</strong>AI只负责决策和预填，不替代验机。</span></div>
      </section>

      <button className="primary-button full" onClick={applyTradeIn}>锁定今日估值并抵扣</button>
      <button className="reminder-button" onClick={remind} disabled={reminded}>
        <BellOutlined /> {reminded ? "已设置7月29日提醒" : "暂不换，价格合适时提醒我"}
      </button>
    </Shell>
  );
}
