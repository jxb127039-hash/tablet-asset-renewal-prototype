import { CheckCircleFilled, SafetyCertificateOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Shell } from "../components/Shell";
import { resetPrototype } from "../store";

export function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const regular = new URLSearchParams(location.search).get("mode") === "regular";
  return (
    <Shell title="提交成功">
      <section className="success-card">
        <CheckCircleFilled className="success-icon" />
        <h2>{regular ? "模拟普通结算已完成" : "模拟换新订单已创建"}</h2>
        <p>{regular ? "本次没有应用旧机抵扣。" : "新机购买与旧机回收将生成独立订单，验机后确认最终回收金额。"}</p>
        {!regular ? (
          <div className="success-steps">
            <div><span>1</span><p><strong>新机配送</strong>按模拟订单正常发货</p></div>
            <div><span>2</span><p><strong>预约上门</strong>确认旧机取件时间</p></div>
            <div><span>3</span><p><strong>验机结算</strong>可接受或拒绝调整后的报价</p></div>
          </div>
        ) : null}
        <div className="success-privacy"><SafetyCertificateOutlined /> 本页面没有产生真实订单、支付或回收请求。</div>
        <button className="primary-button full" onClick={() => { resetPrototype(); navigate("/cart"); }}>重新体验</button>
      </section>
    </Shell>
  );
}
