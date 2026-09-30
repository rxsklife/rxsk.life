"use client";

import { useEffect, useState } from "react";
import MatrixRain from "react-matrix-rain";

export function Rain() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!enabled) return null;

  return (
    <div className="rain" aria-hidden="true">
      <MatrixRain
        color="#39ff14"
        backgroundColor="#101012"
        font="0.8rem monospace"
        density={0.012}
        fadeRate={0.08}
        zIndex={0}
      />
    </div>
  );
}
