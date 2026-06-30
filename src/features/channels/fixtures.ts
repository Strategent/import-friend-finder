export const channels = [
  { name: "general", private: false, unread: 0 },
  { name: "ops-alerts", private: false, unread: 3 },
  { name: "sales-pipeline", private: false, unread: 12 },
  { name: "syra-handoff", private: true, unread: 1 },
  { name: "exec", private: true, unread: 0 },
  { name: "client-hartley", private: false, unread: 0 },
  { name: "research", private: false, unread: 2 },
];

export const dms = [
  { name: "Elena Smith", status: "active" },
  { name: "Adrian Engman", status: "away" },
  { name: "Claire Bennett", status: "active" },
  { name: "Syra", status: "ai" },
];

export const messages = [
  {
    user: "Elena Smith",
    text: "Heads up - Hartley Trust just replied to the IPS draft. Want me to forward?",
    time: "10:42 AM",
  },
  {
    user: "Adrian Engman",
    text: "Looping in @Syra to pull the latest rebalance numbers before Thursday's call.",
    time: "10:44 AM",
    mentionsSyra: true,
  },
  {
    user: "Syra",
    text: "On it. Pulled YTD allocation drift (+2.4% equities, -1.8% fixed income) and drafted a one-page summary. Shared in #sales-pipeline canvas.",
    time: "10:44 AM",
    ai: true,
  },
  {
    user: "Claire Bennett",
    text: "Perfect. Let's review on the 2pm sync. I'll add it to the agenda.",
    time: "10:46 AM",
  },
  {
    user: "Daniel Brooks",
    text: "Quick note - Marlow Capital wants the alts sleeve memo by Friday EOD.",
    time: "10:51 AM",
  },
];
