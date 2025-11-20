// Safe JSON get
function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Storage read error:", e);
    return fallback;
  }
}

// Safe JSON set
function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("Storage write error:", e);
  }
}

// Default full app state
const defaultState = {
  visited: [],            // list of POI IDs
  unlocked: [],           // character unlocks
  lastMap: null,          // not used yet, reserved
  onboardingComplete: false
};

// Read state object
export function getState() {
  return safeGet("fytrup_state", defaultState);
}

// Merge update
export function updateState(partial) {
  const current = getState();
  const next = { ...current, ...partial };
  safeSet("fytrup_state", next);
  return next;
}

// Called when user enters POI geofence
export function markVisited(id) {
  const state = getState();
  if (!state.visited.includes(id)) {
    state.visited.push(id);
    safeSet("fytrup_state", state);
  }
}

// Optional: unlock characters
export function unlockCharacter(name) {
  const state = getState();
  if (!state.unlocked.includes(name)) {
    state.unlocked.push(name);
    safeSet("fytrup_state", state);
  }
}
