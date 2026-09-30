export type OutboundLink = {
  id: string;
  label: string;
  command: string;
  href: string;
  display: string;
};

export const SOCIAL_LINKS: readonly OutboundLink[] = [
  { id: "telegram", label: "Telegram", command: "open telegram", href: "https://t.me/rxsklife", display: "t.me/rxsklife" },
  { id: "discord", label: "Discord", command: "open discord", href: "https://discord.com/users/1551767038786150515", display: "discord.com/users/1551767038786150515" },
  { id: "github", label: "GitHub", command: "open github", href: "https://github.com/rxsklife", display: "github.com/rxsklife" },
  { id: "twitter", label: "Twitter", command: "open twitter", href: "https://twitter.com/rxsklife", display: "twitter.com/rxsklife" },
  { id: "support", label: "Support", command: "send support", href: "https://buymeacoffee.com/rxsklife", display: "buymeacoffee.com/rxsklife" },
] as const;

export type Project = {
  id: string;
  name: string;
  href: string;
  display: string;
  tag: string;
  image: string | null;
};

export const PROJECTS: readonly Project[] = [
  { id: "osintpro", name: "OSINTPro", href: "https://osintpro.dev", display: "osintpro.dev", tag: "exhibit 01", image: "/art/osintpro.png" },
  { id: "flockradar", name: "FlockRadar", href: "https://flockradar.com", display: "flockradar.com", tag: "exhibit 02", image: "/art/flockradar.png" },
] as const;

export const FOCUS = ["OSINT", "Threat Intelligence", "AI Development"] as const;

export const TRYHACKME_BADGE = "https://tryhackme.com/api/v2/badges/public-profile?userPublicId=1454241";
