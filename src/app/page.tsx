import Image from "next/image";
import { Activity } from "@/components/Activity";
import { Monero } from "@/components/Monero";
import { NowPlaying } from "@/components/NowPlaying";
import { Rain } from "@/components/Rain";
import { ThmBadge } from "@/components/ThmBadge";
import { Titlebar } from "@/components/Titlebar";
import { personSchema } from "@/lib/site";
import { FOCUS, PROJECTS, SOCIAL_LINKS, TRYHACKME_BADGE } from "@/lib/links";

const support = SOCIAL_LINKS.find((l) => l.id === "support")!;
const socials = SOCIAL_LINKS.filter((l) => l.id !== "support");

function Cmd({ verb, children }: { verb: string; children: React.ReactNode }) {
  return (
    <h2 className="mb-2 text-sm">
      <span className="prompt">$ </span>
      <span className="verb">{verb}</span> {children}
    </h2>
  );
}

function LinkList({
  items,
}: {
  items: readonly { href: string; label: string }[];
}) {
  return (
    <ul className="flex flex-col gap-1.5 pl-4">
      {items.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer me"
            className="link-row"
          >
            <span aria-hidden="true" className="dim">
              &gt;&nbsp;
            </span>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-bone focus:px-3 focus:py-2 focus:text-void"
      >
        skip to content
      </a>
      <main
        id="main"
        className="flex min-h-dvh items-center justify-center px-4 py-10 sm:px-8 sm:py-14"
      >
        <div className="window w-full max-w-[560px]">
          <Titlebar title="guest@rxsk.life: ~" />

          <div className="relative">
            <Rain />
            <div className="relative z-10 flex flex-col gap-8 px-6 py-8 sm:px-10 sm:py-10">
              <section
                aria-labelledby="identity"
                className="boot flex flex-col items-center gap-3 text-center"
              >
                <Image
                  src="/avatar.png"
                  alt="rxsklife profile picture"
                  width={96}
                  height={96}
                  priority
                  className="avatar"
                />
                <h1
                  id="identity"
                  className="text-3xl font-bold tracking-tight sm:text-4xl"
                >
                  <span className="pulse">@rxsklife</span>
                </h1>
                <a href="mailto:contact@rxsk.life" className="email text-xs">
                  contact@rxsk.life
                </a>
                <p className="whitespace-nowrap text-[clamp(0.68rem,3.3vw,0.875rem)]">
                  {FOCUS.map((item, i) => (
                    <span key={item}>
                      {i > 0 && (
                        <span aria-hidden="true" className="pulse">
                          {" "}
                          •{" "}
                        </span>
                      )}
                      {item}
                    </span>
                  ))}
                </p>
                <NowPlaying />
              </section>

              <section aria-labelledby="links-heading" className="boot boot-1">
                <Cmd verb="ls">
                  <span id="links-heading">links/</span>
                </Cmd>
                <LinkList
                  items={socials.map((l) => ({
                    href: l.href,
                    label: l.label.toLowerCase(),
                  }))}
                />
              </section>

              <section
                aria-labelledby="projects-heading"
                className="boot boot-2"
              >
                <Cmd verb="ls">
                  <span id="projects-heading">projects/</span>
                </Cmd>
                <LinkList
                  items={PROJECTS.map((p) => ({
                    href: p.href,
                    label: p.name.toLowerCase(),
                  }))}
                />
              </section>

              <section
                aria-labelledby="activity-heading"
                className="boot boot-3"
              >
                <Cmd verb="curl">
                  <span id="activity-heading">github/activity</span>
                </Cmd>
                <div className="pl-4">
                  <Activity />
                </div>
              </section>

              <section aria-labelledby="badge-heading" className="boot boot-4">
                <Cmd verb="curl">
                  <span id="badge-heading">tryhackme/badge</span>
                </Cmd>
                <div className="pl-4">
                  <ThmBadge src={TRYHACKME_BADGE} />
                </div>
              </section>

              <p className="boot boot-5 caret text-sm">
                <span className="dim">guest@rxsk.life</span>:
                <span className="pulse">~</span>$
              </p>

              <section
                aria-labelledby="support-heading"
                className="boot boot-5 flex flex-col items-center gap-5 border-t border-line pt-7"
              >
                <h2 id="support-heading" className="sr-only">
                  support
                </h2>
                <a
                  href={support.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="key key-solid key-round text-sm"
                >
                  buy me a coffee
                  <span className="sr-only">, opens in a new tab</span>
                </a>
                <Monero />
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
