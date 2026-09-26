import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, Scissors, Volume2, VolumeX, ArrowRight, RotateCcw } from 'lucide-react';

interface RibbonCuttingScreenProps {
  onComplete: () => void;
  isOpen: boolean;
}

// Particle interface for high-performance Canvas simulation
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  width: number;
  height: number;
  color: string;
  shape: 'rect' | 'circle' | 'star';
  alpha: number;
  decay: number;
  wobble: number;
  wobbleSpeed: number;
}

export const RibbonCuttingScreen: React.FC<RibbonCuttingScreenProps> = ({ onComplete, isOpen }) => {
  const [isCutting, setIsCutting] = useState(false);
  const [isCut, setIsCut] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHoveringRibbon, setIsHoveringRibbon] = useState(false);
  const [revealReady, setRevealReady] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameId = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Web Audio Procedural Sound Effects (Zero External Asset Dependency)
  const playSnipSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Metallic scissor blade friction sound (Highpass filtered white noise burst)
      const bufferSize = ctx.sampleRate * 0.12;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.03));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400, ctx.currentTime);
      filter.Q.setValueAtTime(4.0, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.7, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch {
      // Audio not supported or blocked by policy
    }
  }, [soundEnabled]);

  const playFanfareSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Triumphant ceremonial chime chord progression (C5 -> E5 -> G5 -> C6)
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.exponentialRampToValueAtTime(0.3, start + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 1.8);
      });
    } catch {
      // Audio policy safe fallback
    }
  }, [soundEnabled]);

  // Particle Engine for Confetti and Golden Sparkles
  const spawnConfetti = useCallback((centerX: number, centerY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const colors = [
      '#f59e0b', '#fbbf24', '#fef08a', // Metallic Gold shades
      '#ef4444', '#dc2626', '#b91c1c', // Crimson Red
      '#3b82f6', '#60a5fa', '#93c5fd', // Royal Blue
      '#10b981', '#34d399', '#6ee7b7', // Emerald
      '#a855f7', '#c084fc', '#e9d5ff', // Purple
      '#ffffff',                         // Pure white sparkle
    ];

    const particleCount = 220;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.8;
      const speed = 4 + Math.random() * 18;
      const shapeType: 'rect' | 'circle' | 'star' = i % 5 === 0 ? 'star' : i % 3 === 0 ? 'circle' : 'rect';

      newParticles.push({
        x: centerX + (Math.random() - 0.5) * 60,
        y: centerY + (Math.random() - 0.5) * 30,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (speed * 0.4), // Upward explosive bias
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.25,
        width: 6 + Math.random() * 8,
        height: 10 + Math.random() * 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapeType,
        alpha: 1,
        decay: 0.003 + Math.random() * 0.006,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.06 + Math.random() * 0.1,
      });
    }

    particlesRef.current = newParticles;
  }, []);

  // 60FPS Game Loop for Canvas Particles
  useEffect(() => {
    if (!isCut) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Physics integration
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28; // Gravity
        p.vx *= 0.985; // Air drag
        p.rotation += p.vRot;
        p.wobble += p.wobbleSpeed;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y > canvas.height + 50) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        const scaleX = Math.cos(p.wobble);
        ctx.scale(scaleX, 1);

        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Shimmering Star Particle
          ctx.beginPath();
          for (let s = 0; s < 5; s++) {
            ctx.lineTo(Math.cos(((18 + s * 72) * Math.PI) / 180) * p.width, -Math.sin(((18 + s * 72) * Math.PI) / 180) * p.width);
            ctx.lineTo(Math.cos(((54 + s * 72) * Math.PI) / 180) * (p.width / 2), -Math.sin(((54 + s * 72) * Math.PI) / 180) * (p.width / 2));
          }
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      if (particles.length > 0) {
        animFrameId.current = requestAnimationFrame(render);
      }
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isCut]);

  // Handle Cut Execution
  const triggerCut = useCallback(() => {
    if (isCutting || isCut) return;
    setIsCutting(true);
    playSnipSound();

    setTimeout(() => {
      setIsCut(true);
      setIsCutting(false);
      playFanfareSound();

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      spawnConfetti(centerX, centerY);

      setTimeout(() => {
        setRevealReady(true);
      }, 1200);
    }, 450);
  }, [isCutting, isCut, playSnipSound, playFanfareSound, spawnConfetti]);

  // Track cursor position for interactive scissors
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isCut) return;
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] select-none overflow-hidden transition-all duration-1000 ${
        revealReady ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      onMouseMove={handleMouseMove}
      style={{
        background: 'radial-gradient(circle at 50% 50%, #0d1a36 0%, #060b18 65%, #02050c 100%)',
      }}
    >
      {/* Confetti Animation Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-40" />

      {/* Royal Curtains (Left and Right Doors) that slide open after cut */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-red-950 via-red-900 to-red-800 z-10 shadow-2xl transition-transform duration-1000 ease-in-out ${
          isCut ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={{
          boxShadow: 'inset -20px 0 50px rgba(0,0,0,0.7)',
          backgroundImage: 'radial-gradient(ellipse at 0% 50%, rgba(255,255,255,0.06), transparent 70%)',
        }}
      >
        <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-yellow-500/40 to-transparent" />
      </div>

      <div
        className={`absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-red-950 via-red-900 to-red-800 z-10 shadow-2xl transition-transform duration-1000 ease-in-out ${
          isCut ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{
          boxShadow: 'inset 20px 0 50px rgba(0,0,0,0.7)',
          backgroundImage: 'radial-gradient(ellipse at 100% 50%, rgba(255,255,255,0.06), transparent 70%)',
        }}
      >
        <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-yellow-500/40 to-transparent" />
      </div>

      {/* Top Controls Bar */}
      <div className="absolute top-6 left-0 right-0 px-6 sm:px-12 flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center p-2 backdrop-blur-md shadow-lg shadow-amber-500/10">
            <img src="/assets/shristi-tech-logo-mark.png" alt="Shristi Tech" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Official Inauguration</span>
            </div>
            <div className="text-white text-sm font-bold tracking-tight">Shristi Tech</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-amber-300 hover:text-white hover:bg-slate-800 transition-all backdrop-blur-md"
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onComplete}
            className="px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-all backdrop-blur-md"
          >
            Skip to Site →
          </button>
        </div>
      </div>

      {/* Headline & Ceremony Intro */}
      <div
        className={`absolute top-24 left-0 right-0 text-center px-4 z-30 transition-all duration-700 ${
          isCut ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold tracking-widest uppercase mb-3 shadow-lg">
          GRAND OPENING CEREMONY
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
          Welcome to <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">Shristi Tech</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl mx-auto drop-shadow font-medium">
          Cut the ceremonial ribbon to inaugurate our digital studio &amp; live platform.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* THE SILK SATIN RIBBON STRETCHED ACROSS THE SCREEN */}
      {/* ========================================================================= */}
      <div
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-30 pointer-events-auto"
        onMouseEnter={() => setIsHoveringRibbon(true)}
        onMouseLeave={() => setIsHoveringRibbon(false)}
      >
        {/* Ribbon Left Segment */}
        <div
          onClick={triggerCut}
          className={`absolute top-0 left-0 w-1/2 h-20 sm:h-24 cursor-pointer transition-all duration-1000 ease-out origin-left ${
            isCut
              ? '-translate-x-full -rotate-12 opacity-0'
              : 'translate-x-0 rotate-0 opacity-100'
          }`}
          style={{
            background: 'linear-gradient(180deg, #b91c1c 0%, #dc2626 25%, #ef4444 50%, #dc2626 75%, #991b1b 100%)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6), inset 0 3px 6px rgba(255, 255, 255, 0.4), inset 0 -3px 6px rgba(0, 0, 0, 0.4)',
            borderTop: '3px solid #facc15',
            borderBottom: '3px solid #eab308',
          }}
        >
          {/* Silk specular highlight sheen */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          <div className="absolute top-1/2 left-10 sm:left-24 -translate-y-1/2 text-white/90 font-mono text-[11px] sm:text-xs tracking-widest uppercase font-bold hidden sm:block">
            ★ SHRISTI TECH ★
          </div>
        </div>

        {/* Ribbon Right Segment */}
        <div
          onClick={triggerCut}
          className={`absolute top-0 right-0 w-1/2 h-20 sm:h-24 cursor-pointer transition-all duration-1000 ease-out origin-right ${
            isCut
              ? 'translate-x-full rotate-12 opacity-0'
              : 'translate-x-0 rotate-0 opacity-100'
          }`}
          style={{
            background: 'linear-gradient(180deg, #b91c1c 0%, #dc2626 25%, #ef4444 50%, #dc2626 75%, #991b1b 100%)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6), inset 0 3px 6px rgba(255, 255, 255, 0.4), inset 0 -3px 6px rgba(0, 0, 0, 0.4)',
            borderTop: '3px solid #facc15',
            borderBottom: '3px solid #eab308',
          }}
        >
          {/* Silk specular highlight sheen */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-transparent pointer-events-none" />
          <div className="absolute top-1/2 right-10 sm:right-24 -translate-y-1/2 text-white/90 font-mono text-[11px] sm:text-xs tracking-widest uppercase font-bold hidden sm:block">
            ★ IDEAS TODAY • BETTER TOMORROW ★
          </div>
        </div>

        {/* Central Ceremonial Rosette / Bow and Seal */}
        <div
          onClick={triggerCut}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-700 ${
            isCut
              ? 'scale-150 opacity-0 rotate-45'
              : 'scale-100 opacity-100 hover:scale-105 active:scale-95'
          }`}
          style={{ width: '130px', height: '130px' }}
        >
          {/* Rosette ribbon petals (Backing) */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-red-700 shadow-2xl border-4 border-amber-400 animate-pulse" />

          {/* Golden Medallion Crest in center */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 border-2 border-yellow-100 flex flex-col items-center justify-center shadow-inner">
            <img src="/assets/shristi-tech-logo-mark.png" alt="Shristi Tech Crest" className="w-12 h-12 object-contain drop-shadow" />
            <span className="text-[9px] font-mono font-extrabold text-slate-900 tracking-wider uppercase mt-0.5">
              INAUGURATE
            </span>
          </div>

          {/* Golden Rosette Tails hanging downwards */}
          <div
            className="absolute top-full left-4 w-6 h-16 bg-gradient-to-b from-red-600 to-red-800 border-x-2 border-b-2 border-amber-400 shadow-lg origin-top -rotate-12"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)' }}
          />
          <div
            className="absolute top-full right-4 w-6 h-16 bg-gradient-to-b from-red-600 to-red-800 border-x-2 border-b-2 border-amber-400 shadow-lg origin-top rotate-12"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)' }}
          />
        </div>
      </div>

      {/* Interactive Golden Scissors */}
      {!isCut && (
        <div
          onClick={triggerCut}
          className={`fixed pointer-events-auto cursor-pointer transition-transform duration-150 z-40 ${
            mousePos && isHoveringRibbon
              ? ''
              : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-[130px] animate-bounce'
          }`}
          style={
            mousePos && isHoveringRibbon
              ? {
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                  transform: 'translate(-50%, -50%)',
                }
              : {}
          }
        >
          {/* Detailed Golden Ceremonial Scissors Graphic */}
          <div className={`relative w-20 h-20 transition-all ${isCutting ? 'scale-90 rotate-12' : 'hover:scale-110'}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(251,191,36,0.5)]">
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="35%" stopColor="#f59e0b" />
                  <stop offset="70%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#fef3c7" />
                </linearGradient>
                <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#fff" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>

              {/* Blade 1 */}
              <g
                style={{
                  transformOrigin: '50px 50px',
                  transform: isCutting ? 'rotate(5deg)' : 'rotate(24deg)',
                  transition: 'transform 0.15s ease-out',
                }}
              >
                <path d="M50 50 L85 20 C88 22 88 26 80 32 L50 50 Z" fill="url(#bladeGrad)" stroke="#78350f" strokeWidth="1" />
                {/* Finger Loop Handle */}
                <circle cx="28" cy="72" r="14" fill="none" stroke="url(#goldGrad)" strokeWidth="6" />
                <path d="M50 50 L35 62" stroke="url(#goldGrad)" strokeWidth="7" strokeLinecap="round" />
              </g>

              {/* Blade 2 */}
              <g
                style={{
                  transformOrigin: '50px 50px',
                  transform: isCutting ? 'rotate(-5deg)' : 'rotate(-24deg)',
                  transition: 'transform 0.15s ease-out',
                }}
              >
                <path d="M50 50 L85 45 C88 43 88 39 80 33 L50 50 Z" fill="url(#bladeGrad)" stroke="#78350f" strokeWidth="1" />
                {/* Finger Loop Handle */}
                <circle cx="28" cy="28" r="14" fill="none" stroke="url(#goldGrad)" strokeWidth="6" />
                <path d="M50 50 L35 38" stroke="url(#goldGrad)" strokeWidth="7" strokeLinecap="round" />
              </g>

              {/* Center Pivot Ruby Gem */}
              <circle cx="50" cy="50" r="5" fill="#dc2626" stroke="url(#goldGrad)" strokeWidth="2" />
            </svg>
          </div>
        </div>
      )}

      {/* Bottom CTA Button */}
      <div
        className={`absolute bottom-12 left-0 right-0 flex flex-col items-center justify-center px-4 z-40 transition-all duration-700 ${
          isCut ? 'opacity-0 translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        <button
          onClick={triggerCut}
          className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-extrabold text-sm sm:text-base tracking-wide shadow-[0_10px_35px_rgba(245,158,11,0.5)] hover:shadow-[0_15px_45px_rgba(245,158,11,0.7)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3"
        >
          <Scissors className="w-5 h-5 text-slate-950 group-hover:rotate-45 transition-transform" />
          <span>CUT THE RIBBON TO INAUGURATE</span>
          <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
        </button>
        <div className="text-[11px] font-mono text-slate-400 mt-3 flex items-center gap-2">
          <span>● Click button or tap anywhere on the ribbon to cut</span>
        </div>
      </div>

      {/* Post-Cut Celebration Modal */}
      {isCut && (
        <div className="absolute inset-0 flex items-center justify-center p-4 z-50 pointer-events-auto animate-in fade-in zoom-in duration-500">
          <div className="max-w-md w-full bg-slate-900/95 border-2 border-amber-400/80 rounded-3xl p-8 text-center shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/50 mx-auto flex items-center justify-center p-3 mb-4 shadow-lg shadow-amber-500/20">
              <img src="/assets/shristi-tech-logo-mark.png" alt="Shristi Tech" className="w-full h-full object-contain" />
            </div>

            <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-1">
              OFFICIALLY INAUGURATED
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome to Shristi Tech!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Our website is now officially live. Explore our AG TV Remote utility app, AI agent workflows, and upcoming games!
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              <button
                onClick={onComplete}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Enter Official Website</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
