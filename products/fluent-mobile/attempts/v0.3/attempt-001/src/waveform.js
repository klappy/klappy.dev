/**
 * Fluent Mobile v0.3 — Dual-Mode Waveform Visualizer
 * 
 * Key v0.3 Feature: Two distinct modes
 * 
 * 1. LIVE MODE: Animated during recording/playback
 *    - Shows real-time audio activity
 *    - Confirms "it's working" (addresses 2016 Android recorder problem)
 *    - Animated bars responding to audio levels
 * 
 * 2. TIMELINE MODE: Static when stopped/paused
 *    - Shows full waveform like YouTube seek bar
 *    - Fixed size regardless of duration
 *    - Shows amplitude (silence vs speech)
 *    - Enables future seeking/scrubbing
 *    - Shows playback position when paused
 */

class DualModeWaveform {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.mode = 'idle'; // 'idle', 'live', 'timeline'
    this.analyser = null;
    this.dataArray = null;
    this.animationId = null;
    this.recordedData = []; // Store amplitude data for timeline mode
    this.playbackPosition = 0; // 0-1, for timeline mode
    this.duration = 0;
    this.isInitialized = false;
    
    // Colors
    this.colors = {
      background: '#16213e',
      idle: '#4a4a6a',
      live: '#e94560',
      liveGlow: '#ff6b6b',
      timeline: '#4ecca3',
      position: '#ffc107',
      played: '#4ecca3',
      unplayed: '#2a5a4a'
    };
    
