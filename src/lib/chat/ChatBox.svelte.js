<script>
  import { onMount, tick } from "svelte";
  import { loadModel, chat as ask } from "./webgpu.js";

  let loading = true;
  let statusText = "Loading…";
  let messages = [];
  let input = "";

  onMount(async () => {
    await loadModel((msg) => (statusText = msg));
    loading = false;

    messages.push({
      role: "assistant",
      text: "Hey! I'm Wolfie. Ask me anything about TRU."
    });
  });

  async function send() {
    if (!input.trim()) return;

    const userMsg = input.trim();
    messages.push({ role: "user", text: userMsg });
    input = "";

    const reply = await ask(userMsg, (msg) => (statusText = msg));
    messages.push({ role: "assistant", text: reply });

    await tick();
    const container = document.getElementById("chat-scroll");
    if (container) container.scrollTop = container.scrollHeight;
  }
</script>

<style>
  .chatbox {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: white;
  }

  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
  }

  .bubble {
    max-width: 80%;
    padding: 0.7rem 1rem;
    border-radius: 12px;
    margin-bottom: 0.8rem;
    line-height: 1.35;
    word-wrap: break-word;
  }

  .user {
    background: #e3ecef;
    color: #003e51;
    margin-left: auto;
  }

  .bot {
    background: #003e51;
    color: white;
    margin-right: auto;
  }

  .input-bar {
    display: flex;
    padding: 0.6rem;
    border-top: 1px solid #ccc;
    background: #f5f7f8;
  }

  input {
    flex: 1;
    padding: 0.6rem 1rem;
    border-radius: 8px;
    border: 1px solid #ccd;
    font-size: 1rem;
  }

  button {
    margin-left: 0.6rem;
    padding: 0 1.2rem;
    background: #003e51;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
</style>

<div class="chatbox">
  {#if loading}
    <div class="messages">{statusText}</div>
  {:else}
    <div id="chat-scroll" class="messages">
      {#each messages as m}
        <div class="bubble {m.role === 'user' ? 'user' : 'bot'}">
          {m.text}
        </div>
      {/each}
    </div>

    <div class="input-bar">
      <input
        bind:value={input}
        placeholder="Ask Wolfie…"
        on:keydown={(e) => e.key === "Enter" && send()}
      />
      <button on:click={send}>Send</button>
    </div>
  {/if}
</div>
