<script>
  import { updateState, getState } from "$lib/state/storage.js";

  let step = 0;

  const slides = [
    {
      title: "Welcome to TRU",
      text: "Explore campus, unlock locations, and meet Wolfie along the way."
    },
    {
      title: "Live Map",
      text: "See your real-time location as you navigate TRU."
    },
    {
      title: "Camera Mode",
      text: "Switch to camera view to capture markers and reveal surprises."
    },
    {
      title: "Chat With Wolfie",
      text: "Ask questions anytime — Wolfie is your campus guide."
    }
  ];

  function next() {
    if (step < slides.length - 1) {
      step++;
    } else {
      updateState({ onboardingComplete: true });
      window.location.href = "/";
    }
  }
</script>

<style>
  .wrap {
    height: 100%;
    text-align: center;
    padding: 2rem 1.5rem;
  }
  h1 {
    color: #003e51;
    margin-bottom: 0.6rem;
  }
  p {
    font-size: 1.1rem;
    color: #003e51;
    line-height: 1.4;
  }
  button {
    margin-top: 2rem;
    background: #003e51;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 0.7rem 1.6rem;
    font-size: 1.1rem;
    cursor: pointer;
  }
</style>

<div class="wrap">
  <h1>{slides[step].title}</h1>
  <p>{slides[step].text}</p>

  <button on:click={next}>
    {step === slides.length - 1 ? "Start Exploring" : "Next"}
  </button>
</div>
