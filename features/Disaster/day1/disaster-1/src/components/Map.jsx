import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { heatmapPaint } from "../features/heatmap";

/* ---------------- DUMMY DATA ---------------- */
const MOCK_VOLUNTEERS = [
  { id: "v1", latOffset: 0.002, lngOffset: 0.002 },
  { id: "v2", latOffset: -0.003, lngOffset: 0.001 },
];

const MOCK_CONTACTS = [
  { id: "c1", latOffset: 0.001, lngOffset: -0.002 },
  { id: "c2", latOffset: -0.002, lngOffset: -0.001 },
];

function getDistanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth radius (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/*const DUMMY_INCIDENTS = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { id: 1, title: "Flooded Area", severity: 4 },
      geometry: { type: "Point", coordinates: [78.5, 17.4] },
    },
    {
      type: "Feature",
      properties: { id: 2, title: "Road Block", severity: 2 },
      geometry: { type: "Point", coordinates: [80.1, 16.5] },
    },
    {
      type: "Feature",
      properties: { id: 3, title: "Medical Emergency", severity: 5 },
      geometry: { type: "Point", coordinates: [77.6, 12.9] },
    },
  ],
};

const DUMMY_VOLUNTEERS = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { id: "v1", name: "Volunteer A", phone: "9000000001" },
      geometry: { type: "Point", coordinates: [78.3, 17.4] },
    },
  ],
};

/* ---------------- MAP COMPONENT ---------------- */

export default function Map({ showHeat, toggleVolunteers }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const userMarkerRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  /* -------- MAP INITIALIZATION -------- */

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [0, 0], // India center fallback
      zoom: 2,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    map.current.on("load", () => {
      /* INCIDENT SOURCE */
      // map.current.addSource("incidents", {
      //   type: "geojson",
      //   data: DUMMY_INCIDENTS,
      //   cluster: true,
      //   clusterRadius: 50,
      // });

      // /* CLUSTERS */
      // map.current.addLayer({
      //   id: "clusters",
      //   type: "circle",
      //   source: "incidents",
      //   filter: ["has", "point_count"],
      //   paint: {
      //     "circle-color": "#f28cb1",
      //     "circle-radius": 20,
      //   },
      // });

      // map.current.addLayer({
      //   id: "cluster-count",
      //   type: "symbol",
      //   source: "incidents",
      //   filter: ["has", "point_count"],
      //   layout: {
      //     "text-field": "{point_count_abbreviated}",
      //     "text-size": 12,
      //   },
      // });

      // /* UNCLUSTERED INCIDENTS */
      // map.current.addLayer({
      //   id: "incident-point",
      //   type: "circle",
      //   source: "incidents",
      //   filter: ["!", ["has", "point_count"]],
      //   paint: {
      //     "circle-color": "#ff3b30",
      //     "circle-radius": 8,
      //     "circle-stroke-color": "#fff",
      //     "circle-stroke-width": 2,
      //   },
      // });

      // /* HEATMAP */
      // map.current.addLayer(
      //   {
      //     id: "incidents-heat",
      //     type: "heatmap",
      //     source: "incidents",
      //     paint: heatmapPaint,
      //     layout: { visibility: "none" },
      //   },
      //   "clusters"
      // );

      // /* VOLUNTEERS */
      // map.current.addSource("volunteers", {
      //   type: "geojson",
      //   data: DUMMY_VOLUNTEERS,
      // });

      // map.current.addLayer({
      //   id: "volunteer-points",
      //   type: "circle",
      //   source: "volunteers",
      //   paint: {
      //     "circle-color": "#2ecc71",
      //     "circle-radius": 8,
      //     "circle-stroke-width": 2,
      //     "circle-stroke-color": "#fff",
      //   },
      // });
console.log("Map Loaded");
      setMapReady(true);
    });

    return () => map.current?.remove();
  }, []);

  /* -------- AUTO USER LOCATION (NO CLICK REQUIRED) -------- */

useEffect(() => {
  if (!navigator.geolocation || !map.current) return;

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lng = pos.coords.longitude;
      const lat = pos.coords.latitude;

      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
      }

      const el = document.createElement("div");
      el.style.width = "16px";
      el.style.height = "16px";
      el.style.borderRadius = "50%";
      el.style.background = "#007aff";
      el.style.border = "2px solid white";
      el.style.boxShadow = "0 0 6px rgba(0,0,0,0.4)";

      userMarkerRef.current = new maplibregl.Marker(el)
        .setLngLat([lng, lat])
        .addTo(map.current);

      map.current.flyTo({ center: [lng, lat], zoom: 13 });
      // 🔴 ADD NEARBY VOLUNTEERS (MOCK)
map.current.flyTo({ center: [lng, lat], zoom: 13 });

/* 🔴 NEARBY VOLUNTEERS */
MOCK_VOLUNTEERS.forEach((v) => {
  const vLat = lat + v.latOffset;
  const vLng = lng + v.lngOffset;

  if (getDistanceKm(lat, lng, vLat, vLng) <= 5) {
    new maplibregl.Marker({ color: "red" })
      .setLngLat([vLng, vLat])
      .addTo(map.current);
  }
});

/* 🟢 NEARBY CONTACTS */
MOCK_CONTACTS.forEach((c) => {
  const cLat = lat + c.latOffset;
  const cLng = lng + c.lngOffset;

  if (getDistanceKm(lat, lng, cLat, cLng) <= 5) {
    new maplibregl.Marker({ color: "green" })
      .setLngLat([cLng, cLat])
      .addTo(map.current);
  }
});

    },
    (err) => {
      console.warn("Location error:", err);
      alert("Location permission denied or unavailable");
    },
    { enableHighAccuracy: true }
  );
}, []);


  /* -------- HEATMAP TOGGLE -------- */

  // useEffect(() => {
  //   if (!mapReady) return;
  //   map.current.setLayoutProperty(
  //     "incidents-heat",
  //     "visibility",
  //     showHeat ? "visible" : "none"
  //   );
  // }, [showHeat, mapReady]);

  /* -------- VOLUNTEER TOGGLE -------- */

  // useEffect(() => {
  //   if (!mapReady) return;
  //   map.current.setLayoutProperty(
  //     "volunteer-points",
  //     "visibility",
  //     toggleVolunteers ? "visible" : "none"
  //   );
  // }, [toggleVolunteers, mapReady]);

  /* -------- RENDER -------- */

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "100vh" }}
    />
  );
}
