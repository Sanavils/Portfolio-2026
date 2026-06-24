import React, { useEffect, useRef } from 'react';

export default function MusicVisualizer({ analyserNode, isPlaying }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let wavePhase = 0;
    
    // Particle system
    const particles = [];
    const maxParticles = 60;
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -Math.random() * 0.5 - 0.2,
        r: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.5 + 0.2,
        baseSpeedY: -Math.random() * 0.5 - 0.2
      });
    }

    const handleResize = () => {
      // High-DPI canvas resizing
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width * dpr;
      height = canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      width = rect.width;
      height = rect.height;
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial setup

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      let bass = 0;
      let mid = 0;
      let treble = 0;
      let dataArray = null;

      // Extract real audio frequency bands if available
      if (analyserNode && isPlaying) {
        const bufferLength = analyserNode.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        analyserNode.getByteFrequencyData(dataArray);

        // Calculate frequency bands
        // Bass: first few bins (0 - 8)
        let bassSum = 0;
        for (let i = 0; i < 8; i++) {
          bassSum += dataArray[i];
        }
        bass = bassSum / 8 / 255; // 0 to 1

        // Mid: (9 - 40)
        let midSum = 0;
        for (let i = 9; i < 40; i++) {
          midSum += dataArray[i];
        }
        mid = midSum / 31 / 255;

        // Treble: (41 - 100)
        let trebleSum = 0;
        for (let i = 41; i < 100; i++) {
          trebleSum += dataArray[i];
        }
        treble = trebleSum / 59 / 255;
      }

      // --------------------------------------------------
      // 1. DYNAMIC RADIANT BACKGROUND GLOW
      // --------------------------------------------------
      const glowScale = isPlaying ? 1 + bass * 0.5 : 1.0;
      const glowOpacity = isPlaying ? 0.12 + bass * 0.18 : 0.04;
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 20,
        width / 2, height / 2, Math.max(100, width / 2.2) * glowScale
      );
      gradient.addColorStop(0, `rgba(238, 184, 249, ${glowOpacity})`);
      gradient.addColorStop(0.5, `rgba(238, 184, 249, ${glowOpacity * 0.3})`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // --------------------------------------------------
      // 2. BACKING PARTICLES (Reacts to treble)
      // --------------------------------------------------
      particles.forEach((p) => {
        // Move particle
        const jitterX = isPlaying ? (Math.random() - 0.5) * treble * 5 : 0;
        const speedMultiplier = isPlaying ? 1 + treble * 6 : 1;
        p.y += p.vy * speedMultiplier;
        p.x += p.vx + jitterX;

        // Warp bounds
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Render particle
        ctx.fillStyle = `rgba(238, 184, 249, ${p.alpha * (isPlaying ? 1 + treble * 1.5 : 1)})`;
        ctx.beginPath();
        const activeRadius = p.r * (isPlaying ? 1 + treble * 2 : 1);
        ctx.arc(p.x, p.y, activeRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // --------------------------------------------------
      // 3. REACTIVE FLOWING WAVES (Reacts to mid / bass)
      // --------------------------------------------------
      ctx.lineWidth = 1.5;
      const numLines = 4;
      for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        
        const amplitude = isPlaying 
          ? (25 + bass * 60) * (1 - i / numLines) + (Math.sin(wavePhase * 2.5 + i) * 6)
          : 8 * (1 - i / numLines) + (Math.sin(wavePhase * 1.5 + i) * 2);
        
        const frequency = isPlaying 
          ? 0.0035 + (mid * 0.003) + (i * 0.001)
          : 0.004 + (i * 0.0015);
        
        ctx.strokeStyle = `rgba(238, 184, 249, ${isPlaying ? 0.7 - i * 0.15 : 0.25 - i * 0.05})`;

        for (let x = 0; x < width; x += 3) {
          const y = height / 2 + Math.sin(x * frequency + wavePhase + (i * 0.6)) * amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // --------------------------------------------------
      // 4. VERTICAL FREQUENCY EQUALIZER BARS
      // --------------------------------------------------
      if (isPlaying && dataArray) {
        ctx.fillStyle = 'rgba(238, 184, 249, 0.06)';
        const barWidth = 4;
        const gap = 6;
        const totalBars = Math.floor(width / (barWidth + gap));
        
        for (let i = 0; i < totalBars; i++) {
          // Map bar index to frequency array index
          const dataIndex = Math.floor((i / totalBars) * (dataArray.length * 0.6));
          const val = dataArray[dataIndex] || 0;
          const barHeight = (val / 255) * (height * 0.45);
          
          ctx.fillRect(
            i * (barWidth + gap),
            height - barHeight,
            barWidth,
            barHeight
          );
        }
      } else {
        // Idle vertical frequency simulation (flat line subtle ripple)
        ctx.fillStyle = 'rgba(238, 184, 249, 0.015)';
        const barWidth = 4;
        const gap = 6;
        const totalBars = Math.floor(width / (barWidth + gap));
        for (let i = 0; i < totalBars; i++) {
          const idleHeight = Math.abs(Math.sin(i * 0.1 + wavePhase)) * 8 + 2;
          ctx.fillRect(
            i * (barWidth + gap),
            height - idleHeight,
            barWidth,
            idleHeight
          );
        }
      }

      wavePhase += isPlaying ? (0.04 + bass * 0.06) : 0.008;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [analyserNode, isPlaying]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
