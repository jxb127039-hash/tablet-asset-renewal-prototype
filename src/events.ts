import type { PrototypeEvent, PrototypeEventName } from "./types";

const EVENT_KEY = "tablet-renewal-events-v1";

export function recordEvent(name: PrototypeEventName, detail: Partial<PrototypeEvent> = {}) {
  const next: PrototypeEvent = {
    id: crypto.randomUUID(),
    name,
    occurredAt: new Date().toISOString(),
    variant: "smart-renewal",
    assetId: detail.assetId,
    cartItemId: detail.cartItemId,
  };
  localStorage.setItem(EVENT_KEY, JSON.stringify([...getEvents(), next].slice(-200)));
  window.dispatchEvent(new CustomEvent("prototype-event"));
}

export function getEvents(): PrototypeEvent[] {
  try {
    return JSON.parse(localStorage.getItem(EVENT_KEY) || "[]") as PrototypeEvent[];
  } catch {
    return [];
  }
}

export function exportEvents() {
  const blob = new Blob([JSON.stringify(getEvents(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "tablet-renewal-prototype-events.json";
  anchor.click();
  URL.revokeObjectURL(url);
}
