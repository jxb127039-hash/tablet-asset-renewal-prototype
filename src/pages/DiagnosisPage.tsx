import { CameraOutlined, CheckCircleFilled, LoadingOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { type ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shell } from "../components/Shell";
import { purchasedAssets } from "../data";
import { recordEvent } from "../events";
import type { ConditionLevel } from "../types";

const choices: { value: ConditionLevel; label: string; hint: string }[] = [
  { value: "excellent", label: "近乎全新", hint: "无明显划痕" },
  { value: "good", label: "正常使用", hint: "轻微使用痕迹" },
  { value: "fair", label: "明显使用", hint: "有划痕或磕碰" },
];

export function DiagnosisPage() {
  const navigate = useNavigate();
  const asset = purchasedAssets[0];
  const [condition, setCondition] = useState<ConditionLevel>("good");
  const [photoUrl, setPhotoUrl] = useState<string>();
  const [photoName, setPhotoName] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(URL.createObjectURL(file));
    setPhotoName(file.name);
  };

  const analyze = () => {
    setAnalyzing(true);
    recordEvent("diagnosis_started", { assetId: asset.id });
    window.setTimeout(() => {
      recordEvent("diagnosis_completed", { assetId: asset.id });
      navigate("/plan");
    }, 800);
  };

  return (
    <Shell title="确认旧机状态" back>
      <section className="diagnosis-device">
        <img src={asset.image} alt={asset.model} />
        <div><span>已从历史订单带入</span><h2>{asset.model}</h2><p>{asset.color}｜{asset.storage}</p></div>
      </section>

      <section className="form-section">
        <div className="section-title"><div><span>1</span><h2>确认外观状态</h2></div><small>影响估值区间</small></div>
        <div className="condition-grid">
          {choices.map((choice) => (
            <button
              key={choice.value}
              className={condition === choice.value ? "condition-option selected" : "condition-option"}
              onClick={() => setCondition(choice.value)}
            >
              {condition === choice.value ? <CheckCircleFilled /> : null}
              <strong>{choice.label}</strong><span>{choice.hint}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="form-section">
        <div className="section-title"><div><span>2</span><h2>上传设备照片</h2></div><small>仅本地预览</small></div>
        <label className={photoUrl ? "photo-upload has-photo" : "photo-upload"}>
          {photoUrl ? <img src={photoUrl} alt="待估设备预览" /> : <CameraOutlined />}
          <span>{photoName || "拍摄正面和背面，辅助模拟识别"}</span>
          <input type="file" accept="image/*" onChange={handlePhoto} />
        </label>
        <p className="privacy-copy"><SafetyCertificateOutlined /> 照片不会上传，演示识别结果由固定样例生成。</p>
      </section>

      <section className="checklist-card">
        <h2>订单信息已自动完成</h2>
        <div><CheckCircleFilled /> 型号、容量和颜色</div>
        <div><CheckCircleFilled /> 购买时间与成交价格</div>
        <div><CheckCircleFilled /> 对应购物车新平板</div>
      </section>

      <button className="primary-button full" disabled={analyzing} onClick={analyze}>
        {analyzing ? <><LoadingOutlined spin /> AI诊断中…</> : "生成换新决策"}
      </button>
    </Shell>
  );
}
