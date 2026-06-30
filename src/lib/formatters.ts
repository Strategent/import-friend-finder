const APP_LOCALE = "en-US";

export function formatCompactCurrency(value: number, currency = "USD") {
  return new Intl.NumberFormat(APP_LOCALE, {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatInteger(value: number) {
  return new Intl.NumberFormat(APP_LOCALE, { maximumFractionDigits: 0 }).format(value);
}

export function formatDate(value: Date, options: Intl.DateTimeFormatOptions) {
  return value.toLocaleDateString(APP_LOCALE, options);
}

export function formatMonthYear(value: Date) {
  return formatDate(value, { month: "long", year: "numeric" });
}

export function formatWeekdayMonthDay(value: Date) {
  return formatDate(value, { weekday: "long", month: "long", day: "numeric" });
}

export function formatShortMonth(value: Date) {
  return formatDate(value, { month: "short" });
}

export function formatRelativeTime(value: number, unit: Intl.RelativeTimeFormatUnit) {
  return new Intl.RelativeTimeFormat(APP_LOCALE, { numeric: "auto" }).format(value, unit);
}
