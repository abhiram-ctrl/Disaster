// src/App.jsx
import { useState } from "react";
import Map from "./components/Map";
import TestSOS from "./pages/TestSOS";
import LocalEmit from "./pages/LocalEmit";
import Admin from "./pages/Admin";
import VolunteerSignup from "./pages/VolunteerSignup";



export default function App() {
  const [page, setPage] = useState("map");
  const [showHeat, setShowHeat] = useState(false);
  const [toggleVol, setToggleVol] = useState(true);

  return (
    <>
      {/* NAVIGATION BAR */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          display: "flex",
          gap: "12px",
          background: "white",
          padding: "10px 14px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
          zIndex: 2000,
        }}
      >
        <button onClick={() => setPage("admin")}>🛠 Admin</button>
<button onClick={() => setPage("volSignup")}>🤝 Volunteer Signup</button>

        <button onClick={() => setPage("emit")}>🟡 Emit Events</button>
        <button onClick={() => setPage("map")}>🌍 Map</button>
        <button onClick={() => setPage("testSOS")}>🚨 Test SOS</button>

        <button onClick={() => setShowHeat((prev) => !prev)}>
          🔥 {showHeat ? "Hide Heatmap" : "Show Heatmap"}
        </button>

        <button onClick={() => setToggleVol((prev) => !prev)}>
          👥 {toggleVol ? "Hide Volunteers" : "Show Volunteers"}
        </button>
      </div>

      {/* PAGE CONTENT */}
      <div style={{ width: "100%", height: "100vh" }}>
        {page === "map" && (
          <Map showHeat={showHeat} toggleVolunteers={toggleVol} />
        )}

        {page === "testSOS" && <TestSOS />}
{page === "admin" && <Admin />}
{page === "volSignup" && <VolunteerSignup />}


        {/* THIS WAS MISSING — NOW ADDED */}
        {page === "emit" && <LocalEmit />}
      </div>
    </>
  );
}
