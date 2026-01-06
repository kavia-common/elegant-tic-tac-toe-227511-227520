/**
 * Small sound utility:
 * - localStorage-backed preferences
 * - safe, non-blocking playback
 */

const STORAGE_KEYS = {
  soundEnabled: "ttt:soundEnabled",
  celebrationsEnabled: "ttt:celebrationsEnabled",
};

// PUBLIC_INTERFACE
export function loadPreference(key, fallback) {
  /** Load a boolean preference from localStorage with a safe fallback. */
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return raw === "true";
  } catch {
    return fallback;
  }
}

// PUBLIC_INTERFACE
export function savePreference(key, value) {
  /** Save a boolean preference to localStorage. */
  try {
    window.localStorage.setItem(key, value ? "true" : "false");
  } catch {
    // ignore
  }
}

// PUBLIC_INTERFACE
export function getSoundStorageKey() {
  /** Returns the localStorage key used for sound enabled state. */
  return STORAGE_KEYS.soundEnabled;
}

// PUBLIC_INTERFACE
export function getCelebrationsStorageKey() {
  /** Returns the localStorage key used for celebrations enabled state. */
  return STORAGE_KEYS.celebrationsEnabled;
}

/**
 * Create an audio player for a given src.
 * We keep a cached <audio> element and clone it for overlapping play.
 */
function createSfx(src) {
  let base = null;
  return {
    play(volume = 0.5) {
      if (typeof window === "undefined") return;
      try {
        if (!base) {
          base = new Audio(src);
          base.preload = "auto";
        }
        const a = base.cloneNode(true);
        a.volume = volume;
        // Attempt playback; ignore if blocked by autoplay policies.
        const p = a.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } catch {
        // ignore
      }
    },
  };
}

// PUBLIC_INTERFACE
export function createGameSfx(paths) {
  /**
   * Create game SFX players.
   * @param {{ place: string, invalid: string, win: string, draw: string }} paths
   */
  return {
    place: createSfx(paths.place),
    invalid: createSfx(paths.invalid),
    win: createSfx(paths.win),
    draw: createSfx(paths.draw),
  };
}
