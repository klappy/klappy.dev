import React, { useState, useEffect, useCallback } from "react";
import {
  trackArtifactCreated,
  trackArtifactExported,
  setArtifactCountRef,
} from "./utils/telemetry";
import { exportArtifacts } from "./utils/export";

/**
 * Odd Teaser — Single-Session Epistemic Experience
 *
 * Purpose: Help a visitor externalize at least one epistemic artifact
 * and leave with something concrete.
 *
 * This product succeeds even if the user never returns.
 */

// Generate unique ID for artifacts
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// Artifact Types
const ARTIFACT_TYPES = [
  {
    id: "learning",
    label: "Learning",
    emoji: "💡",
    prompt: "What did you realize or discover?",
    placeholder: "I learned that...",
  },
  {
    id: "decision",
    label: "Decision",
    emoji: "📋",
    prompt: "What choice are you committing to?",
    placeholder: "I decided to...",
  },
  {
    id: "override",
    label: "Override",
    emoji: "⚡",
    prompt: "What default behavior needs to change?",
    placeholder: "Instead of the usual...",
  },
];

function App() {
  const [artifacts, setArtifacts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedType, setSelectedType] = useState(null);

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
      setSelectedType(null);

      // Telemetry
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

    // Gather types for telemetry
    const types = [...new Set(artifacts.map((a) => a.type))];

    exportArtifacts(artifacts);

    // Telemetry
    trackArtifactExported(artifacts.length, types);
  }, [artifacts]);

  // Get prompt message based on state
  const getPromptMessage = () => {
    if (selectedType) {
      const type = ARTIFACT_TYPES.find((t) => t.id === selectedType);
      return (
        <>
          <strong>{type.emoji} {type.label}:</strong> {type.prompt}
        </>
      );
    }

    if (artifacts.length === 0) {
      return (
        <>
          <strong>What have you been thinking about?</strong>
          <br />
          <br />
          Write something down, then capture it as a <strong>Learning</strong>,{" "}
          <strong>Decision</strong>, or <strong>Override</strong>.
          <br />
          <br />
          When you&apos;re done, export everything and take it with you.
        </>
      );
    }

    return (
      <>
        <strong>Keep going, or export and leave.</strong>
        <br />
        <br />
        You have {artifacts.length} artifact{artifacts.length !== 1 ? "s" : ""}.
        Capture more, or click Export to take them with you.
      </>
    );
  };

  return (
    <div className="app">
      {/* Primary Surface — Conversational Input */}
      <main className="primary-surface">
        <header className="header">
          <h1>Externalize an Artifact</h1>
          <p>Write it down. Name it. Take it with you.</p>
        </header>

        <div className="conversation-area">
          <div className="prompt-message">
            <p>{getPromptMessage()}</p>
          </div>
        </div>

        <div className="input-area">
          <div className="input-wrapper">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                selectedType
                  ? ARTIFACT_TYPES.find((t) => t.id === selectedType)?.placeholder
                  : "Start writing..."
              }
              aria-label="Artifact content"
            />
            <div className="input-actions">
              {ARTIFACT_TYPES.map((type) => (
                <button
                  key={type.id}
                  className={`artifact-type-btn ${type.id}`}
                  onClick={() => {
                    if (inputValue.trim()) {
                      createArtifact(type);
                    } else {
                      setSelectedType(type.id);
                    }
                  }}
                  aria-label={`Create ${type.label}`}
                >
                  <span>{type.emoji}</span>
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Secondary Surface — Artifact Drawer */}
      <aside className="artifact-drawer">
        <div className="drawer-header">
          <h2>Artifacts</h2>
          <span className="artifact-count">{artifacts.length}</span>
        </div>

        <div className="artifacts-list">
          {artifacts.length === 0 ? (
            <div className="empty-state">
              <p>No artifacts yet. Write something and capture it.</p>
            </div>
          ) : (
            artifacts.map((artifact) => {
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
            })
          )}
        </div>

        <div className="drawer-footer">
          <button
            className="export-btn"
            onClick={handleExport}
            disabled={artifacts.length === 0}
          >
            Export Markdown
          </button>
        </div>
      </aside>
    </div>
  );
}

export default App;
