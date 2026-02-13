/**
 * Fluent Mobile PoC - Core Audio Logic
 * 
 * Minimal implementation for hypothesis testing:
 * - H2: Performance on low-end devices
 * - H3: Workflow usability (listen → record → playback)
 * - H4: Task clarity without training
 * 
 * NO: authentication, sync, comments, multi-track, editing
 */

(function() {
  'use strict';

  // ============================================
  // State
  // ============================================
  
  const state = {
    currentState: 'idle', // idle, listening, recording, playing
    sourceAudio: null,
    recordedBlob: null,
    recordedUrl: null,
    mediaRecorder: null,
    recordingChunks: [],
    recordingStartTime: null,
    recordingTimerId: null
  };

  // ============================================
  // DOM Elements
  // ============================================
  
  const elements = {
    status: document.getElementById('status'),
    stateIndicator: document.getElementById('state-indicator'),
    stateText: document.getElementById('state-text'),
    
    // Source
    playSourceBtn: document.getElementById('play-source'),
    sourceProgress: document.querySelector('#source-progress .progress-fill'),
    
    // Recording
    recordBtn: document.getElementById('record-btn'),
    recordLabel: document.getElementById('record-label'),
    recordingIndicator: document.getElementById('recording-indicator'),
    recordingTime: document.getElementById('recording-time'),
    
    // Playback
    playDraftBtn: document.getElementById('play-draft'),
    draftProgress: document.querySelector('#draft-progress .progress-fill'),
    noDraftMsg: document.getElementById('no-draft-msg')
  };

  // ============================================
  // State Management
  // ============================================
  
  function setState(newState) {
    state.currentState = newState;
    elements.stateIndicator.dataset.state = newState;
    
    const stateMessages = {
      idle: 'Ready to listen',
      listening: 'Listening to source...',
      recording: 'Recording your draft...',
      playing: 'Playing your draft...'
    };
    
    elements.stateText.textContent = stateMessages[newState] || 'Ready';
    elements.status.textContent = stateMessages[newState] || 'Ready';
  }

  // ============================================
  // Source Audio (Demo)
  // ============================================
  
  // For PoC: Generate a simple tone as source audio
  // In production: This would be actual scripture audio
  function createDemoSourceAudio() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const duration = 3; // 3 seconds
    const sampleRate = audioContext.sampleRate;
    const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);
    
    // Simple sine wave at 440Hz (A4 note)
    for (let i = 0; i < buffer.length; i++) {
      // Fade in/out to avoid clicks
      const envelope = Math.min(i / (sampleRate * 0.1), 1, (buffer.length - i) / (sampleRate * 0.1));
      data[i] = Math.sin(2 * Math.PI * 440 * i / sampleRate) * 0.3 * envelope;
    }
    
    return { audioContext, buffer };
  }

  let sourceAudioContext = null;
  let sourceBuffer = null;
  let sourceNode = null;

  function playSourceAudio() {
    // Stop any current playback
    stopAllAudio();
    
    if (!sourceAudioContext) {
      const demo = createDemoSourceAudio();
      sourceAudioContext = demo.audioContext;
      sourceBuffer = demo.buffer;
    }
    
    // Resume context if suspended (required for mobile)
    if (sourceAudioContext.state === 'suspended') {
      sourceAudioContext.resume();
    }
    
    sourceNode = sourceAudioContext.createBufferSource();
    sourceNode.buffer = sourceBuffer;
    sourceNode.connect(sourceAudioContext.destination);
    
    setState('listening');
    elements.playSourceBtn.querySelector('span').textContent = 'Playing...';
    
    const startTime = sourceAudioContext.currentTime;
    const duration = sourceBuffer.duration;
    
    // Update progress bar
    function updateProgress() {
      if (state.currentState !== 'listening') return;
      
      const elapsed = sourceAudioContext.currentTime - startTime;
      const progress = Math.min(elapsed / duration * 100, 100);
      elements.sourceProgress.style.width = progress + '%';
      
      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      }
    }
    
    sourceNode.onended = () => {
      setState('idle');
      elements.playSourceBtn.querySelector('span').textContent = 'Listen';
      elements.sourceProgress.style.width = '0%';
    };
    
    sourceNode.start();
    updateProgress();
  }

  function stopSourceAudio() {
    if (sourceNode) {
      try {
        sourceNode.stop();
      } catch (e) {
        // Already stopped
      }
      sourceNode = null;
    }
    elements.sourceProgress.style.width = '0%';
  }

  // ============================================
  // Recording
  // ============================================
  
  async function startRecording() {
    // Stop any current audio
    stopAllAudio();
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      state.recordingChunks = [];
      state.mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4'
      });
      
      state.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          state.recordingChunks.push(e.data);
        }
      };
      
      state.mediaRecorder.onstop = () => {
        // Clean up stream
        stream.getTracks().forEach(track => track.stop());
        
        // Create blob from chunks
        state.recordedBlob = new Blob(state.recordingChunks, { 
          type: state.mediaRecorder.mimeType 
        });
        
        // Create URL for playback
        if (state.recordedUrl) {
          URL.revokeObjectURL(state.recordedUrl);
        }
        state.recordedUrl = URL.createObjectURL(state.recordedBlob);
        
        // Enable playback
        elements.playDraftBtn.disabled = false;
        elements.noDraftMsg.classList.add('hidden');
        
        setState('idle');
      };
      
      state.mediaRecorder.start();
      state.recordingStartTime = Date.now();
      
      // Update recording time display
      elements.recordingIndicator.classList.remove('hidden');
      state.recordingTimerId = setInterval(updateRecordingTime, 100);
      
      setState('recording');
      elements.recordBtn.classList.add('recording');
      elements.recordLabel.textContent = 'Stop';
      
    } catch (err) {
      console.error('Recording error:', err);
      elements.status.textContent = 'Mic access denied';
      setState('idle');
    }
  }

  function stopRecording() {
    if (state.mediaRecorder && state.mediaRecorder.state === 'recording') {
      state.mediaRecorder.stop();
    }
    
    clearInterval(state.recordingTimerId);
    elements.recordingIndicator.classList.add('hidden');
    elements.recordBtn.classList.remove('recording');
    elements.recordLabel.textContent = 'Record';
  }

  function updateRecordingTime() {
    if (!state.recordingStartTime) return;
    
    const elapsed = Math.floor((Date.now() - state.recordingStartTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    elements.recordingTime.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function toggleRecording() {
    if (state.currentState === 'recording') {
      stopRecording();
    } else {
      startRecording();
    }
  }

  // ============================================
  // Draft Playback
  // ============================================
  
  let draftAudio = null;

  function playDraftAudio() {
    if (!state.recordedUrl) return;
    
    // Stop any current audio
    stopAllAudio();
    
    draftAudio = new Audio(state.recordedUrl);
    
    draftAudio.onplay = () => {
      setState('playing');
      elements.playDraftBtn.querySelector('span').textContent = 'Playing...';
    };
    
    draftAudio.ontimeupdate = () => {
      if (draftAudio.duration) {
        const progress = (draftAudio.currentTime / draftAudio.duration) * 100;
        elements.draftProgress.style.width = progress + '%';
      }
    };
    
    draftAudio.onended = () => {
      setState('idle');
      elements.playDraftBtn.querySelector('span').textContent = 'Play Draft';
      elements.draftProgress.style.width = '0%';
    };
    
    draftAudio.onerror = () => {
      console.error('Playback error');
      elements.status.textContent = 'Playback error';
      setState('idle');
    };
    
    draftAudio.play().catch(err => {
      console.error('Play failed:', err);
      setState('idle');
    });
  }

  function stopDraftAudio() {
    if (draftAudio) {
      draftAudio.pause();
      draftAudio.currentTime = 0;
      draftAudio = null;
    }
    elements.draftProgress.style.width = '0%';
  }

  // ============================================
  // Stop All Audio
  // ============================================
  
  function stopAllAudio() {
    stopSourceAudio();
    stopRecording();
    stopDraftAudio();
    setState('idle');
    
    // Reset UI
    elements.playSourceBtn.querySelector('span').textContent = 'Listen';
    elements.playDraftBtn.querySelector('span').textContent = 'Play Draft';
  }

  // ============================================
  // Event Listeners
  // ============================================
  
  elements.playSourceBtn.addEventListener('click', () => {
    if (state.currentState === 'listening') {
      stopSourceAudio();
      setState('idle');
    } else {
      playSourceAudio();
    }
  });

  elements.recordBtn.addEventListener('click', toggleRecording);

  elements.playDraftBtn.addEventListener('click', () => {
    if (state.currentState === 'playing') {
      stopDraftAudio();
      setState('idle');
    } else {
      playDraftAudio();
    }
  });

  // ============================================
  // Initialize
  // ============================================
  
  function init() {
    setState('idle');
    
    // Check for required APIs
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      elements.status.textContent = 'Recording not supported';
      elements.recordBtn.disabled = true;
    }
    
    if (!window.AudioContext && !window.webkitAudioContext) {
      elements.status.textContent = 'Audio not supported';
      elements.playSourceBtn.disabled = true;
    }
    
    console.log('Fluent Mobile PoC initialized');
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
