/**
 * Waveform Visualizer for Fluent Mobile PoC v0.2
 * 
 * Provides visual feedback for audio operations.
 * Agent-verifiable: screenshots can show waveform activity.
 */

class WaveformVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.analyser = null;
    this.dataArray = null;
    this.animationId = null;
    this.isActive = false;
    
    // Visual settings
    this.barWidth = 3;
    this.barGap = 2;
    this.barColor = '#e94560';
    this.bgColor = '#1a1a2e';
    
    // Resize canvas to match CSS size
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio;
    this.canvas.height = rect.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    this.width = rect.width;
    this.height = rect.height;
    
    // Draw idle state
    if (!this.isActive) {
      this.drawIdle();
    }
  }
  
  /**
   * Connect to an AudioContext analyser node
   */
  connect(analyserNode) {
    this.analyser = analyserNode;
    this.analyser.fftSize = 64;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
  }
  
  /**
   * Start visualizing
   */
  start() {
    if (this.isActive) return;
    this.isActive = true;
    this.draw();
  }
  
  /**
   * Stop visualizing
   */
  stop() {
    this.isActive = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    // Fade to idle
    this.drawIdle();
  }
  
  /**
   * Main draw loop
   */
  draw() {
    if (!this.isActive) return;
    
    this.animationId = requestAnimationFrame(() => this.draw());
    
    if (!this.analyser) {
      this.drawIdle();
      return;
    }
    
    // Get frequency data
    this.analyser.getByteFrequencyData(this.dataArray);
    
    // Clear canvas
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Calculate bar layout
    const numBars = Math.floor(this.width / (this.barWidth + this.barGap));
    const startX = (this.width - (numBars * (this.barWidth + this.barGap) - this.barGap)) / 2;
    
    // Draw bars
    for (let i = 0; i < numBars; i++) {
      // Map frequency data to bar index
      const dataIndex = Math.floor((i / numBars) * this.dataArray.length);
      const value = this.dataArray[dataIndex] || 0;
      
      // Calculate bar height (normalized to canvas height)
      const barHeight = Math.max(4, (value / 255) * (this.height - 8));
      
      // Calculate position (centered vertically)
      const x = startX + i * (this.barWidth + this.barGap);
      const y = (this.height - barHeight) / 2;
      
      // Draw bar with rounded ends
      this.ctx.fillStyle = this.barColor;
      this.ctx.beginPath();
      this.ctx.roundRect(x, y, this.barWidth, barHeight, this.barWidth / 2);
      this.ctx.fill();
    }
  }
  
  /**
   * Draw idle state (static bars)
   */
  drawIdle() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    const numBars = Math.floor(this.width / (this.barWidth + this.barGap));
    const startX = (this.width - (numBars * (this.barWidth + this.barGap) - this.barGap)) / 2;
    
    // Draw minimal idle bars
    this.ctx.fillStyle = '#333';
    for (let i = 0; i < numBars; i++) {
      const barHeight = 4;
      const x = startX + i * (this.barWidth + this.barGap);
      const y = (this.height - barHeight) / 2;
      
      this.ctx.beginPath();
      this.ctx.roundRect(x, y, this.barWidth, barHeight, this.barWidth / 2);
      this.ctx.fill();
    }
  }
  
  /**
   * Simulate waveform activity (for demo/testing when no real audio)
   */
  simulateActivity(durationMs = 3000) {
    this.isActive = true;
    const startTime = Date.now();
    
    const simulate = () => {
      if (!this.isActive) return;
      
      const elapsed = Date.now() - startTime;
      if (elapsed > durationMs) {
        this.stop();
        return;
      }
      
      // Clear canvas
      this.ctx.fillStyle = this.bgColor;
      this.ctx.fillRect(0, 0, this.width, this.height);
      
      const numBars = Math.floor(this.width / (this.barWidth + this.barGap));
      const startX = (this.width - (numBars * (this.barWidth + this.barGap) - this.barGap)) / 2;
      
      // Generate pseudo-random but smooth values
      for (let i = 0; i < numBars; i++) {
        const phase = (elapsed / 200) + (i * 0.3);
        const value = 0.3 + 0.7 * Math.abs(Math.sin(phase) * Math.cos(phase * 0.7));
        const barHeight = Math.max(4, value * (this.height - 8));
        
        const x = startX + i * (this.barWidth + this.barGap);
        const y = (this.height - barHeight) / 2;
        
        this.ctx.fillStyle = this.barColor;
        this.ctx.beginPath();
        this.ctx.roundRect(x, y, this.barWidth, barHeight, this.barWidth / 2);
        this.ctx.fill();
      }
      
      this.animationId = requestAnimationFrame(simulate);
    };
    
    simulate();
  }
  
  /**
   * Set color scheme
   */
  setColors(barColor, bgColor) {
    this.barColor = barColor;
    this.bgColor = bgColor;
    if (!this.isActive) {
      this.drawIdle();
    }
  }
}

// Export for use in app.js
window.WaveformVisualizer = WaveformVisualizer;
