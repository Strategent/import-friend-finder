export const DASHBOARD_PREFERENCE_KEYS = {
  setupDone: "hs-setup-done",
} as const;

export const DASHBOARD_LAYOUT_KEYS = {
  railSetup: "hs-rail-layout-v4",
  railDone: "hs-rail-layout-v4-done",
  mainSetup: "hs-main-layout-v6",
  mainDone: "hs-main-layout-v6-done",
} as const;

export function readDashboardLayout<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeDashboardLayout(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage may be unavailable */
  }
}

export function clearDashboardLayout(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* storage may be unavailable */
  }
}
