import { describe, expect, it } from "vitest";
import { clients } from "@/features/crm/fixtures";
import { filterClients, getCrmTotals } from "@/features/crm/model";
import { threads } from "@/features/inbox/fixtures";
import { filterThreads, initials } from "@/features/inbox/model";

describe("CRM model", () => {
  it("filters clients by query and stage", () => {
    const filtered = filterClients(clients, "denis", "Proposal");

    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.name).toBe("Denis Marlow");
  });

  it("calculates visible totals from the filtered client set", () => {
    const filtered = filterClients(clients, "", "Proposal");
    const totals = getCrmTotals(clients, filtered);

    expect(totals.total).toBe(clients.length);
    expect(totals.showing).toBe(3);
    expect(totals.open).toBe(3);
    expect(totals.aum).toBe(27_850_000);
  });
});

describe("Inbox model", () => {
  it("filters threads by sender, company, subject, preview, or tag", () => {
    const filtered = filterThreads(threads, "marcus reed");

    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.from).toBe("Marcus Reed");
  });

  it("builds stable two-letter initials", () => {
    expect(initials("Marcus Reed")).toBe("MR");
    expect(initials("Syra")).toBe("S");
  });
});
