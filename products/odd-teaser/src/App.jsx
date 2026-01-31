import React, { useState, useEffect, useCallback } from "react";
import {
  trackArtifactCreated,
  trackArtifactExported,
  setArtifactCountRef,
} from "./utils/telemetry";
import { exportArtifacts } from "./utils/export";

/**
 * Odd Teaser — Single-Session Epistemic Experience (PRD v1.1)
 *
 * Entry-State Behavioral Contract:
 * - On first load, behave as a thinking space, NOT an artifact editor
 * - Communicate: nothing is committed yet, messy thinking is allowed
 * - Artifact systems remain DORMANT until explicitly consented
 *
 * If a user hesitates due to fear of "doing it wrong," the entry state has failed.
 */

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const ARTIFACT_TYPES = [
  {
    id: "learning",
    label: "Learning",
    emoji: "💡",
    description: "Something you realized or discovered",
  },
  {
    id: "decision",
    label: "Decision",
    emoji: "📋",
    description: "A choice you're committing to",
  },
  {
    id: "override",
    label: "Override",
    emoji: "⚡",
    description: "A default behavior that needs to change",
  },
];

function App() {
  const [artifacts, setArtifacts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showCommitOptions, setShowCommitOptions] = useState(false);

  // Keep telemetry ref updated
  useEffect(() => {
    setArtifactCountRef(artifacts.length);
  }, [artifacts.length]);

  // Create artifact
  const createArtifact = useCallback(
    (type) => {
      if (!inputValue.trim()) return;

      const artifact = {
        id: generateId(),
        type: type.id,
        content: inputValue.trim(),
        createdAt: new Date().toISOString(),
      };

      setArtifacts((prev) => [artifact, ...prev]);
      setInputValue("");
      setShowCommitOptions(false);

      trackArtifactCreated(type.id);
    },
    [inputValue]
  );

  // Delete artifact
  const deleteArtifact = useCallback((id) => {
    setArtifacts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  // Export all artifacts
  const handleExport = useCallback(() => {
    if (artifacts.length === 0) return;
    const types = [...new Set(artifacts.map((a) => a.type))];
    exportArtifacts(artifacts);
    trackArtifactExported(artifacts.length, types);
  }, [artifacts]);

  // Consent to show artifact options
  const handleReadyToCommit = () => {
    if (inputValue.trim()) {
      setShowCommitOptions(true);
    }
  };

  return (
    <div className="app">
      {/* Primary Surface — Thinking Space */}
      <main className="thinking-space">
        <header className="header">
          <h1>What's on your mind?</h1>
          <p className="subtitle">
            Write freely. Nothing is committed until you say so.
          </p>
        </header>

        <div className="input-container">
          <textarea
            className="thinking-input"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (!e.target.value.trim()) {
                setShowCommitOptions(false);
              }
            }}
            placeholder="Start writing... messy is fine."
            aria-label="Your thoughts"
            autoFocus
          />

          {/* Artifact commit options — DORMANT until consented */}
          <div className="commit-area">
            {!showCommitOptions ? (
              <button
                className="ready-btn"
                onClick={handleReadyToCommit}
                disabled={!inputValue.trim()}
              >
                {inputValue.trim()
                  ? "Ready to commit this as an artifact →"
                  : "Write something first..."}
              </button>
            ) : (
              <div className="commit-options">
                <p className="commit-prompt">What kind of artifact is this?</p>
                <div className="artifact-type-buttons">
                  {ARTIFACT_TYPES.map((type) => (
                    <button
                      key={type.id}
                      className={`artifact-type-btn ${type.id}`}
                      onClick={() => createArtifact(type)}
                    >
                      <span className="type-emoji">{type.emoji}</span>
                      <span className="type-label">{type.label}</span>
                      <span className="type-desc">{type.description}</span>
                    </button>
                  ))}
                </div>
                <button
                  className="cancel-btn"
                  onClick={() => setShowCommitOptions(false)}
                >
                  ← Keep writing
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Secondary Surface — Artifact Drawer (visible only when artifacts exist) */}
      {artifacts.length > 0 && (
        <aside className="artifact-drawer">
          <div className="drawer-header">
            <h2>Your Artifacts</h2>
            <span className="artifact-count">{artifacts.length}</span>
          </div>

          <div className="artifacts-list">
            {artifacts.map((artifact) => {
              const type = ARTIFACT_TYPES.find((t) => t.id === artifact.type);
              return (
                <div key={artifact.id} className="artifact-card">
                  <div className="artifact-card-header">
                    <span className={`artifact-type-badge ${artifact.type}`}>
                      {type?.emoji} {type?.label}
                    </span>
                    <button
                      className="artifact-delete-btn"
                      onClick={() => deleteArtifact(artifact.id)}
                      aria-label="Delete artifact"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="artifact-content">{artifact.content}</div>
                  <div className="artifact-timestamp">
                    {new Date(artifact.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="drawer-footer">
            <button className="export-btn" onClick={handleExport}>
              Export & Leave →
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}

export default App;
