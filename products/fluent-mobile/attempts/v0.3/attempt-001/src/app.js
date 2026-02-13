/**
 * Fluent Mobile v0.3 — Main Application
 * 
 * REAL AUDIO - No more faking!
 * 
 * 1. Source audio plays REAL audio file
 * 2. Recording captures REAL microphone input
 * 3. Playback plays REAL recorded audio
 * 4. Waveforms show REAL audio analysis
 */

class FluentMobileApp {
  constructor() {
    // Screens
    this.homeScreen = document.getElementById('home-screen');
    this.draftingScreen = document.getElementById('drafting-screen');
    
    // Buttons
    this.startDraftingBtn = document.getElementById('start-drafting-btn');
    this.backBtn = document.getElementById('back-btn');
    this.listenBtn = document.getElementById('listen-btn');
    this.recordBtn = document.getElementById('record-btn');
    this.playBtn = document.getElementById('play-btn');
    this.pauseBtn = document.getElementById('pause-btn');
    
    // Status elements
    this.stateIndicator = document.getElementById('state-indicator');
    this.draftStatus = document.getElementById('draft-status');
    this.onlineStatus = document.getElementById('online-status');
    
    // Waveforms
    this.sourceWaveform = new DualModeWaveform(document.getElementById('source-waveform'));
    this.draftWaveform = new DualModeWaveform(document.getElementById('draft-waveform'));
    
    // Audio Context and nodes
    this.audioContext = null;
    this.sourceAnalyser = null;
    this.draftAnalyser = null;
    
    // Source audio
    this.sourceAudio = null;
    this.sourceAudioSource = null;
    this.isSourcePlaying = false;
    
    // Recording
    this.mediaRecorder = null;
    this.recordedChunks = [];
    this.recordedBlob = null;
    this.recordedUrl = null;
    this.micStream = null;
    this.micSource = null;
    this.isRecording = false;
    this.recordingStartTime = 0;
    
    // Draft playback
    this.draftAudio = null;
    this.draftAudioSource = null;
    this.isPlaying = false;
    this.isPaused = false;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.updateOnlineStatus();
    this.registerServiceWorker();
    console.log('Fluent Mobile v0.3 initialized - REAL AUDIO MODE');
  }
  
  bindEvents() {
    // Navigation
    this.startDraftingBtn.addEventListener('click', () => this.showScreen('drafting'));
    this.backBtn.addEventListener('click', () => this.showScreen('home'));
    
    // Source audio - REAL playback
    this.listenBtn.addEventListener('click', () => this.toggleSourcePlayback());
    
    // Draft audio - REAL recording and playback
    this.recordBtn.addEventListener('click', () => this.toggleRecording());
    this.playBtn.addEventListener('click', () => this.playDraft());
    this.pauseBtn.addEventListener('click', () => this.pauseDraft());
    
    // Online/offline
    window.addEventListener('online', () => this.updateOnlineStatus());
    window.addEventListener('offline', () => this.updateOnlineStatus());
  }
  
  // === Screen Navigation ===
  
  showScreen(screenName) {
    this.homeScreen.classList.remove('active');
    this.draftingScreen.classList.remove('active');
    
    if (screenName === 'home') {
      this.homeScreen.classList.add('active');
      this.stopAllAudio();
    } else if (screenName === 'drafting') {
      this.draftingScreen.classList.add('active');
      this.initializeDraftingScreen();
    }
  }
  
  initializeDraftingScreen() {
    requestAnimationFrame(() => {
      this.sourceWaveform.ensureInitialized();
      this.draftWaveform.ensureInitialized();
      this.sourceWaveform.draw();
      this.draftWaveform.draw();
    });
  }
  
  // === Audio Context ===
  
