<script>
  import { onMount, tick } from "svelte";

  import initMap from "$lib/map/leaflet.js";
  import initCamera from "$lib/camera/capture.js";
  import ChatBox from "$lib/chat/ChatBox.svelte";
  import DialoguePanel from "$lib/dialogue/DialoguePanel.svelte";

  import { dialogue, closeDialogue, initializeDialogueSystem } from "$lib/dialogue/controller.js";

  let dlg;
  dialogue.subscribe(v => dlg = v);

  let current = "map";
  let mapContainer;
  let cameraContainer;
  let mapInstance = null;
  let cameraStarted = false;

  function switchMode(mode) {
    current = mode;
  }

  onMount(async () => {
    await tick();

    // Initialize map on first load
    mapInstance = initMap(mapContainer);

    // Start POI → dialogue system
    initializeDialogueSystem();
  });

  $: if (current === "map" && mapContainer && !mapInstance) {
    mapInstance = initMap(mapContainer);
  }

  $: if (current === "camera" && cameraContainer && !cameraStarted) {
    initCamera(cameraContainer);
    cameraStarted = true;
  }
</script>

<style>
  .page { display: flex; flex-direction: column; height: 100%; }
  .view { flex: 1; position: relative; background: #e3ecef; }
  .map-area, .camera-area {
    position: absolute; inset: 0;
  }
  .chat-area {
    position: absolute; inset: 0;
    background: white;
    display: flex; flex-direction: column;
  }
  nav {
    height: 56px;
    background: #003e51;
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  nav button {
    background: none; border: none; color: white;
    font-size: 1rem; cursor: pointer;
  }
  nav button.active {
    color: #ffcd00;
    font-weight: 700;
  }
</style>

<div class="page">
  <div class="view">
    {#if current === "map"}
      <div bind:this={mapContainer} class="map-area"></div>
    {/if}

    {#if current === "camera"}
      <div bind:this={cameraContainer} class="camera-area"></div>
    {/if}

    {#if current === "chat"}
      <div class="chat-area">
        <ChatBox />
      </div>
    {/if}

    <!-- Slide-up POI Dialogue Panel -->
    <DialoguePanel
      visible={dlg.visible}
      character={dlg.character}
      portrait={dlg.portrait}
      title={dlg.title}
      text={dlg.text}
      poiId={dlg.poiId}
      on:close={() => closeDialogue()}
    />
  </div>

  <nav>
    <button class:active={current === "map"} on:click={() => switchMode("map")}>Map</button>
    <button class:active={current === "camera"} on:click={() => switchMode("camera")}>Camera</button>
    <button class:active={current === "chat"} on:click={() => switchMode("chat")}>Chat</button>
  </nav>
</div>
