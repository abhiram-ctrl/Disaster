import localforage from "localforage";

localforage.config({
  name: "disaster-guardian",
  storeName: "sos_queue",
});

export async function queueSOS(data) {
  const list = (await localforage.getItem("sosQueue")) || [];
  list.push(data);
  await localforage.setItem("sosQueue", list);
}

export async function getQueuedSOS() {
  return (await localforage.getItem("sosQueue")) || [];
}

export async function flushQueue() {
  const list = (await localforage.getItem("sosQueue")) || [];
  if (list.length === 0) {
    return { sent: 0, remaining: 0 };
  }

  let remaining = [];
  let sent = 0;

  for (const item of list) {
    try {
      // MOCK SEND (replace with real API later)
      console.log("Sending SOS to server:", item);
      sent++;
    } catch (e) {
      remaining.push(item);
    }
  }

  await localforage.setItem("sosQueue", remaining);
  return { sent, remaining: remaining.length };
}

/* 🔥 AUTO FLUSH WHEN INTERNET RETURNS */
window.addEventListener("online", async () => {
  console.log("Internet back — auto flushing SOS queue");
  await flushQueue();
});
