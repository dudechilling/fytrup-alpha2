import registry from "./registry.json";
import { markVisited } from "$lib/state/storage.js";

// Haversine distance in meters
function distanceInMeters(a, b) {
  const R = 6371000;
  const dLat = (b[0] - a[0]) * (Math.PI / 180);
  const dLng = (b[1] - a[1]) * (Math.PI / 180);
  const lat1 = a[0] * (Math.PI / 180);
  const lat2 = b[0] * (Math.PI / 180);

  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);

  const h =
    sinLat * sinLat +
    Math.cos(lat1) * Math.cos(lat2) * (sinLng * sinLng);

  return 2 * R * Math.asin(Math.sqrt(h));
}

let triggered = new Set();

// callback: function(poi)
export function startPOIEngine(callback) {
  if (!("geolocation" in navigator)) {
    console.warn("Geolocation not available.");
    return;
  }

  navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      const user = [latitude, longitude];

      registry.forEach((poi) => {
        // avoid repeat triggers
        if (triggered.has(poi.id)) return;

        const d = distanceInMeters(user, poi.coords);

        if (d <= poi.radius) {
          triggered.add(poi.id);
          markVisited(poi.id);
          callback(poi);
        }
      });
    },
    (err) => console.warn("Geolocation error:", err),
    { enableHighAccuracy: true }
  );
}