    // Don't resize immediately - wait until visible
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    
    // Skip if canvas isn't visible yet (returns 0 dimensions)
    if (rect.width === 0 || rect.height === 0) {
      return;
    }
    
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
    this.isInitialized = true;
    this.draw();
  }
  
  // Call this when the canvas becomes visible
  ensureInitialized() {
    if (!this.isInitialized || this.width === 0) {
      this.resize();
    }
  }
  
  /**
   * Connect to Web Audio API analyser for live visualization
   */
  connectAnalyser(analyser) {
    this.analyser = analyser;
    if (analyser) {
      this.dataArray = new Uint8Array(analyser.frequencyBinCount);
    }
  }
  
  /**
   * Switch to LIVE mode (recording or playing)
   */
  startLiveMode(type = 'recording') {
    this.ensureInitialized();
    this.mode = 'live';
    this.liveType = type; // 'recording' or 'playing'
    if (type === 'recording') {
      this.recordedData = []; // Clear for new recording
    }
    this.animate();
  }
  
  /**
   * Switch to TIMELINE mode (stopped or paused)
   */
  stopLiveMode() {
    this.mode = 'timeline';
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.draw();
  }
  
  /**
   * Set to idle state (no recording)
   */
  setIdle() {
    this.mode = 'idle';
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.recordedData = [];
    this.playbackPosition = 0;
    this.draw();
  }
  
  /**
   * Update playback position (0-1) for timeline mode
   */
  setPlaybackPosition(position) {
    this.playbackPosition = Math.max(0, Math.min(1, position));
    if (this.mode === 'timeline') {
      this.draw();
    }
  }
  
  /**
   * Animation loop for live mode
   */
  animate() {
    if (this.mode !== 'live') return;
    
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  /**
   * Main draw function - delegates to mode-specific drawing
   */
  draw() {
    // Make sure we're initialized
    if (!this.isInitialized || this.width === 0) {
      this.ensureInitialized();
      if (!this.isInitialized) return; // Still not ready
    }
    
    this.ctx.fillStyle = this.colors.background;
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    switch (this.mode) {
      case 'live':
        this.drawLiveMode();
        break;
      case 'timeline':
        this.drawTimelineMode();
        break;
      default:
        this.drawIdleMode();
    }
  }
  
  /**
   * IDLE MODE: Shows placeholder state
   */
  drawIdleMode() {
    const centerY = this.height / 2;
    
    // Draw flat line
    this.ctx.strokeStyle = this.colors.idle;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(10, centerY);
    this.ctx.lineTo(this.width - 10, centerY);
    this.ctx.stroke();
    
    // Draw center dot
    this.ctx.fillStyle = this.colors.idle;
    this.ctx.beginPath();
    this.ctx.arc(this.width / 2, centerY, 4, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  /**
   * LIVE MODE: Animated bars showing REAL-TIME audio from analyser
   * NO SIMULATION - only shows real data
   */
  drawLiveMode() {
    const barCount = 32;
    const barWidth = (this.width - 20) / barCount - 2;
    const maxHeight = this.height - 20;
    const centerY = this.height / 2;
    
    // Get REAL frequency data from analyser
    let levels = new Array(barCount).fill(0);
    
    if (this.analyser && this.dataArray) {
      this.analyser.getByteFrequencyData(this.dataArray);
      
      // Map frequency bins to bars
      const binSize = Math.floor(this.dataArray.length / barCount);
      for (let i = 0; i < barCount; i++) {
        let sum = 0;
        for (let j = 0; j < binSize; j++) {
          sum += this.dataArray[i * binSize + j];
        }
        levels[i] = sum / binSize / 255;
      }
      
      // Store REAL levels for timeline mode
      if (this.liveType === 'recording') {
        const avgLevel = levels.reduce((a, b) => a + b, 0) / levels.length;
        this.recordedData.push(avgLevel);
      }
    }
    // NO ELSE - if no analyser, levels stay at 0 (shows flat bars = honest)
    
    // Draw bars from center
    const color = this.liveType === 'recording' ? this.colors.live : this.colors.timeline;
    
    for (let i = 0; i < barCount; i++) {
      const x = 10 + i * (barWidth + 2);
      // Minimum bar height of 2px so user can see something is happening
      const barHeight = Math.max(2, levels[i] * maxHeight);
      
      // Gradient effect
      const gradient = this.ctx.createLinearGradient(x, centerY - barHeight/2, x, centerY + barHeight/2);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.5, this.liveType === 'recording' ? this.colors.liveGlow : color);
      gradient.addColorStop(1, color);
      
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(x, centerY - barHeight/2, barWidth, barHeight);
    }
  }
  
  /**
   * TIMELINE MODE: Static waveform with playback position
   * Like YouTube seek bar - shows full duration, amplitude, and position
   */
  drawTimelineMode() {
    const padding = 10;
    const availableWidth = this.width - padding * 2;
    const maxHeight = this.height - 20;
    const centerY = this.height / 2;
    
    // If we have recorded data, draw the waveform
    if (this.recordedData.length > 0) {
      const barCount = Math.min(this.recordedData.length, 64);
      const barWidth = availableWidth / barCount - 1;
      const samplesPerBar = Math.ceil(this.recordedData.length / barCount);
      
      for (let i = 0; i < barCount; i++) {
        // Average samples for this bar
        let sum = 0;
        let count = 0;
        for (let j = 0; j < samplesPerBar; j++) {
          const idx = i * samplesPerBar + j;
          if (idx < this.recordedData.length) {
            sum += this.recordedData[idx];
            count++;
          }
        }
        const level = count > 0 ? sum / count : 0;
        
        const x = padding + i * (barWidth + 1);
        const barHeight = Math.max(4, level * maxHeight);
        
        // Color based on playback position
        const barPosition = i / barCount;
        const isPlayed = barPosition < this.playbackPosition;
        
        this.ctx.fillStyle = isPlayed ? this.colors.played : this.colors.unplayed;
        this.ctx.fillRect(x, centerY - barHeight/2, barWidth, barHeight);
      }
      
      // Draw playback position indicator
      if (this.playbackPosition > 0 && this.playbackPosition < 1) {
        const posX = padding + this.playbackPosition * availableWidth;
        
        this.ctx.fillStyle = this.colors.position;
        this.ctx.fillRect(posX - 2, 5, 4, this.height - 10);
        
        // Triangle at top
        this.ctx.beginPath();
        this.ctx.moveTo(posX, 0);
        this.ctx.lineTo(posX - 6, 8);
        this.ctx.lineTo(posX + 6, 8);
        this.ctx.closePath();
        this.ctx.fill();
      }
    } else {
      // No data - show idle-like state
      this.drawIdleMode();
    }
  }
  
  /**
   * Clear recorded data (for new recording)
   */
  clearRecordedData() {
    this.recordedData = [];
    this.playbackPosition = 0;
    this.duration = 0;
  }
  
  /**
   * Check if we have real recorded data
   */
  hasRecordedData() {
    return this.recordedData.length > 0;
  }
}

// Export for use in app.js
window.DualModeWaveform = DualModeWaveform;
