<script>
  import { onMount } from "svelte";

  let showSplash = true;
  let menuOpen = false;

  onMount(() => {
    // Fade out splash after 1.2s
    setTimeout(() => (showSplash = false), 1200);
  });

  function toggleMenu() {
    menuOpen = !menuOpen;
  }
</script>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: system-ui, sans-serif;
    background: #003e51;
  }

  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  .splash {
    position: absolute;
    inset: 0;
    background: #003e51;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;
    z-index: 999;
    transition: opacity 0.5s ease;
  }

  .splash.hide {
    opacity: 0;
    pointer-events: none;
  }

  header {
    height: 56px;
    background: #003e51;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    flex-shrink: 0;
    font-size: 1.1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.25);
    z-index: 20;
  }

  .menu-btn {
    width: 28px;
    height: 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
  }

  .bar {
    height: 3px;
    background: white;
    border-radius: 2px;
  }

  .drawer {
    position: absolute;
    right: 0;
    top: 56px;
    width: 180px;
    background: #00485f;
    color: white;
    box-shadow: -2px 3px 12px rgba(0,0,0,0.25);
    padding: 10px 0;
    z-index: 40;
  }

  .drawer a {
    color: white;
    display: block;
    padding: 10px 18px;
    text-decoration: none;
  }

  .drawer a:hover {
    background: rgba(255,255,255,0.1);
  }

  main {
    flex: 1;
    position: relative;
    background: #e3ecef;
  }
</style>

<div class="app">
  <div class="splash {showSplash ? '' : 'hide'}">
    Find Your TRU Path
  </div>

  <header>
    <div>Find Your TRU Path</div>
    <div class="menu-btn" on:click={toggleMenu}>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
  </header>

  {#if menuOpen}
    <div class="drawer">
      <a href="/">Map</a>
      <a href="/camera">Camera</a>
      <a href="/chat">Chat</a>
      <a href="/onboarding">Onboarding</a>
      <a href="/profile">Profile</a>
    </div>
  {/if}

  <main>
    <slot />
  </main>
</div>
