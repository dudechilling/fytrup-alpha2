<script>
  import { createEventDispatcher } from "svelte";

  export let visible = false;
  export let character = "Wolfie";
  export let portrait = "/fytrup-alpha2/characters/wolfie_neutral.png";
  export let title = "";
  export let text = "";
  export let poiId = null;

  const dispatch = createEventDispatcher();

  function close() {
    dispatch("close", { poiId });
  }
</script>

<style>
  .panel {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0 -4px 16px rgba(0,0,0,0.25);
    padding: 1.1rem 1.4rem;
    transform: translateY(100%);
    transition: transform 0.32s ease;
    z-index: 5000;
  }

  .panel.visible {
    transform: translateY(0%);
  }

  .header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .portrait {
    width: 72px;
    height: 72px;
    border-radius: 14px;
    object-fit: cover;
    border: 3px solid #003e51;
  }

  .character {
    font-size: 1.3rem;
    font-weight: 700;
    color: #003e51;
  }

  .title {
    margin-top: 0.9rem;
    font-size: 1.15rem;
    font-weight: 600;
    color: #003e51;
  }

  .body {
    margin-top: 0.4rem;
    font-size: 1.05rem;
    line-height: 1.4;
    color: #003e51;
  }

  .btn {
    margin-top: 1.4rem;
    width: 100%;
    background: #003e51;
    color: white;
    border: none;
    padding: 0.8rem 1rem;
    border-radius: 10px;
    font-size: 1.1rem;
    cursor: pointer;
  }
</style>

<div class="panel {visible ? 'visible' : ''}">
  <div class="header">
    <img class="portrait" src={portrait} alt={character} />
    <div class="character">{character}</div>
  </div>

  <div class="title">{title}</div>
  <div class="body">{text}</div>

  <button class="btn" on:click={close}>Continue</button>
</div>
