export type TransmissionStatus = "idle" | "loading" | "playing" | "paused" | "error";

export type TransmissionState = {
  status: TransmissionStatus;
  muted: boolean;
};

export const INITIAL_STATE: TransmissionState = { status: "idle", muted: false };

export type TransmissionEvent =
  | { type: "play-requested" }
  | { type: "play-started" }
  | { type: "play-rejected" }
  | { type: "paused" }
  | { type: "ended" }
  | { type: "toggle-mute" }
  | { type: "media-error" };

export function reduce(state: TransmissionState, event: TransmissionEvent): TransmissionState {
  switch (event.type) {
    case "play-requested":
      return { ...state, status: "loading" };
    case "play-started":
      return { ...state, status: "playing" };
    case "play-rejected":
    case "media-error":
      return { ...state, status: "error" };
    case "paused":
      return { ...state, status: state.status === "error" ? "error" : "paused" };
    case "ended":
      return { ...state, status: "paused" };
    case "toggle-mute":
      return { ...state, muted: !state.muted };
  }
}

export function statusLabel(state: TransmissionState): string {
  const base: Record<TransmissionStatus, string> = {
    idle: "standby",
    loading: "tuning in",
    playing: "playing",
    paused: "paused",
    error: "playback failed",
  };
  const label = base[state.status];
  return state.muted && state.status !== "error" ? `${label} (muted)` : label;
}