  async ensureAudioContext() {
    if (!this.audioContext || this.audioContext.state === 'closed') {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
    
    // Create analysers for REAL waveform visualization
    if (!this.sourceAnalyser) {
      this.sourceAnalyser = this.audioContext.createAnalyser();
      this.sourceAnalyser.fftSize = 256;
    }
    
    if (!this.draftAnalyser) {
      this.draftAnalyser = this.audioContext.createAnalyser();
      this.draftAnalyser.fftSize = 256;
    }
    
    return this.audioContext;
  }
  
  // === SOURCE AUDIO - REAL PLAYBACK ===
  
  async toggleSourcePlayback() {
    if (this.isSourcePlaying) {
      this.stopSourcePlayback();
    } else {
      await this.startSourcePlayback();
    }
  }
  
  async startSourcePlayback() {
    try {
      await this.ensureAudioContext();
      
      // Create audio element for source file
      if (!this.sourceAudio) {
        this.sourceAudio = new Audio('sample-audio.mp3');
        this.sourceAudio.crossOrigin = 'anonymous';
        
        this.sourceAudio.onended = () => {
          this.stopSourcePlayback();
        };
        
        this.sourceAudio.ontimeupdate = () => {
          if (this.sourceAudio.duration) {
            const position = this.sourceAudio.currentTime / this.sourceAudio.duration;
            this.sourceWaveform.setPlaybackPosition(position);
          }
        };
        
        // Connect to analyser for REAL waveform
        this.sourceAudioSource = this.audioContext.createMediaElementSource(this.sourceAudio);
        this.sourceAudioSource.connect(this.sourceAnalyser);
        this.sourceAnalyser.connect(this.audioContext.destination);
      }
      
      // Connect waveform to REAL analyser
      this.sourceWaveform.connectAnalyser(this.sourceAnalyser);
      
      // Play the REAL audio
      await this.sourceAudio.play();
      this.isSourcePlaying = true;
      
      // Start REAL waveform animation
      this.sourceWaveform.startLiveMode('playing');
      
      // Update UI
      this.listenBtn.querySelector('.btn-icon').textContent = '⏹️';
      this.listenBtn.querySelector('.btn-icon').nextSibling.textContent = ' Stop';
      
      console.log('Source audio playing - REAL AUDIO');
      
    } catch (err) {
      console.error('Source playback failed:', err);
      this.draftStatus.textContent = 'Audio playback failed: ' + err.message;
    }
  }
  
  stopSourcePlayback() {
    if (this.sourceAudio) {
      this.sourceAudio.pause();
      this.sourceAudio.currentTime = 0;
    }
    
    this.isSourcePlaying = false;
    this.sourceWaveform.stopLiveMode();
    this.sourceWaveform.setPlaybackPosition(0);
    
    // Update UI
    this.listenBtn.querySelector('.btn-icon').textContent = '▶️';
    this.listenBtn.querySelector('.btn-icon').nextSibling.textContent = ' Listen';
  }
  
  // === RECORDING - REAL MICROPHONE ===
  
  async toggleRecording() {
    if (this.isRecording) {
      await this.stopRecording();
    } else {
      await this.startRecording();
    }
  }
  
  async startRecording() {
    try {
      await this.ensureAudioContext();
      
      // Get REAL microphone access
      this.micStream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true
        } 
      });
      
      // Connect microphone to analyser for REAL waveform
      this.micSource = this.audioContext.createMediaStreamSource(this.micStream);
      this.micSource.connect(this.draftAnalyser);
      // Note: Don't connect to destination to avoid feedback!
      
      this.draftWaveform.connectAnalyser(this.draftAnalyser);
      
