import { describe, expect, it } from "vitest";
import { PROJECTS, SOCIAL_LINKS, TRYHACKME_BADGE } from "@/lib/links";

describe("outbound destinations", () => {
  it("keeps the social and support links exact, discord directly under telegram", () => {
    expect(SOCIAL_LINKS.map((l) => l.href)).toEqual([
      "https://t.me/rxsklife",
      "https://discord.com/users/1551767038786150515",
      "https://github.com/rxsklife",
      "https://twitter.com/rxsklife",
      "https://buymeacoffee.com/rxsklife",
    ]);
  });

  it("lists exactly the two selected projects", () => {
    expect(PROJECTS.map((p) => p.href)).toEqual(["https://osintpro.dev", "https://flockradar.com"]);
  });

  it("preserves the TryHackMe badge id", () => {
    expect(TRYHACKME_BADGE).toContain("userPublicId=1454241");
  });

  it("has no placeholder anchors", () => {
    for (const link of [...SOCIAL_LINKS, ...PROJECTS]) {
      expect(link.href.startsWith("https://")).toBe(true);
    }
  });
});
