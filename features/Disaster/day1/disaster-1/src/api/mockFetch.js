// src/api/mockFetch.js
// Simple mock API (returns arrays used by Map.jsx refresh)
export async function fetchIncidents() {
  // demo: return incidents with severity (0..5) and coords [lng, lat]
  return [
    { id: 1, title: "Flooded Area", severity: 3, coords: [78.5, 17.4] },
    { id: 2, title: "Road Block", severity: 2, coords: [80.1, 16.5] },
    { id: 3, title: "Medical Emergency", severity: 5, coords: [77.6, 12.9] },
    { id: 4, title: "Collapsed Building", severity: 4, coords: [77.2, 13.5] }
  ];
}

export async function fetchVolunteers() {
  return [
    { id: "v1", name: "Volunteer A", phone: "+91-9000000001", coords: [77.0, 28.6] },
    { id: "v2", name: "Volunteer B", phone: "+91-9000000002", coords: [78.3, 17.4] }
  ];
}
