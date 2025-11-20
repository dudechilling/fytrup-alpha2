export default async function initCamera(container) {
  if (!container) return;

  // kill previous streams
  if (container._stream) {
    container._stream.getTracks().forEach((t) => t.stop());
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }
    });

    container._stream = stream;

    const video = document.createElement("video");
    video.srcObject = stream;
    video.playsInline = true;
    video.autoplay = true;
    video.style.width = "100%";
    video.style.height = "100%";

    container.innerHTML = "";
    container.appendChild(video);
  } catch (e) {
    container.innerHTML =
      "<div style='padding: 1rem; color:#003e51;'>Camera unavailable</div>";
  }
}
