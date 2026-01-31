/**
 * Telemetry — ODD-Safe Event Tracking
 *
 * Allowed events (per PRD):
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

let artifactCountRef = 0;

export function setArtifactCountRef(count) {
  artifactCountRef = count;
}

export function trackArtifactCreated(type) {
  const event = {
    name: "ArtifactCreated",
    payload: { type },
    timestamp: new Date().toISOString(),
  };
  console.log("[Telemetry]", event);
  // Future: send to analytics endpoint
}

export function trackArtifactExported(count, types) {
  const event = {
    name: "ArtifactExported",
    payload: { count, types },
    timestamp: new Date().toISOString(),
  };
  console.log("[Telemetry]", event);
}

export function trackIncisionTriggered(reason) {
  const event = {
    name: "IncisionTriggered",
    payload: { reason },
    timestamp: new Date().toISOString(),
  };
  console.log("[Telemetry]", event);
}

// Track premature exit (page unload with artifacts)
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    if (artifactCountRef > 0) {
      const event = {
        name: "PrematureExit",
        payload: { artifact_count: artifactCountRef },
        timestamp: new Date().toISOString(),
      };
      console.log("[Telemetry]", event);
      // Future: beacon to analytics endpoint
    }
  });
}
