// ============================================
// ODD TEASER — Thinking Companion
// PRD v1.1 Implementation
//
// KEY CHANGE FROM PRIOR ATTEMPT:
// - NO manual categorization buttons
// - LLM-based artifact detection via pattern matching
// - Surfaces potential artifacts for user consent
// ============================================

const state = {
  artifacts: [],
  pendingDetection: null,
  conversationHistory: []
};

// Artifact type patterns (simulating LLM detection)
const ARTIFACT_PATTERNS = {
  learning: {
    patterns: [
      /\b(realized|discovered|learned|turns out|found out|the issue was|it became clear|now I see|I understand now|figured out)\b/i,
      /\b(ah[,!]|oh[,!]|aha)\b.*\b(that's|it's|this is)\b/i,
      /\bthe (real |actual )?(problem|issue|cause|reason) (is|was)\b/i
    ],
    surfaceText: "That sounds like something you learned. Want to capture it?"
  },
  decision: {
    patterns: [
      /\b(decided|choosing|going with|I('ll| will) go with|made the call|the choice is|opting for|picked|selected)\b/i,
      /\b(tradeoff|trade-off) is\b/i,
      /\bI'm going to\b.*\binstead of\b/i,
      /\b(after weighing|considering|given the options)\b/i
    ],
    surfaceText: "That reads like a decision. Want to capture it?"
  },
  override: {
    patterns: [
      /\b(actually|scratch that|correction|wrong about|take that back|on second thought|nevermind|I was wrong)\b/i,
      /\b(previous|earlier|before).*\b(wrong|incorrect|mistaken)\b/i,
      /\bupdating my (thinking|understanding|view)\b/i
    ],
    surfaceText: "That sounds like you're correcting something. Want to capture it as an override?"
  }
};

// Telemetry (console-only, no PII)
function emitTelemetry(name, payload) {
  console.log('[Telemetry]', { name, payload, timestamp: new Date().toISOString() });
}

// Detect artifact scent in text
function detectArtifactScent(text) {
  for (const [type, config] of Object.entries(ARTIFACT_PATTERNS)) {
    for (const pattern of config.patterns) {
      if (pattern.test(text)) {
        return { type, surfaceText: config.surfaceText };
      }
    }
  }
  return null;
}

// Add message to conversation
function addMessage(content, isCompanion = false, isDetection = false) {
  const conversation = document.getElementById('conversation');
  const msg = document.createElement('div');
  msg.className = `message ${isCompanion ? 'companion' : 'user'}${isDetection ? ' detection' : ''}`;

  if (isDetection) {
    msg.innerHTML = `
      <p>${content}</p>
      <div class="detection-actions">
        <button class="capture-btn" onclick="captureArtifact()">Yes, capture it</button>
        <button class="decline-btn" onclick="declineCapture()">No, keep writing</button>
      </div>
    `;
  } else {
    msg.innerHTML = `<p>${content}</p>`;
  }

  conversation.appendChild(msg);
  conversation.scrollTop = conversation.scrollHeight;

  state.conversationHistory.push({ content, isCompanion, isDetection });
}

// Companion response (non-directive)
function getCompanionResponse(userText, detection) {
  if (detection) {
    return detection.surfaceText;
  }

  // Reflective, non-directive responses
  const reflections = [
    "I hear you.",
    "Go on.",
    "What else?",
    "Mmm.",
    "Keep going if there's more."
  ];

  // Only respond sometimes to avoid over-engagement
  if (Math.random() > 0.4) {
    return reflections[Math.floor(Math.random() * reflections.length)];
  }
  return null;
}

// Handle user input
function handleSend() {
  const input = document.getElementById('user-input');
  const text = input.value.trim();

  if (!text) return;

  // Add user message
  addMessage(text, false);
  input.value = '';
  updateSendButton();

  // Detect artifact scent
  const detection = detectArtifactScent(text);

  if (detection) {
    state.pendingDetection = { type: detection.type, content: text };
    // Surface the detection for consent
    setTimeout(() => {
      addMessage(detection.surfaceText, true, true);
    }, 500);
  } else {
    // Non-directive companion response
    const response = getCompanionResponse(text, null);
    if (response) {
      setTimeout(() => {
        addMessage(response, true);
      }, 500);
    }
  }
}

// Capture artifact (user consented)
function captureArtifact() {
  if (!state.pendingDetection) return;

  const artifact = {
    id: Date.now(),
    type: state.pendingDetection.type,
    content: state.pendingDetection.content,
    capturedAt: new Date().toISOString()
  };

  state.artifacts.push(artifact);
  state.pendingDetection = null;

  // Emit telemetry
  emitTelemetry('ArtifactCreated', { type: artifact.type });

  // Remove detection message actions
  const detectionMsg = document.querySelector('.message.detection');
  if (detectionMsg) {
    detectionMsg.classList.remove('detection');
    detectionMsg.innerHTML = `<p>Captured as a ${artifact.type}.</p>`;
  }

  // Show artifact drawer
  showArtifactDrawer();
  renderArtifacts();

  // Brief confirmation
  setTimeout(() => {
    addMessage("What else is on your mind?", true);
  }, 300);
}

// Decline capture (user rejected)
function declineCapture() {
  state.pendingDetection = null;

  // Remove detection message actions
  const detectionMsg = document.querySelector('.message.detection');
  if (detectionMsg) {
    detectionMsg.classList.remove('detection');
    detectionMsg.innerHTML = `<p>Okay, let's keep going.</p>`;
  }
}

// Show artifact drawer
function showArtifactDrawer() {
  const drawer = document.getElementById('artifact-drawer');
  drawer.classList.remove('hidden');
}

// Render artifacts in drawer
function renderArtifacts() {
  const list = document.getElementById('artifact-list');
  list.innerHTML = state.artifacts.map(a => `
    <div class="artifact artifact-${a.type}">
      <span class="artifact-badge">${a.type}</span>
      <p class="artifact-content">${escapeHtml(a.content)}</p>
    </div>
  `).join('');
}

// Export artifacts as Markdown (local download)
function exportArtifacts() {
  if (state.artifacts.length === 0) {
    addMessage("Nothing to export yet. Write something first.", true);
    return;
  }

  const types = [...new Set(state.artifacts.map(a => a.type))];
  emitTelemetry('ArtifactExported', { count: state.artifacts.length, types });

  const markdown = generateMarkdown();
  downloadFile('artifacts.md', markdown);

  // Brief exit acknowledgment (no retention hooks)
  addMessage("Exported. Take care.", true);
}

// Generate Markdown export
function generateMarkdown() {
  const now = new Date().toISOString().split('T')[0];
  let md = `# Thinking Session — ${now}\n\n`;

  const grouped = {};
  state.artifacts.forEach(a => {
    if (!grouped[a.type]) grouped[a.type] = [];
    grouped[a.type].push(a);
  });

  for (const [type, artifacts] of Object.entries(grouped)) {
    md += `## ${capitalize(type)}s\n\n`;
    artifacts.forEach(a => {
      md += `- ${a.content}\n`;
    });
    md += '\n';
  }

  return md;
}

// Download file locally
function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Utilities
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function updateSendButton() {
  const input = document.getElementById('user-input');
  const btn = document.getElementById('send-btn');
  btn.disabled = !input.value.trim();
}

// Event listeners
document.getElementById('user-input').addEventListener('input', updateSendButton);
document.getElementById('user-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});
document.getElementById('send-btn').addEventListener('click', handleSend);
document.getElementById('export-btn').addEventListener('click', exportArtifacts);

// Handle premature exit (for telemetry only)
window.addEventListener('beforeunload', () => {
  if (state.artifacts.length > 0) {
    emitTelemetry('PrematureExit', { artifact_count: state.artifacts.length });
  }
});
