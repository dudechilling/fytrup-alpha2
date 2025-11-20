import { writable } from "svelte/store";
import { startPOIEngine } from "$lib/poi/engine.js";
import registry from "$lib/poi/registry.json";

export const dialogue = writable({
  visible: false,
  character: "",
  portrait: "",
  title: "",
  text: "",
  poiId: null
});

let triggered = new Set();

// Initializes POI → Dialogue connections
export function initializeDialogueSystem() {
  startPOIEngine((poi) => {
    if (!poi || triggered.has(poi.id)) return;

    triggered.add(poi.id);

    dialogue.set({
      visible: true,
      character: poi.character ?? "Wolfie",
      portrait:
        poi.portrait ??
        "/fytrup-alpha2/characters/wolfie_neutral.png",
      title: poi.name,
      text: poi.intro,
      poiId: poi.id
    });
  });
}

export function closeDialogue() {
  dialogue.update((d) => ({ ...d, visible: false }));
}
