"use client";

import { Scaler } from "@/components/Scaler";

const W = 329;
const H = 88;

export function ThmBadge({ src }: { src: string }) {
  return (
    <Scaler width={W} height={H}>
      <iframe
        title="TryHackMe public profile badge"
        src={src}
        loading="lazy"
        scrolling="no"
        width={W}
        height={H}
        className="thm-frame"
      />
    </Scaler>
  );
}
