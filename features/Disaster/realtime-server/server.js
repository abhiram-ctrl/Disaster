// realtime-server/server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// When a client connects
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

/*  
   🚨 EMIT ROUTES
   These are API endpoints you can call (using curl / Postman)
   and the server will broadcast real-time events to the frontend.
*/

/* 1️⃣ NEW INCIDENT */
app.post("/emit/new-incident", (req, res) => {
  const payload = req.body || {};
  io.emit("new-incident", payload);
  console.log("EMIT → new-incident:", payload);
  res.json({ status: "ok", event: "new-incident", payload });
});

/* 2️⃣ INCIDENT UPDATED */
app.post("/emit/incident-updated", (req, res) => {
  const payload = req.body || {};
  io.emit("incident-updated", payload);
  console.log("EMIT → incident-updated:", payload);
  res.json({ status: "ok", event: "incident-updated", payload });
});

/* 3️⃣ NEW VOLUNTEER */
app.post("/emit/new-volunteer", (req, res) => {
  const payload = req.body || {};
  io.emit("new-volunteer", payload);
  console.log("EMIT → new-volunteer:", payload);
  res.json({ status: "ok", event: "new-volunteer", payload });
});

/* 4️⃣ VOLUNTEER UPDATED */
app.post("/emit/volunteer-updated", (req, res) => {
  const payload = req.body || {};
  io.emit("volunteer-updated", payload);
  console.log("EMIT → volunteer-updated:", payload);
  res.json({ status: "ok", event: "volunteer-updated", payload });
});

// Testing route
app.get("/", (req, res) => {
  res.send("🔥 Realtime server running with Socket.IO");
});

// Server start
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`🚀 Realtime server listening on http://localhost:${PORT}`);
});
