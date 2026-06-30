export type SearchValue = unknown;

export function readStringParam(value: SearchValue, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

export function readEnumParam<T extends string>(
  value: SearchValue,
  values: readonly T[],
  fallback: T,
) {
  return typeof value === "string" && (values as readonly string[]).includes(value)
    ? (value as T)
    : fallback;
}

export function readIntegerParam(value: SearchValue, fallback: number, minimum = 1) {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number.parseInt(value, 10)
        : Number.NaN;

  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(minimum, parsed);
}

export function readDateParam(value: SearchValue, fallback: string) {
  if (typeof value !== "string") return fallback;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? fallback : value;
}

export function toDateParam(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
