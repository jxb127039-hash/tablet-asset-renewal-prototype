const APPLIED_KEY = "tablet-renewal-applied-v1";
const REMINDER_KEY = "tablet-renewal-reminder-v1";

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

export function resetPrototype() {
  localStorage.removeItem(APPLIED_KEY);
  localStorage.removeItem(REMINDER_KEY);
  window.dispatchEvent(new CustomEvent("renewal-state"));
}
