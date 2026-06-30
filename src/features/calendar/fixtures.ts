import type { CalendarMode, Meeting } from "./types";

export const CALENDAR_DEFAULT_DATE = "2026-01-16";
export const CALENDAR_MODES: CalendarMode[] = ["month", "agenda"];
export const CALENDAR_DEFAULT_SEARCH = {
  date: CALENDAR_DEFAULT_DATE,
  mode: "month" as CalendarMode,
};

export const bookings: Record<number, Meeting[]> = {
  7: [
    {
      time: "10:00",
      client: "Hartley Family Review",
      status: "Confirmed",
      zoom: "https://zoom.us/j/0000000001",
    },
  ],
  16: [
    {
      time: "09:00",
      client: "Hartley Family Trust",
      status: "Confirmed",
      zoom: "https://zoom.us/j/0000000010",
    },
    {
      time: "11:30",
      client: "Denis Marlow - Rebalance",
      status: "Confirmed",
      zoom: "https://zoom.us/j/0000000011",
    },
    {
      time: "14:00",
      client: "Sterling Holdings Review",
      status: "Pending",
      zoom: "https://zoom.us/j/0000000012",
    },
    {
      time: "16:30",
      client: "Caldwell Estate Planning",
      status: "Confirmed",
      zoom: "https://zoom.us/j/0000000013",
    },
  ],
  20: [
    {
      time: "09:00",
      client: "CIO Roundtable - Valdai Fund",
      status: "Confirmed",
      zoom: "https://zoom.us/j/0000000020",
    },
  ],
  22: [
    {
      time: "13:30",
      client: "Sterling Holdings Estate Review",
      status: "Confirmed",
      zoom: "https://zoom.us/j/0000000022",
    },
  ],
  28: [
    {
      time: "16:00",
      client: "All-Hands - Q1 Planning",
      status: "Confirmed",
      zoom: "https://zoom.us/j/0000000028",
    },
  ],
};

export const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];
