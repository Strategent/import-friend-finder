export type Stage = "Lead" | "Qualified" | "Proposal" | "Negotiation" | "Closed";

export type StageFilter = "All" | Stage;

export type CrmSearch = {
  q: string;
  stage: StageFilter;
};

export type Client = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  stage: Stage;
  aum: number;
  owner: { initials: string; name: string };
  lastContact: string;
  nextAction: string;
  starred?: boolean;
};
