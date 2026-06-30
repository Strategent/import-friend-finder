export type CalendarMode = "month" | "agenda";

export type Meeting = {
  time: string;
  client: string;
  status: "Confirmed" | "Pending";
  zoom: string;
};

export type CalendarSearch = {
  date: string;
  mode: CalendarMode;
};
