const APPLIED_KEY = "tablet-renewal-applied-v1";
const REMINDER_KEY = "tablet-renewal-reminder-v1";
const SELECTED_ASSETS_KEY = "tablet-renewal-selected-assets-v1";

export function isTradeInApplied() {
  return localStorage.getItem(APPLIED_KEY) === "true";
}

export function setTradeInApplied(value: boolean) {
  localStorage.setItem(APPLIED_KEY, String(value));
  window.dispatchEvent(new CustomEvent("renewal-state"));
}

export function getReminder() {
  return localStorage.getItem(REMINDER_KEY);
}

export function setReminder(date: string) {
  localStorage.setItem(REMINDER_KEY, date);
  window.dispatchEvent(new CustomEvent("renewal-state"));
}

export function getSelectedAssetIds() {
  try {
    const ids = JSON.parse(localStorage.getItem(SELECTED_ASSETS_KEY) || "[]") as string[];
    return ids;
  } catch {
    return [];
  }
}

export function setSelectedAssetIds(ids: string[]) {
  localStorage.setItem(SELECTED_ASSETS_KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent("renewal-state"));
}

export function resetPrototype() {
  localStorage.removeItem(APPLIED_KEY);
  localStorage.removeItem(REMINDER_KEY);
  localStorage.removeItem(SELECTED_ASSETS_KEY);
  window.dispatchEvent(new CustomEvent("renewal-state"));
}
