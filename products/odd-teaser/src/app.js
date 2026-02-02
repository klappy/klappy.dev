// ============================================
// ODD TEASER — Thinking Companion
// PRD v1.2 Implementation
//
// REAL CLAUDE API INTEGRATION
// - No regex pattern matching
// - LLM-based artifact detection
// - Cloudflare Worker proxy at /api/chat
// ============================================

const state = {
  artifacts: [],
  pendingDetection: null,
  conversationHistory: [],
  isLoading: false
};

// API endpoint (relative URL, works on same origin)
const API_ENDPOINT = '/api/chat';

// Telemetry (console-only, no PII)
function emitTelemetry(name, payload) {
  console.log('[Telemetry]', { name, payload, timestamp: new Date().toISOString() });
}

// Call API for thinking companion response
async function getCompanionResponse(userText) {
  // Build messages array
  const messages = state.conversationHistory
    .filter(m => !m.isDetection) // Exclude detection prompts from history
    .map(m => ({
      role: m.isCompanion ? 'assistant' : 'user',
      content: m.content
    }));

  // Add the new user message, with consent context if pending
  let messageContent = userText;
  if (state.pendingDetection) {
    messageContent = `[CONTEXT: User was just asked if they want to capture a ${state.pendingDetection.type}. Their response:] ${userText}`;
  }

  messages.push({
    role: 'user',
    content: messageContent
  });

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messages })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API response error:', response.status, errorData);

      if (response.status === 429) {
        return {
          type: 'error',
          response: `Taking a breather. Try again in ${errorData.retryAfter || 60} seconds.`
        };
      }

      // Show detailed error for debugging
      const details = errorData.details || errorData.error || `Status ${response.status}`;
      return {
        type: 'error',
        response: `API Error: ${details}`
      };
    }

    return await response.json();

  } catch (error) {
    console.error('API error:', error);
    return {
      type: 'error',
      response: `Error: ${error.message}`
    };
  }
}

// Add message to conversation
function addMessage(content, isCompanion = false, isDetection = false) {
  const conversation = document.getElementById('conversation');
  const msg = document.createElement('div');
  msg.className = `message ${isCompanion ? 'companion' : 'user'}${isDetection ? ' detection' : ''}`;

  if (isDetection) {
    msg.innerHTML = `
      <p>${escapeHtml(content)}</p>
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

  state.conversationHistory.push({ content, isCompanion, isDetection });
}

// Add loading indicator
function showLoading() {
  state.isLoading = true;
  const conversation = document.getElementById('conversation');
  const loader = document.createElement('div');
  loader.id = 'loading-indicator';
  loader.className = 'message companion loading';
  loader.innerHTML = '<p><span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></p>';
  conversation.appendChild(loader);
  conversation.scrollTop = conversation.scrollHeight;
}

// Remove loading indicator
function hideLoading() {
  state.isLoading = false;
  const loader = document.getElementById('loading-indicator');
  if (loader) {
    loader.remove();
  }
}

// Handle user input - LLM handles all interpretation, no hardcoded matching
async function handleSend() {
  const input = document.getElementById('user-input');
  const text = input.value.trim();

  if (!text || state.isLoading) return;

  // Add user message
  addMessage(text, false);
  input.value = '';
  updateSendButton();

  // Show loading state
  showLoading();

  // Get response from LLM (it handles consent/decline detection)
  const response = await getCompanionResponse(text);

  // Hide loading
  hideLoading();

  // Handle response based on type
  if (response.type === 'artifact_detected') {
    // Store pending detection for capture
    state.pendingDetection = {
      type: response.artifact_type,
      content: text
    };
    // Surface the detection for consent
    addMessage(response.response, true, true);

  } else if (response.type === 'consent') {
    // LLM recognized user consented - capture the pending artifact
    if (state.pendingDetection) {
      captureArtifact();
    } else {
      addMessage(response.response, true);
    }

  } else if (response.type === 'decline') {
    // LLM recognized user declined
    declineCapture();

  } else if (response.type === 'response') {
    // Normal companion response - clear any stale pending detection
    if (state.pendingDetection) {
      // User moved on without consenting/declining
      state.pendingDetection = null;
      const detectionMsg = document.querySelector('.message.detection');
      if (detectionMsg) {
        detectionMsg.classList.remove('detection');
        const actions = detectionMsg.querySelector('.detection-actions');
        if (actions) actions.remove();
      }
    }
    addMessage(response.response, true);

  } else if (response.type === 'error') {
    addMessage(response.response, true);

  } else {
    addMessage(response.response || 'I\'m listening.', true);
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
    addMessage("Got it. What else?", true);
  }, 300);
}

// Decline capture (user rejected)
function declineCapture() {
  state.pendingDetection = null;

  // Remove detection message actions
  const detectionMsg = document.querySelector('.message.detection');
  if (detectionMsg) {
    detectionMsg.classList.remove('detection');
    detectionMsg.innerHTML = `<p>Okay, continuing.</p>`;
  }
}

// Show artifact drawer
function showArtifactDrawer() {
  const drawer = document.getElementById('artifact-drawer');
  drawer.classList.remove('hidden');
}

// Hide artifact drawer
function hideArtifactDrawer() {
  const drawer = document.getElementById('artifact-drawer');
  drawer.classList.add('hidden');
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
    addMessage("Nothing to export yet.", true);
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

// Make functions globally accessible for onclick handlers
window.captureArtifact = captureArtifact;
window.declineCapture = declineCapture;

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
document.getElementById('close-drawer-btn').addEventListener('click', hideArtifactDrawer);

// Handle premature exit (for telemetry only)
window.addEventListener('beforeunload', () => {
  if (state.artifacts.length > 0) {
    emitTelemetry('PrematureExit', { artifact_count: state.artifacts.length });
  }
});