      // Setup REAL MediaRecorder
      this.recordedChunks = [];
      this.mediaRecorder = new MediaRecorder(this.micStream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          this.recordedChunks.push(e.data);
        }
      };
      
      this.mediaRecorder.onstop = () => {
        this.processRecording();
      };
      
      // Start REAL recording
      this.mediaRecorder.start(100);
      this.isRecording = true;
      this.recordingStartTime = Date.now();
      
      // Update UI and start REAL waveform
      this.updateRecordingUI(true);
      this.draftWaveform.startLiveMode('recording');
      
      console.log('Recording started - REAL MICROPHONE');
      
    } catch (err) {
      console.error('Recording failed:', err);
      this.draftStatus.textContent = 'Microphone denied: ' + err.message;
    }
  }
  
  async stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    
    // Stop microphone
    if (this.micStream) {
      this.micStream.getTracks().forEach(track => track.stop());
      this.micStream = null;
    }
    
    if (this.micSource) {
      this.micSource.disconnect();
      this.micSource = null;
    }
    
    this.isRecording = false;
    this.updateRecordingUI(false);
    this.draftWaveform.stopLiveMode();
    
    console.log('Recording stopped');
  }
  
  processRecording() {
    // Create REAL audio blob
    this.recordedBlob = new Blob(this.recordedChunks, { type: 'audio/webm;codecs=opus' });
    
    // Clean up old URL
    if (this.recordedUrl) {
      URL.revokeObjectURL(this.recordedUrl);
    }
    this.recordedUrl = URL.createObjectURL(this.recordedBlob);
    
    // Calculate duration
    const durationMs = Date.now() - this.recordingStartTime;
    const durationSec = Math.round(durationMs / 1000);
    
    // Update UI
    this.draftStatus.textContent = `Recording: ${durationSec}s - Ready to play`;
    this.playBtn.disabled = false;
    
    console.log('Recording processed:', this.recordedBlob.size, 'bytes');
  }
  
  updateRecordingUI(isRecording) {
    if (isRecording) {
      this.recordBtn.classList.add('recording');
      this.recordBtn.querySelector('.btn-icon').textContent = '⏹️';
      this.recordBtn.querySelector('.btn-icon').nextSibling.textContent = ' Stop';
      this.stateIndicator.textContent = 'Recording';
      this.stateIndicator.className = 'state-indicator recording';
      this.playBtn.disabled = true;
      this.pauseBtn.disabled = true;
    } else {
      this.recordBtn.classList.remove('recording');
      this.recordBtn.querySelector('.btn-icon').textContent = '⏺️';
      this.recordBtn.querySelector('.btn-icon').nextSibling.textContent = ' Record';
      this.stateIndicator.textContent = 'Ready';
      this.stateIndicator.className = 'state-indicator';
    }
  }
  
  // === DRAFT PLAYBACK - REAL AUDIO ===
  
  async playDraft() {
    if (this.isPaused && this.draftAudio) {
      this.resumeDraft();
      return;
    }
    
    if (!this.recordedUrl) {
      this.draftStatus.textContent = 'No recording to play';
      return;
    }
    
    try {
      await this.ensureAudioContext();
      
      // Clean up previous audio
      if (this.draftAudio) {
        this.draftAudio.pause();
        if (this.draftAudioSource) {
          this.draftAudioSource.disconnect();
        }
      }
      
      // Create REAL audio element
      this.draftAudio = new Audio(this.recordedUrl);
      
      this.draftAudio.onended = () => {
        this.onPlaybackEnded();
      };
      
      this.draftAudio.ontimeupdate = () => {
        if (this.draftAudio.duration) {
          const position = this.draftAudio.currentTime / this.draftAudio.duration;
          this.draftWaveform.setPlaybackPosition(position);
        }
      };
      
      this.draftAudio.onloadedmetadata = () => {
        console.log('Draft audio duration:', this.draftAudio.duration, 'seconds');
      };
      
      // Connect to analyser for REAL waveform during playback
      this.draftAudioSource = this.audioContext.createMediaElementSource(this.draftAudio);
      this.draftAudioSource.connect(this.draftAnalyser);
      this.draftAnalyser.connect(this.audioContext.destination);
      
      this.draftWaveform.connectAnalyser(this.draftAnalyser);
      
      // Play REAL audio
      await this.draftAudio.play();
      
      this.isPlaying = true;
      this.isPaused = false;
      this.updatePlaybackUI(true);
      this.draftWaveform.startLiveMode('playing');
      
      console.log('Playing draft - REAL AUDIO');
      
    } catch (err) {
      console.error('Draft playback failed:', err);
      this.draftStatus.textContent = 'Playback failed: ' + err.message;
    }
  }
  
  pauseDraft() {
    if (this.draftAudio && this.isPlaying) {
      this.draftAudio.pause();
      this.isPlaying = false;
      this.isPaused = true;
      this.updatePlaybackUI(false);
      this.draftWaveform.stopLiveMode();
      
      this.stateIndicator.textContent = 'Paused';
      this.stateIndicator.className = 'state-indicator paused';
      
      console.log('Paused at:', this.draftAudio.currentTime);
    }
  }
  
  resumeDraft() {
    if (this.draftAudio) {
      this.draftAudio.play();
      this.isPlaying = true;
      this.isPaused = false;
      this.updatePlaybackUI(true);
      this.draftWaveform.startLiveMode('playing');
      
      console.log('Resumed from:', this.draftAudio.currentTime);
    }
  }
  
  onPlaybackEnded() {
    this.isPlaying = false;
    this.isPaused = false;
    this.updatePlaybackUI(false);
    this.draftWaveform.stopLiveMode();
    this.draftWaveform.setPlaybackPosition(1);
    
    this.stateIndicator.textContent = 'Ready';
    this.stateIndicator.className = 'state-indicator';
    
    console.log('Playback ended');
  }
  
  updatePlaybackUI(isPlaying) {
    if (isPlaying) {
      this.playBtn.style.display = 'none';
      this.pauseBtn.style.display = 'flex';
      this.pauseBtn.disabled = false;
      this.stateIndicator.textContent = 'Playing';
      this.stateIndicator.className = 'state-indicator playing';
      this.recordBtn.disabled = true;
    } else {
      this.playBtn.style.display = 'flex';
      this.pauseBtn.style.display = 'none';
      this.recordBtn.disabled = false;
    }
  }
  
  // === Utility ===
  
  stopAllAudio() {
    // Stop source
    if (this.sourceAudio) {
      this.sourceAudio.pause();
      this.sourceAudio.currentTime = 0;
    }
    this.isSourcePlaying = false;
    
    // Stop recording
    if (this.isRecording) {
      this.stopRecording();
    }
    
    // Stop draft playback
    if (this.draftAudio) {
      this.draftAudio.pause();
    }
    this.isPlaying = false;
    this.isPaused = false;
    
    // Reset waveforms
    this.sourceWaveform.stopLiveMode();
    this.draftWaveform.stopLiveMode();
  }
  
  updateOnlineStatus() {
    const isOnline = navigator.onLine;
    this.onlineStatus.textContent = isOnline ? 'Online' : 'Offline';
    this.onlineStatus.className = `status-indicator ${isOnline ? 'online' : 'offline'}`;
  }
  
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('sw.js');
        console.log('Service Worker registered:', registration.scope);
      } catch (err) {
        console.log('Service Worker registration failed:', err);
      }
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new FluentMobileApp();
});
