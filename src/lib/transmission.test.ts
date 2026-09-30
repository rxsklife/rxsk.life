import { describe, expect, it } from "vitest";
import { INITIAL_STATE, reduce, statusLabel } from "@/lib/transmission";

describe("transmission state", () => {
  it("returns to standby when autoplay is blocked so the first gesture can start it", () => {
    const loading = reduce(INITIAL_STATE, { type: "play-requested" });
    const state = reduce(loading, { type: "autoplay-blocked" });
    expect(state.status).toBe("idle");
    expect(statusLabel(state)).toBe("standby");
  });

  it("starts on standby and unmuted", () => {
    expect(INITIAL_STATE).toEqual({ status: "idle", muted: false });
    expect(statusLabel(INITIAL_STATE)).toBe("standby");
  });

  it("moves to playing when playback starts", () => {
    const next = reduce(INITIAL_STATE, { type: "play-started" });
    expect(next.status).toBe("playing");
    expect(statusLabel(next)).toBe("playing");
  });

  it("shows a loading state between the click and the first frame", () => {
    const loading = reduce(INITIAL_STATE, { type: "play-requested" });
    expect(loading.status).toBe("loading");
    expect(statusLabel(loading)).toBe("tuning in");
    expect(reduce(loading, { type: "play-started" }).status).toBe("playing");
  });

  it("reports failure when play() is rejected and does not claim success", () => {
    const next = reduce(INITIAL_STATE, { type: "play-rejected" });
    expect(next.status).toBe("error");
    expect(statusLabel(next)).toBe("playback failed");
  });

  it("pauses from playing and treats ended as paused", () => {
    const playing = reduce(INITIAL_STATE, { type: "play-started" });
    expect(reduce(playing, { type: "paused" }).status).toBe("paused");
    expect(reduce(playing, { type: "ended" }).status).toBe("paused");
  });

  it("keeps the error state when a pause event follows a failure", () => {
    const failed = reduce(INITIAL_STATE, { type: "play-rejected" });
    expect(reduce(failed, { type: "paused" }).status).toBe("error");
  });

  it("toggles mute and shows it in the label without relying on color", () => {
    const muted = reduce(INITIAL_STATE, { type: "toggle-mute" });
    expect(muted.muted).toBe(true);
    expect(statusLabel(muted)).toBe("standby (muted)");
    expect(reduce(muted, { type: "toggle-mute" }).muted).toBe(false);
  });
});
