import { DownloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Shell } from "../components/Shell";
import { exportEvents, getEvents } from "../events";
import type { PrototypeEvent } from "../types";

export function ReviewPage() {
  const [events, setEvents] = useState<PrototypeEvent[]>(getEvents());
  useEffect(() => {
    const refresh = () => setEvents(getEvents());
    window.addEventListener("prototype-event", refresh);
    return () => window.removeEventListener("prototype-event", refresh);
  }, []);
  return (
    <Shell title="评审事件" back action={<button className="text-header-button" onClick={exportEvents}><DownloadOutlined /> 导出</button>}>
      <section className="review-summary"><strong>{events.length}</strong><span>个本地演示事件</span><small>仅保存在当前浏览器，不上传。</small></section>
      <section className="event-list">
        {events.length ? events.slice().reverse().map((event) => (
          <article key={event.id}><strong>{event.name}</strong><span>{new Date(event.occurredAt).toLocaleString("zh-CN")}</span><small>{event.assetId || "无资产ID"}</small></article>
        )) : <p className="empty-copy">还没有事件，先完成一次购物车体验。</p>}
      </section>
    </Shell>
  );
}
