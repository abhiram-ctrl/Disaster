// src/pages/LocalEmit.jsx
import { useState } from "react";

function appendFeatureToSource(srcName, feature) {
  if (!window._DG_map) return alert("Map not ready yet.");
  const src = window._DG_map.getSource(srcName);
  if (!src) return alert("Source not found: " + srcName);

  const current = src._data?.features ?? [];
  const updated = {
    type: "FeatureCollection",
    features: [...current, feature]
  };

  src.setData(updated);

  // update global refs
  if (srcName === "incidents") window._DG_incidents = updated;
  if (srcName === "volunteers") window._DG_volunteers = updated;
}

export default function LocalEmit() {
  const [incTitle, setIncTitle] = useState("");
  const [incLng, setIncLng] = useState(78.5);
  const [incLat, setIncLat] = useState(17.4);
  const [sev, setSev] = useState(3);

  const [volName, setVolName] = useState("");
  const [volLng, setVolLng] = useState(77.2);
  const [volLat, setVolLat] = useState(28.6);

  function addIncident() {
    const feature = {
      type: "Feature",
      properties: { id: "local-" + Date.now(), title: incTitle, severity: Number(sev) },
      geometry: { type: "Point", coordinates: [Number(incLng), Number(incLat)] }
    };
    appendFeatureToSource("incidents", feature);
    alert("Incident added to map!");
  }

  function addVolunteer() {
    const feature = {
      type: "Feature",
      properties: { id: "v-" + Date.now(), name: volName, phone: "N/A" },
      geometry: { type: "Point", coordinates: [Number(volLng), Number(volLat)] }
    };
    appendFeatureToSource("volunteers", feature);
    alert("Volunteer added to map!");
  }

  return (
    <div style={{ padding: 20, maxWidth: 700 }}>
      <h2>Local Realtime Simulator</h2>
      <p>Use this to add incidents or volunteers to the map without a server.</p>

      <div style={{ padding: 12, border: "1px solid #ddd", marginBottom: 16 }}>
        <h3>Add Incident</h3>
        <input placeholder="Title" value={incTitle} onChange={e => setIncTitle(e.target.value)} />
        <br /><br />
        Lng: <input value={incLng} onChange={e => setIncLng(e.target.value)} />
        Lat: <input value={incLat} onChange={e => setIncLat(e.target.value)} />
        <br /><br />
        Severity: <input type="number" min="1" max="5" value={sev} onChange={e => setSev(e.target.value)} />
        <br /><br />
        <button onClick={addIncident}>Add Incident</button>
      </div>

      <div style={{ padding: 12, border: "1px solid #ddd" }}>
        <h3>Add Volunteer</h3>
        <input placeholder="Name" value={volName} onChange={e => setVolName(e.target.value)} />
        <br /><br />
        Lng: <input value={volLng} onChange={e => setVolLng(e.target.value)} />
        Lat: <input value={volLat} onChange={e => setVolLat(e.target.value)} />
        <br /><br />
        <button onClick={addVolunteer}>Add Volunteer</button>
      </div>
    </div>
  );
}
