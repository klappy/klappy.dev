// ============================================
// ODD TEASER — Thinking Companion
// PRD v1.1 Implementation (Attempt 002)
//
// CRITICAL CHANGE FROM ATTEMPT-001:
// - Real Claude API for artifact detection (NOT regex)
// - Cloudflare Pages Function at /api/chat
// - Genuine companion responses with understanding
// ============================================

const state = {
  artifacts: [],
  pendingDetection: null,
  conversationHistory: [],
  isLoading: false
};

// API endpoint for Claude
const API_ENDPOINT = '/api/chat';

// Telemetry (console-only, no PII)
function emitTelemetry(name, payload) {
  console.log('[Telemetry]', { name, payload, timestamp: new Date().toISOString() });
}

// Call Claude API via Cloudflare Function
async function callClaudeAPI(message) {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message,
      history: state.conversationHistory.slice(-10) // Last 10 messages for context
    })
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

// Add message to conversation
function addMessage(content, isCompanion = false, isDetection = false, artifact = null) {
  const conversation = document.getElementById('conversation');
  const msg = document.createElement('div');
  msg.className = `message ${isCompanion ? 'companion' : 'user'}${isDetection ? ' detection' : ''}`;

  if (isDetection && artifact) {
    msg.innerHTML = `
      <p>${content}</p>
      <div class="detection-actions">
        <button class="capture-btn" onclick="captureArtifact()">Yes, capture it</button>
        <button class="decline-btn" onclick="declineCapture()">No, keep writing</button>
      </div>
    `;
  } else {
    msg.innerHTML = `<p>${escapeHtml(content)}</p>`;
  }

  conversation.appendChild(msg);
  conversation.scrollTop = conversation.scrollHeight;

  // Store in history (for context in API calls)
  state.conversationHistory.push({ content, isCompanion });
}

// Show loading indicator
function showLoading() {
  const conversation = document.getElementById('conversation');
  const loading = document.createElement('div');
  loading.id = 'loading-indicator';
  loading.className = 'message companion loading';
  loading.innerHTML = '<p>...</p>';
  conversation.appendChild(loading);
  conversation.scrollTop = conversation.scrollHeight;
}

// Hide loading indicator
function hideLoading() {
  const loading = document.getElementById('loading-indicator');
  if (loading) {
    loading.remove();
  }
}

// Handle user input
async function handleSend() {
  const input = document.getElementById('user-input');
  const text = input.value.trim();

  if (!text || state.isLoading) return;

  // Add user message
  addMessage(text, false);
  input.value = '';
  updateSendButton();

  // Show loading and disable input
  state.isLoading = true;
  showLoading();
  input.disabled = true;

  try {
    // Call Claude API for real LLM detection
    const result = await callClaudeAPI(text);

    hideLoading();

    if (result.error && result.fallback) {
      // API key not configured - show fallback response
      console.warn('Claude API not configured, using fallback');
      addMessage(result.response, true);
    } else if (result.artifact) {
      // Artifact detected - surface for consent
      state.pendingDetection = {
        type: result.artifact.type,
        content: result.artifact.detected_content || text
      };
      addMessage(result.artifact.surface_prompt, true, true, result.artifact);
    } else if (result.response) {
      // Regular companion response
      addMessage(result.response, true);
    }
  } catch (error) {
    console.error('API call failed:', error);
    hideLoading();
    // Graceful degradation - still allow the app to function
    addMessage("I hear you.", true);
  } finally {
    state.isLoading = false;
    input.disabled = false;
    input.focus();
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
  btn.disabled = !input.value.trim() || state.isLoading;
}

// Event listeners
document.getElementById('user-input').addEventListener('input', updateSendButton);
document.getElementById('user-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey && !state.isLoading) {
    e.preventDefault();
    handleSend();
  }
});
document.getElementById('send-btn').addEventListener('click', handleSend);
document.getElementById('export-btn').addEventListener('click', exportArtifacts);

// Make functions available globally for onclick handlers
window.captureArtifact = captureArtifact;
window.declineCapture = declineCapture;

// Handle premature exit (for telemetry only)
window.addEventListener('beforeunload', () => {
  if (state.artifacts.length > 0) {
    emitTelemetry('PrematureExit', { artifact_count: state.artifacts.length });
  }
});
