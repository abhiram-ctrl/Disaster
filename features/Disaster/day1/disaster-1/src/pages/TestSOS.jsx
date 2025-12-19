import { useState } from "react";
import { startListening } from "../features/voice";
import { queueSOS, flushQueue, getQueuedSOS } from "../features/offline";

export default function TestSOS() {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  /* 🔔 SEND SOS */
  async function handleSend() {
    if (loading) return;
    if (!description.trim()) {
      alert("Please enter SOS description");
      return;
    }

    setLoading(true);

    let coords = { lat: 20.5937, lng: 78.9629 }; // default India

    try {
      const pos = await new Promise((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, {
          enableHighAccuracy: true,
          timeout: 8000,
        })
      );
      coords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
    } catch (e) {
      console.warn("Location fallback used");
    }

    const payload = {
      description,
      location: coords,
      timestamp: Date.now(),
    };

    try {
      if (!navigator.onLine) {
        await queueSOS(payload);
        setStatus("📦 Queued (offline)");
      } else {
        // mock send (replace with real API later)
        console.log("SOS SENT:", payload);
        setStatus("✅ SOS sent successfully");
      }
    } catch (e) {
      await queueSOS(payload);
      setStatus("📦 Queued (error sending)");
    }

    setLoading(false);
    setDescription("");
  }

  /* 🎤 VOICE INPUT (ONLINE ONLY) */
  function handleVoice() {
    if (!navigator.onLine) {
      alert("Voice input requires internet");
      return;
    }

    try {
      startListening(
        (text) => setDescription(text),
        (err) => {
          console.error(err);
          alert("Voice permission denied or unavailable");
        }
      );
    } catch (e) {
      alert("Speech recognition not supported");
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 700 }}>
      <h2>🚨 Test SOS</h2>

      <textarea
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe the emergency situation"
        style={{
          width: "100%",
          padding: 10,
          fontSize: 14,
        }}
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={handleVoice} disabled={!navigator.onLine}>
          🎤 Voice
        </button>

        <button
          onClick={handleSend}
          disabled={loading}
          style={{ marginLeft: 10 }}
        >
          {loading ? "Sending..." : "Send SOS"}
        </button>

        <button
          onClick={async () => {
            const res = await flushQueue();
            setStatus(
              `🔁 Flush done | sent=${res.sent}, remaining=${res.remaining}`
            );
          }}
          style={{ marginLeft: 10 }}
        >
          Flush Queue
        </button>

        <button
          onClick={async () => {
            const q = await getQueuedSOS();
            setStatus(`📦 Queued SOS count: ${q.length}`);
          }}
          style={{ marginLeft: 10 }}
        >
          Show Queue
        </button>
      </div>

      <div style={{ marginTop: 15, fontWeight: "bold" }}>
        Status: {status}
      </div>

      <p style={{ marginTop: 10, color: "#555" }}>
        ℹ️ Note:  
        <br />• Voice input works only when internet is available  
        <br />• SOS is safely queued when offline and auto-sent later
      </p>
    </div>
  );
}
