import L from "leaflet";
import registry from "$lib/poi/registry.json";
import "leaflet/dist/leaflet.css";

// TRU custom circular icon
const truIcon = L.icon({
  iconUrl: "/fytrup-alpha2/icons/map/marker-64.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
});

export default function initMap(container) {
  if (!container) return;

  // prevent re-initialization
  if (container._leaflet_map) return container._leaflet_map;

  // TRU campus center (HOL area)
  const defaultCenter = [50.6718, -120.3645];

  const map = L.map(container, {
    center: defaultCenter,
    zoom: 16,
    zoomControl: true
  });

  container._leaflet_map = map;

  // OSM tiles — FOIPPA-safe
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
    maxZoom: 19
  }).addTo(map);

  // Plot all POIs with TRU icon
  registry.forEach((poi) => {
    L.marker(poi.coords, { icon: truIcon })
      .addTo(map)
      .bindPopup(poi.name);
  });

  // User location marker
  const userMarker = L.circleMarker(defaultCenter, {
    radius: 8,
    color: "#00b0b9",
    fillColor: "#00b0b9",
    fillOpacity: 0.9
  }).addTo(map);

  // Geolocation tracking
  if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        userMarker.setLatLng([latitude, longitude]);
      },
      (err) => console.warn("Geolocation error:", err),
      { enableHighAccuracy: true }
    );
  }

  return map;
}
