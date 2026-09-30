import type { Metadata } from "next";
import Link from "next/link";
import { Titlebar } from "@/components/Titlebar";

export const metadata: Metadata = {
  title: "404 | @rxsklife",
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-dvh items-center justify-center px-4 py-10 sm:px-8 sm:py-14"
    >
      <div className="window w-full max-w-[560px]">
        <Titlebar title="guest@rxsk.life: ~" />
        <div className="flex flex-col gap-4 px-6 py-8 text-sm sm:px-10 sm:py-10">
          <p>
            <span className="prompt">$ </span>
            <span className="verb">cat</span> {"<requested path>"}
          </p>
          <p className="dim">cat: no such file or directory (404)</p>
          <p>
            <span className="prompt">$ </span>
            <span className="verb">cd</span>{" "}
            <Link href="/" className="email">
              ~
            </Link>
          </p>
          <p className="caret text-sm">
            <span className="dim">guest@rxsk.life</span>:
            <span className="pulse">~</span>$
          </p>
        </div>
      </div>
    </main>
  );
}
