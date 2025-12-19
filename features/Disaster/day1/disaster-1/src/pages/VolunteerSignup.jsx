import { useState } from "react";

export default function VolunteerSignup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !phone) {
      alert("Please fill all fields");
      return;
    }

    const volunteer = {
      id: "vol-" + Date.now(),
      name,
      phone,
      verified: false,
      coords: [78.9629, 20.5937], // default (can improve later)
    };

    const pending = JSON.parse(localStorage.getItem("pendingVolunteers") || "[]");
    pending.push(volunteer);
    localStorage.setItem("pendingVolunteers", JSON.stringify(pending));

    setStatus("Submitted for admin verification");
    setName("");
    setPhone("");
  }

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h2>🤝 Volunteer Signup</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />
        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />
        <button type="submit">Submit</button>
      </form>

      <p style={{ marginTop: 10 }}>{status}</p>
    </div>
  );
}
