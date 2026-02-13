/**
 * Fluent Mobile PoC v0.2
 * 
 * Core application logic:
 * - Two-screen navigation (Home → Drafting)
 * - Audio playback with waveform visualization
 * - Audio recording with waveform visualization
 * - Draft playback with waveform visualization
 */

class FluentMobileApp {
  constructor() {
    // State
    this.currentScreen = 'home';
    this.isRecording = false;
    this.isPlaying = false;
    this.recordedBlob = null;
    this.recordedUrl = null;
    
    // Audio context (created on user gesture)
    this.audioContext = null;
    this.sourceAnalyser = null;
    this.recordAnalyser = null;
    this.playbackAnalyser = null;
    
    // Media recorder
    this.mediaRecorder = null;
    this.recordedChunks = [];
    
    // Waveform visualizers
    this.waveformSource = null;
    this.waveformRecord = null;
    this.waveformPlayback = null;
    
    // Demo audio oscillator
    this.oscillator = null;
    
    // Initialize
    this.init();
  }
  
  init() {
    // Cache DOM elements
    this.elements = {
      screenHome: document.getElementById('screen-home'),
      screenDrafting: document.getElementById('screen-drafting'),
      btnStartDrafting: document.getElementById('btn-start-drafting'),
      btnBack: document.getElementById('btn-back'),
      btnListen: document.getElementById('btn-listen'),
      btnRecord: document.getElementById('btn-record'),
      btnPlayDraft: document.getElementById('btn-play-draft'),
      sourceTime: document.getElementById('source-time'),
      recordTime: document.getElementById('record-time'),
      playbackTime: document.getElementById('playback-time'),
      draftingState: document.getElementById('drafting-state'),
      homeStatus: document.getElementById('home-status')
    };
    
    // Initialize waveform visualizers
    this.waveformSource = new WaveformVisualizer('waveform-source');
    this.waveformRecord = new WaveformVisualizer('waveform-record');
    this.waveformPlayback = new WaveformVisualizer('waveform-playback');
    
    // Set different colors for each waveform
    this.waveformSource.setColors('#4ecca3', '#1a1a2e');  // Green for source
    this.waveformRecord.setColors('#e94560', '#1a1a2e');  // Red for recording
    this.waveformPlayback.setColors('#ffc107', '#1a1a2e'); // Yellow for playback
    
    // Bind event listeners
    this.bindEvents();
    
    // Register service worker
    this.registerServiceWorker();
    
    // Update online status
    this.updateOnlineStatus();
    
    console.log('[FluentMobile] App initialized');
  }
  
  bindEvents() {
    // Navigation
    this.elements.btnStartDrafting.addEventListener('click', () => this.navigateTo('drafting'));
    this.elements.btnBack.addEventListener('click', () => this.navigateTo('home'));
    
    // Audio controls
    this.elements.btnListen.addEventListener('click', () => this.handleListen());
    this.elements.btnRecord.addEventListener('click', () => this.handleRecord());
    this.elements.btnPlayDraft.addEventListener('click', () => this.handlePlayDraft());
    
    // Online/offline status
    window.addEventListener('online', () => this.updateOnlineStatus());
    window.addEventListener('offline', () => this.updateOnlineStatus());
  }
  
  /**
   * Navigate between screens
   */
  navigateTo(screen) {
    // Stop any active audio
    this.stopAllAudio();
    
    // Update screen visibility
    this.elements.screenHome.classList.toggle('active', screen === 'home');
    this.elements.screenDrafting.classList.toggle('active', screen === 'drafting');
    
    this.currentScreen = screen;
    console.log(`[FluentMobile] Navigated to: ${screen}`);
    
    // Reset drafting screen state when entering
    if (screen === 'drafting') {
      this.updateState('Ready to listen');
    }
  }
  
