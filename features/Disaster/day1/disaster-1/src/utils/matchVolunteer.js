export function matchVolunteer(incident, volunteers) {
  // severity: 1–5
  if (incident.severity >= 4) {
    return volunteers.find(v => v.available);
  }

  if (incident.severity >= 2) {
    return volunteers[0];
  }

  return null;
}
