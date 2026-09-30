"use client";

import { useEffect, useReducer, useRef } from "react";
import { INITIAL_STATE, reduce, statusLabel } from "@/lib/transmission";

const BARS = [0, 1, 2, 3, 4];

export function NowPlaying() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [state, dispatch] = useReducer(reduce, INITIAL_STATE);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlaying = () => dispatch({ type: "play-started" });
    const onPause = () => dispatch({ type: "paused" });
    const onEnded = () => dispatch({ type: "ended" });
    const onError = () => dispatch({ type: "media-error" });
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    const GESTURES: (keyof DocumentEventMap)[] = [
      "pointerdown",
      "keydown",
      "touchstart",
    ];
    const stopWaiting = () =>
      GESTURES.forEach((g) => document.removeEventListener(g, onFirstGesture));
    const onFirstGesture = () => {
      stopWaiting();
      if (!audio.paused) return;
      dispatch({ type: "play-requested" });
      audio.play().catch(() => dispatch({ type: "play-rejected" }));
    };
    dispatch({ type: "play-requested" });
    audio.play().catch(() => {
      dispatch({ type: "autoplay-blocked" });
      GESTURES.forEach((g) =>
        document.addEventListener(g, onFirstGesture, { passive: true }),
      );
    });
    return () => {
      stopWaiting();
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, []);

  const active = state.status === "playing" || state.status === "loading";

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (active) {
      audio.pause();
      return;
    }
    dispatch({ type: "play-requested" });
    try {
      await audio.play();
    } catch {
      dispatch({ type: "play-rejected" });
    }
  };

  return (
    <div className="inline-flex items-center gap-3 text-xs">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={active}
        aria-label={
          active ? "pause promise by weiland" : "play promise by weiland"
        }
        className="np-btn"
      >
        {active ? (
          <svg
            viewBox="0 0 12 12"
            width="10"
            height="10"
            aria-hidden="true"
            focusable="false"
          >
            <rect x="1.5" y="1" width="3" height="10" fill="currentColor" />
            <rect x="7.5" y="1" width="3" height="10" fill="currentColor" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 12 12"
            width="10"
            height="10"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M2 1 L11 6 L2 11 Z" fill="currentColor" />
          </svg>
        )}
      </button>
      <span
        aria-hidden="true"
        className={`np-bars ${state.status === "playing" ? "is-playing" : ""}`}
      >
        {BARS.map((b) => (
          <span key={b} style={{ animationDelay: `${b * 120}ms` }} />
        ))}
      </span>
      <span>
        <span className="dim">now playing: </span>
        <span className="text-bone">promise</span>
        <span className="dim"> - weiland</span>
      </span>
      <output aria-live="polite" className="sr-only">
        {statusLabel(state)}
      </output>
      {state.status === "error" && (
        <span className="dim">[playback failed]</span>
      )}
      <audio ref={audioRef} src="/promise.mp3" preload="auto" autoPlay loop />
    </div>
  );
}
