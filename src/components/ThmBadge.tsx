"use client";

import { useEffect, useRef, useState } from "react";

const W = 329;
const H = 88;

export function ThmBadge({ src }: { src: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / W));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrap} className="w-full" style={{ height: H * scale }}>
      <div style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <iframe title="TryHackMe public profile badge" src={src} loading="lazy" scrolling="no" width={W} height={H} className="thm-frame" />
      </div>
    </div>
  );
}
