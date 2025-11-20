<script>
  import { getState } from "$lib/state/storage.js";

  let state = getState();
</script>

<style>
  .wrap { padding: 1.5rem; }
  h1 {
    color: #003e51;
    margin-bottom: 1rem;
  }
  .section {
    background: white;
    padding: 1rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }
  ul { padding-left: 1.2rem; }
  .empty {
    font-style: italic;
    color: #666;
  }
</style>

<div class="wrap">
  <h1>Your Progress</h1>

  <div class="section">
    <h2>Visited Locations</h2>
    {#if state.visited.length > 0}
      <ul>
        {#each state.visited as v}
          <li>{v}</li>
        {/each}
      </ul>
    {:else}
      <div class="empty">You haven't visited any POIs yet.</div>
    {/if}
  </div>

  <div class="section">
    <h2>Unlocked Characters</h2>
    {#if state.unlocked.length > 0}
      <ul>
        {#each state.unlocked as c}
          <li>{c}</li>
        {/each}
      </ul>
    {:else}
      <div class="empty">No characters unlocked yet.</div>
    {/if}
  </div>

  <div class="section">
    <h2>Onboarding</h2>
    {#if state.onboardingComplete}
      <div>Completed ✔</div>
    {:else}
      <div>Not completed</div>
    {/if}
  </div>
</div>
