/**
 * Telemetry — ODD-Safe Event Tracking
 *
 * Allowed events (from PRD):
 * - ArtifactCreated { type }
 * - ArtifactExported { count, types }
 * - IncisionTriggered { reason }
 * - PrematureExit { artifact_count }
 *
 * Forbidden:
 * - Raw text
 * - Prompts
 * - Responses
 * - Identity
 * - IP
 * - Fingerprinting
 *
 * Telemetry measures epistemic motion, not users.
 */

const TELEMETRY_ENABLED = false; // No backend yet — log to console for now

function emit(event, payload) {
  const timestamp = new Date().toISOString();
  const data = { event, payload, timestamp };

  if (TELEMETRY_ENABLED) {
    // Future: send to analytics endpoint
    // fetch('/api/telemetry', { method: 'POST', body: JSON.stringify(data) });
  }

  // Development: log to console
  console.log("[Telemetry]", data);
}

export function trackArtifactCreated(type) {
  emit("ArtifactCreated", { type });
}

export function trackArtifactExported(count, types) {
  emit("ArtifactExported", { count, types });
}

export function trackIncisionTriggered(reason) {
  emit("IncisionTriggered", { reason });
}

export function trackPrematureExit(artifactCount) {
  emit("PrematureExit", { artifact_count: artifactCount });
}

// Track premature exit on page unload
let artifactCountRef = 0;

export function setArtifactCountRef(count) {
  artifactCountRef = count;
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    // Only track if there are artifacts (user did something)
    if (artifactCountRef > 0) {
      trackPrematureExit(artifactCountRef);
    }
  });
}
