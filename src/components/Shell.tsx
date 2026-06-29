import { ArrowLeftOutlined, CheckOutlined, ExperimentOutlined } from "@ant-design/icons";
import type { PropsWithChildren, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export function Shell({
  children,
  title,
  back = false,
  action,
  bottom,
}: PropsWithChildren<{ title: string; back?: boolean; action?: ReactNode; bottom?: ReactNode }>) {
  const navigate = useNavigate();
  return (
    <div className="app-frame">
      <header className="topbar">
        <div className="topbar-side">
          {back ? (
            <button className="icon-button" aria-label="返回" onClick={() => navigate(-1)}>
              <ArrowLeftOutlined />
            </button>
          ) : null}
        </div>
        <h1>{title}</h1>
        <div className="topbar-side topbar-action">{action}</div>
      </header>
      <div className="demo-label"><ExperimentOutlined /> 概念演示 · 模拟数据</div>
      <main className={bottom ? "page-content with-bottom" : "page-content"}>{children}</main>
      {bottom}
    </div>
  );
}

export function SelectMark({ selected, onClick, label }: { selected: boolean; onClick?: () => void; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={selected}
      className={selected ? "select-mark selected" : "select-mark"}
      onClick={onClick}
    >
      {selected ? <CheckOutlined /> : null}
    </button>
  );
}
