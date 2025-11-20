const CACHE_NAME = "fytrup-alpha2-cache-v1";

// Only cache safe, static assets
const STATIC_ASSETS = [
  "/fytrup-alpha2/",
  "/fytrup-alpha2/manifest.json",
  "/fytrup-alpha2/splash.png",

  // Icons
  "/fytrup-alpha2/icons/map/marker-64.png",
  "/fytrup-alpha2/icons/map/marker-128.png",
  "/fytrup-alpha2/icons/map/marker-256.png",
  "/fytrup-alpha2/icons/map/marker-384.png",
  "/fytrup-alpha2/icons/map/marker-512.png",
  "/fytrup-alpha2/icons/map/marker.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Cache-first for GET static resources
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Never cache POST, PUT, model loads, or any non-GET
  if (request.method !== "GET") {
    return;
  }

  // Safe to cache
  event.respondWith(
    caches.match(request).then((cached) => {
      return (
        cached ||
        fetch(request).catch(() => {
          // Fallback: return homepage for offline SPA navigation
          if (request.mode === "navigate") {
            return caches.match("/fytrup-alpha2/");
          }
        })
      );
    })
  );
});
