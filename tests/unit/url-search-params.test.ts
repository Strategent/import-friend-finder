import { describe, expect, it } from "vitest";
import {
  readDateParam,
  readEnumParam,
  readIntegerParam,
  readStringParam,
  toDateParam,
} from "@/lib/url-search-params";

describe("url search param readers", () => {
  it("keeps valid strings and falls back for non-strings", () => {
    expect(readStringParam("denis", "")).toBe("denis");
    expect(readStringParam(42, "fallback")).toBe("fallback");
  });

  it("keeps enum values only when they are in the allowed set", () => {
    const stages = ["All", "Lead", "Proposal"] as const;

    expect(readEnumParam("Proposal", stages, "All")).toBe("Proposal");
    expect(readEnumParam("Closed", stages, "All")).toBe("All");
  });

  it("parses integers with a minimum clamp and fallback", () => {
    expect(readIntegerParam("3", 1)).toBe(3);
    expect(readIntegerParam("0", 1)).toBe(1);
    expect(readIntegerParam("not-a-number", 7)).toBe(7);
  });

  it("keeps valid date params and serializes dates as yyyy-mm-dd", () => {
    expect(readDateParam("2026-01-16", "2026-01-01")).toBe("2026-01-16");
    expect(readDateParam("invalid", "2026-01-01")).toBe("2026-01-01");
    expect(toDateParam(new Date(2026, 0, 16))).toBe("2026-01-16");
  });
});