  /**
   * Initialize AudioContext on first user gesture
   */
  async initAudioContext() {
    if (this.audioContext) return;
    
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create analyser nodes
      this.sourceAnalyser = this.audioContext.createAnalyser();
      this.recordAnalyser = this.audioContext.createAnalyser();
      this.playbackAnalyser = this.audioContext.createAnalyser();
      
      // Connect visualizers
      this.waveformSource.connect(this.sourceAnalyser);
      this.waveformRecord.connect(this.recordAnalyser);
      this.waveformPlayback.connect(this.playbackAnalyser);
      
      console.log('[FluentMobile] AudioContext initialized');
    } catch (err) {
      console.error('[FluentMobile] Failed to initialize AudioContext:', err);
    }
  }
  
  /**
   * Handle Listen button - play demo source audio
   */
  async handleListen() {
    await this.initAudioContext();
    
    if (this.isPlaying) {
      this.stopSourceAudio();
      return;
    }
    
    try {
      // For PoC, generate a demo tone instead of loading real audio
      this.oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      this.oscillator.type = 'sine';
      this.oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      
      // Connect: oscillator → gain → analyser → destination
      this.oscillator.connect(gainNode);
      gainNode.connect(this.sourceAnalyser);
      this.sourceAnalyser.connect(this.audioContext.destination);
      
      this.oscillator.start();
      this.isPlaying = true;
      
      // Update UI
      this.elements.btnListen.querySelector('.btn-text').textContent = 'Stop';
      this.waveformSource.start();
      this.updateState('Listening to source...');
      
      // Auto-stop after 3 seconds (demo)
      this.sourceTimeout = setTimeout(() => this.stopSourceAudio(), 3000);
      
      // Update time display
      let elapsed = 0;
      this.sourceTimeInterval = setInterval(() => {
        elapsed += 0.1;
        this.elements.sourceTime.textContent = `${this.formatTime(elapsed)} / 0:03`;
      }, 100);
      
      console.log('[FluentMobile] Playing source audio');
    } catch (err) {
      console.error('[FluentMobile] Failed to play source:', err);
      this.updateState('Error playing audio');
    }
  }
  
  stopSourceAudio() {
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator.disconnect();
      this.oscillator = null;
    }
    
    clearTimeout(this.sourceTimeout);
    clearInterval(this.sourceTimeInterval);
    
    this.isPlaying = false;
    this.elements.btnListen.querySelector('.btn-text').textContent = 'Listen';
    this.waveformSource.stop();
    this.elements.sourceTime.textContent = '0:00 / 0:03';
    this.updateState('Ready to record');
    
    console.log('[FluentMobile] Stopped source audio');
  }
  
  /**
   * Handle Record button - toggle recording
   */
  async handleRecord() {
    await this.initAudioContext();
    
    if (this.isRecording) {
      this.stopRecording();
      return;
    }
    
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Connect stream to analyser for visualization
      const source = this.audioContext.createMediaStreamSource(stream);
      source.connect(this.recordAnalyser);
      
      // Create MediaRecorder
      this.mediaRecorder = new MediaRecorder(stream);
      this.recordedChunks = [];
      
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          this.recordedChunks.push(e.data);
        }
      };
      
      this.mediaRecorder.onstop = () => {
        // Create blob from recorded chunks
        this.recordedBlob = new Blob(this.recordedChunks, { type: 'audio/webm' });
        this.recordedUrl = URL.createObjectURL(this.recordedBlob);
        
        // Enable playback button
        this.elements.btnPlayDraft.disabled = false;
        
        // Stop stream tracks
        stream.getTracks().forEach(track => track.stop());
        
        console.log('[FluentMobile] Recording saved');
      };
      
      // Start recording
      this.mediaRecorder.start();
      this.isRecording = true;
      
      // Update UI
      this.elements.btnRecord.classList.add('recording');
      this.elements.btnRecord.querySelector('.btn-text').textContent = 'Stop';
      this.waveformRecord.start();
      this.updateState('Recording...');
      
      // Update time display
      let elapsed = 0;
      this.recordTimeInterval = setInterval(() => {
        elapsed += 0.1;
        this.elements.recordTime.textContent = this.formatTime(elapsed);
      }, 100);
      
      console.log('[FluentMobile] Recording started');
    } catch (err) {
      console.error('[FluentMobile] Failed to start recording:', err);
      this.updateState('Microphone access denied');
    }
  }
  
  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    
    clearInterval(this.recordTimeInterval);
    
    this.isRecording = false;
    this.elements.btnRecord.classList.remove('recording');
    this.elements.btnRecord.querySelector('.btn-text').textContent = 'Record';
    this.waveformRecord.stop();
    this.updateState('Recording saved. Tap Play Draft to review.');
    
    console.log('[FluentMobile] Recording stopped');
  }
  
  /**
   * Handle Play Draft button - play recorded audio
   */
  async handlePlayDraft() {
    await this.initAudioContext();
    
    if (!this.recordedUrl) {
      console.warn('[FluentMobile] No recorded audio to play');
      return;
    }
    
    if (this.draftAudio) {
      this.stopDraftPlayback();
      return;
    }
    
    try {
      // Create audio element for playback
      this.draftAudio = new Audio(this.recordedUrl);
      
      // Connect to analyser for visualization
      const source = this.audioContext.createMediaElementSource(this.draftAudio);
      source.connect(this.playbackAnalyser);
      this.playbackAnalyser.connect(this.audioContext.destination);
      
      this.draftAudio.onended = () => this.stopDraftPlayback();
      
      this.draftAudio.play();
      
      // Update UI
      this.elements.btnPlayDraft.querySelector('.btn-text').textContent = 'Stop';
      this.waveformPlayback.start();
      this.updateState('Playing draft...');
      
      // Update time display
      this.playbackTimeInterval = setInterval(() => {
        const current = this.draftAudio?.currentTime || 0;
        const total = this.draftAudio?.duration || 0;
        this.elements.playbackTime.textContent = `${this.formatTime(current)} / ${this.formatTime(total)}`;
      }, 100);
      
      console.log('[FluentMobile] Playing draft');
    } catch (err) {
      console.error('[FluentMobile] Failed to play draft:', err);
      this.updateState('Error playing draft');
    }
  }
  
  stopDraftPlayback() {
    if (this.draftAudio) {
      this.draftAudio.pause();
      this.draftAudio = null;
    }
    
    clearInterval(this.playbackTimeInterval);
    
    this.elements.btnPlayDraft.querySelector('.btn-text').textContent = 'Play Draft';
    this.waveformPlayback.stop();
    this.elements.playbackTime.textContent = '0:00 / 0:00';
    this.updateState('Review complete. Record again or go back.');
    
    console.log('[FluentMobile] Stopped draft playback');
  }
  
  /**
   * Stop all audio operations
   */
  stopAllAudio() {
    this.stopSourceAudio();
    if (this.isRecording) this.stopRecording();
    this.stopDraftPlayback();
  }
  
  /**
   * Update state indicator text
   */
  updateState(text) {
    if (this.elements.draftingState) {
      this.elements.draftingState.querySelector('.state-text').textContent = text;
    }
  }
  
  /**
   * Update online/offline status
   */
  updateOnlineStatus() {
    const isOnline = navigator.onLine;
    const statusDot = this.elements.homeStatus.querySelector('.status-dot');
    const statusText = this.elements.homeStatus.querySelector('.status-text');
    
    statusDot.classList.toggle('online', isOnline);
    statusDot.classList.toggle('offline', !isOnline);
    statusText.textContent = isOnline ? 'Ready' : 'Offline';
    
    console.log(`[FluentMobile] Online status: ${isOnline}`);
  }
  
  /**
   * Format seconds to mm:ss
   */
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  
  /**
   * Register service worker for offline support
   */
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('sw.js');
        console.log('[FluentMobile] Service Worker registered:', registration.scope);
      } catch (err) {
        console.error('[FluentMobile] Service Worker registration failed:', err);
      }
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.fluentApp = new FluentMobileApp();
});
