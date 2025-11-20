import { CreateWebWorkerMLCEngine } from "webllm";

let engine = null;

export async function loadModel(status = () => {}) {
  if (engine) return engine;

  status("Loading model…");

  engine = await CreateWebWorkerMLCEngine(
    new Worker("https://cdn.jsdelivr.net/npm/webllm@latest/webllm-worker.js"),
    {
      model: "Phi-3-mini-4k-instruct-q4f16_1",
      progress_callback: (p) => status(`Loading ${Math.round(p * 100)}%`)
    }
  );

  status("Ready");
  return engine;
}

export async function chat(prompt, status = () => {}) {
  if (!engine) await loadModel(status);

  const completion = await engine.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are Wolfie, the friendly TRU campus guide. Be helpful, brief, and encouraging."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    stream: false
  });

  return completion.choices[0].message.content;
}
