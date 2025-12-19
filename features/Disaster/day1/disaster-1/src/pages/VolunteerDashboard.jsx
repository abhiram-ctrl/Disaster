import { useState } from "react";

export default function VolunteerDashboard() {
  const [available, setAvailable] = useState(true);

  function toggleStatus() {
    setAvailable(!available);
    localStorage.setItem("volunteerAvailable", !available);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>🧑‍🚒 Volunteer Dashboard</h2>

      <p>Status: <b>{available ? "Available" : "Busy"}</b></p>

      <button onClick={toggleStatus}>
        {available ? "Mark Busy" : "Mark Available"}
      </button>
    </div>
  );
}
