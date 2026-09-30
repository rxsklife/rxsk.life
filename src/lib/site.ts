import { SOCIAL_LINKS } from "@/lib/links";

export const SITE_URL = "https://rxsk.life";
export const HANDLE = "@rxsklife";
export const DESCRIPTION = "OSINT • Threat Intelligence • AI Development";
export const EMAIL = "contact@rxsk.life";

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "rxsklife",
    alternateName: HANDLE,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/avatar.png`,
    email: `mailto:${EMAIL}`,
    description: DESCRIPTION,
    knowsAbout: ["OSINT", "Threat Intelligence", "AI Development"],
    sameAs: SOCIAL_LINKS.map((l) => l.href),
  };
}
