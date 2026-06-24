import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, ListMusic,
  ArrowLeft, ArrowRight, Sparkles, RefreshCw, 
  Gamepad2, Sliders, Type, Compass, Palette 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import PageTransition from '../components/PageTransition';

export default function PlaygroundPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [[slide, direction], setSlide] = useState([0, 0]);
  const totalSlides = 7;

  // Lifting states up to manage autoplay suspension
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Custom Page scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = () => {
    setSlide([(slide + 1) % totalSlides, 1]);
  };

  const handlePrev = () => {
    setSlide([(slide - 1 + totalSlides) % totalSlides, -1]);
  };

  // Slowly autoplay slider when not hovered or active
  useEffect(() => {
    if (isHovered || isPlayingMusic || isPlayingGame) return;
    const interval = setInterval(() => {
      handleNext();
    }, 10000); // 10 seconds slow autoplay
    return () => clearInterval(interval);
  }, [isHovered, isPlayingMusic, isPlayingGame, slide]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 120 : direction < 0 ? -120 : 0,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 120 : direction > 0 ? -120 : 0,
      opacity: 0,
      scale: 0.98
    })
  };

  return (
    <>
      <PageTransition />
      <div className="min-h-screen bg-bg-light pt-28 pb-20 overflow-hidden">
        
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <span className="font-mono text-[10px] uppercase tracking-widest text-violet font-bold block mb-3">
            {t.playground.tag}
          </span>
          <div className="border-b border-border-light pb-8">
            <h1 className="font-display font-black text-display-lg leading-none uppercase text-charcoal-light tracking-tighter mb-4">
              {t.playground.title}
            </h1>
            <p className="font-syne font-bold text-lg md:text-xl text-charcoal max-w-2xl mb-2 leading-tight">
              {t.playground.subtitle}
            </p>
            <p className="text-sm md:text-base text-charcoal-muted max-w-xl font-light leading-relaxed">
              {t.playground.intro}
            </p>
          </div>
        </div>

        {/* Carousel / Slider Showcase */}
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="max-w-7xl mx-auto px-6 md:px-12 relative flex flex-col items-center"
        >
          
          {/* Main Slider Track */}
          <div className="w-full relative min-h-[580px] lg:min-h-[520px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={slide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.35 },
                  scale: { duration: 0.35 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(e, info) => {
                  const swipe = info.offset.x;
                  const velocity = info.velocity.x;
                  if (swipe < -60 || velocity < -500) {
                    handleNext();
                  } else if (swipe > 60 || velocity > 500) {
                    handlePrev();
                  }
                }}
                className="w-full cursor-grab active:cursor-grabbing"
              >
                {renderActiveCard(slide, language, t, setIsPlayingMusic, setIsPlayingGame)}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="w-full flex justify-between items-center mt-8 pt-4 border-t border-border-light">
            {/* Position Tracker */}
            <div className="font-mono text-xs uppercase tracking-widest text-charcoal-muted">
              <span className="font-black text-charcoal">0{slide + 1}</span> / 0{totalSlides}
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                onPointerDown={(e) => e.stopPropagation()}
                className="h-10 w-10 border border-border-light rounded-full flex items-center justify-center text-charcoal hover:border-violet hover:bg-violet/10 transition-all duration-300 interactive-hover cursor-none"
                aria-label="Previous experiment"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                onPointerDown={(e) => e.stopPropagation()}
                className="h-10 w-10 border border-border-light rounded-full flex items-center justify-center text-charcoal hover:border-violet hover:bg-violet/10 transition-all duration-300 interactive-hover cursor-none"
                aria-label="Next experiment"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

// ----------------------------------------------------
// CARD RENDER MANAGER
// ----------------------------------------------------
function renderActiveCard(index, lang, t, setIsPlayingMusic, setIsPlayingGame) {
  switch (index) {
    case 0:
      return <MusicVisualizerCard lang={lang} t={t} onPlayStateChange={setIsPlayingMusic} />;
    case 1:
      return <TypoMotionCard lang={lang} t={t} />;
    case 2:
      return <InteractivePosterCard lang={lang} t={t} />;
    case 3:
      return <ColorLabCard lang={lang} t={t} />;
    case 4:
      return <UIPlaygroundCard lang={lang} t={t} />;
    case 5:
      return <MiniGameCard lang={lang} t={t} onGameStateChange={setIsPlayingGame} />;
    case 6:
      return <VisualExperimentCard lang={lang} t={t} />;
    default:
      return null;
  }
}

// ----------------------------------------------------
// 01 / MUSIX VISUALIZER CARD
// ----------------------------------------------------
function MusicVisualizerCard({ lang, t, onPlayStateChange }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);
  const [activeTrack, setActiveTrack] = useState(0);
  const [showQueue, setShowQueue] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const playlist = [
    { title: "Line Theory", artist: "Hassen Arkab", duration: "03:14" },
    { title: "Beat Generation", artist: "Hassen Arkab", duration: "02:45" },
    { title: "Digital Horizon", artist: "Hassen Arkab", duration: "03:52" }
  ];

  // Notify parent component about play state changes for autoplay suspension
  useEffect(() => {
    if (onPlayStateChange) {
      onPlayStateChange(isPlaying);
    }
  }, [isPlaying, onPlayStateChange]);

  // Simulated playback progress
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.2));
      }, 200);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Audio wave canvas simulation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let wavePhase = 0;

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Render glowing ambient backing
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width / 1.3);
      gradient.addColorStop(0, isPlaying ? 'rgba(238, 184, 249, 0.2)' : 'rgba(238, 184, 249, 0.05)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw reactive sine waves
      ctx.strokeStyle = '#EEB8F9';
      ctx.lineWidth = 1.5;
      const numLines = 5;

      for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        const amplitude = (isPlaying ? 55 : 8) * (1 - i / numLines) + (Math.sin(wavePhase * 2 + i) * 4);
        const frequency = 0.005 + (i * 0.002);
        
        ctx.strokeStyle = `rgba(238, 184, 249, ${0.8 - i * 0.15})`;

        for (let x = 0; x < width; x++) {
          const y = height / 2 + Math.sin(x * frequency + wavePhase + (i * 0.5)) * amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Draw vertical frequency bars inside player art background
      if (isPlaying) {
        ctx.fillStyle = 'rgba(238, 184, 249, 0.1)';
        const barWidth = 4;
        const gap = 6;
        const totalBars = Math.floor(width / (barWidth + gap));
        for (let i = 0; i < totalBars; i++) {
          const barHeight = Math.abs(Math.sin(i * 0.1 + wavePhase * 1.5)) * (height * 0.35);
          ctx.fillRect(i * (barWidth + gap), height - barHeight, barWidth, barHeight);
        }
      }

      wavePhase += isPlaying ? 0.08 : 0.015;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  const getTrackDurationSeconds = (durationStr) => {
    const [min, sec] = durationStr.split(':').map(Number);
    return min * 60 + sec;
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const totalSeconds = getTrackDurationSeconds(playlist[activeTrack].duration);
  const elapsedSeconds = (progress / 100) * totalSeconds;

  const handleTimelineClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (clickX / width) * 100));
    setProgress(percentage);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Visual Workspace Column (Span 7) */}
      <div 
        className="lg:col-span-7 border border-border-light rounded-xl overflow-hidden bg-charcoal min-h-[340px] md:min-h-[420px] relative flex items-center justify-center p-8 select-none"
        onPointerDown={(e) => e.stopPropagation()}
      >
        
        {/* Dynamic canvas node */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Floating audio control overlay */}
        <div className="relative z-10 w-full max-w-sm bg-charcoal/90 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl flex flex-col gap-4 text-white">
          <div className="flex gap-4 items-center">
            {/* Album Cover Art */}
            <div className="w-16 h-16 rounded bg-gradient-to-tr from-violet to-charcoal-muted flex items-center justify-center relative overflow-hidden flex-shrink-0">
              <div className={`absolute inset-0 bg-violet/20 animate-pulse ${isPlaying ? 'scale-105' : 'scale-100'}`} />
              <Sparkles size={24} className={`text-violet ${isPlaying ? 'animate-spin-slow' : ''}`} />
            </div>
            {/* Song Meta */}
            <div className="flex-1 min-w-0">
              <h4 className="font-syne font-bold text-sm truncate uppercase tracking-wide">
                {playlist[activeTrack].title}
              </h4>
              <p className="text-xs text-white/55 font-mono tracking-widest uppercase">
                {playlist[activeTrack].artist}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowQueue(!showQueue)}
                className={`p-1 transition-colors cursor-none ${showQueue ? 'text-violet' : 'text-white/50 hover:text-white'}`}
                title="Toggle playlist"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <ListMusic size={16} />
              </button>
              <Volume2 size={16} className={`text-violet ${isPlaying ? 'animate-bounce' : 'opacity-50'}`} />
            </div>
          </div>

          {showQueue ? (
            <div className="border-t border-white/10 pt-3 mt-1 space-y-2 max-h-32 overflow-y-auto hide-scrollbar" onPointerDown={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center font-mono text-[9px] uppercase tracking-widest text-white/40 pb-1">
                <span>Play Queue / Playlist</span>
                <button 
                  onClick={() => setShowQueue(false)}
                  className="text-violet hover:underline cursor-none"
                >
                  Close
                </button>
              </div>
              {playlist.map((track, idx) => (
                <div 
                  key={track.title}
                  onClick={() => {
                    setActiveTrack(idx);
                    setProgress(0);
                    setIsPlaying(true);
                  }}
                  className={`flex justify-between items-center p-2 rounded text-xs cursor-none transition-colors ${
                    activeTrack === idx ? 'bg-violet/20 text-violet font-bold' : 'hover:bg-white/5 text-white/70'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-[9px] opacity-40">0{idx + 1}</span>
                    <span className="truncate">{track.title}</span>
                  </div>
                  <span className="font-mono text-[9px] opacity-50">{track.duration}</span>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Timeline slider */}
              <div 
                className="space-y-1.5 cursor-pointer"
                onClick={handleTimelineClick}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <div className="relative h-1 w-full bg-white/10 rounded overflow-hidden">
                  <div 
                    className="h-full bg-violet transition-all duration-300 ease-out" 
                    style={{ width: `${progress}%` }} 
                  />
                </div>
                <div className="flex justify-between font-mono text-[9px] text-white/40 uppercase tracking-widest">
                  <span>{formatTime(elapsedSeconds)}</span>
                  <span>{playlist[activeTrack].duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-around items-center pt-2">
                <button 
                  onClick={() => {
                    setActiveTrack((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
                    setProgress(0);
                  }}
                  className="text-white/70 hover:text-violet transition-colors cursor-none"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <SkipBack size={18} />
                </button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="h-12 w-12 rounded-full bg-violet text-charcoal flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-none shadow-lg shadow-violet/20"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  {isPlaying ? <Pause size={20} className="fill-charcoal" /> : <Play size={20} className="fill-charcoal ml-0.5" />}
                </button>
                <button 
                  onClick={() => {
                    setActiveTrack((prev) => (prev + 1) % playlist.length);
                    setProgress(0);
                  }}
                  className="text-white/70 hover:text-violet transition-colors cursor-none"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <SkipForward size={18} />
                </button>
              </div>
            </>
          )}
        </div>

        <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest text-white/45 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
          <span>Interactive Audio Experiment</span>
        </div>
      </div>

      {/* Narrative info column (Span 5) */}
      <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-violet font-bold">
            01 / INTERACTIVE PLAYER
          </span>
          <h2 className="font-syne font-black text-3xl sm:text-4xl text-charcoal-light uppercase mt-1 leading-none">
            MUSIX VISUALIZER
          </h2>
          <p className="font-mono text-[10px] text-charcoal-muted uppercase tracking-widest mt-1">
            Music Experience / Interactive Visualizer / Front-end Experiment
          </p>
        </div>

        <p className="text-sm text-charcoal leading-relaxed font-light">
          {lang === 'fr' 
            ? "Une interface expérimentale de lecteur musical combinant lecture audio, visuels immersifs et visualizer réactif en arrière-plan, inspirée des interfaces modernes de streaming musical."
            : "An experimental music player interface combining audio playback, immersive visuals and a reactive background visualizer inspired by modern streaming interfaces."}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {["Web Audio API", "HTML5 Canvas", "UI Music", "Motion"].map((tag) => (
            <span key={tag} className="text-[9px] font-mono uppercase tracking-widest border border-border-light px-2.5 py-0.5 rounded-full bg-charcoal/[0.01] text-charcoal-muted">
              {tag}
            </span>
          ))}
        </div>

        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          onPointerDown={(e) => e.stopPropagation()}
          className="group self-start inline-flex items-center gap-2 px-5 py-2.5 border border-charcoal text-xs font-mono uppercase tracking-widest font-bold hover:bg-charcoal hover:text-white transition-all duration-300 cursor-none interactive-hover rounded"
        >
          {isPlaying ? (lang === 'fr' ? 'PAUSE PROJET' : 'PAUSE EXPERIENCE') : (lang === 'fr' ? 'LANCER L\'EXPÉRIENCE' : 'LAUNCH EXPERIENCE')}
          <Sparkles size={12} className={isPlaying ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'} />
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 02 / TYPO MOTION CARD
// ----------------------------------------------------
function TypoMotionCard({ lang, t }) {
  const [hoverText, setHoverText] = useState(false);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      <div 
        onMouseEnter={() => setHoverText(true)}
        onMouseLeave={() => setHoverText(false)}
        className="lg:col-span-7 border border-border-light rounded-xl overflow-hidden bg-bg-light min-h-[300px] md:min-h-[400px] relative flex flex-col justify-center p-8 select-none cursor-none"
      >
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        
        {/* Kinematic sliding text rows */}
        <div className="space-y-2 overflow-hidden flex flex-col items-center">
          <div className="w-max flex gap-8 animate-marquee whitespace-nowrap font-display font-black text-3xl sm:text-5xl text-charcoal/[0.03]">
            <span>KINETIC MOTION STUDY &bull; EVERY TRAIT COUNTS &bull;</span>
            <span>KINETIC MOTION STUDY &bull; EVERY TRAIT COUNTS &bull;</span>
          </div>
          
          {/* Main Interactive text block */}
          <h3 className="font-display font-black text-4xl sm:text-6xl text-center leading-none text-charcoal uppercase tracking-tighter transition-all duration-700 ease-out select-none transform hover:scale-105">
            {hoverText ? (
              <span className="text-violet">
                {lang === 'fr' ? 'MOUVEMENT' : 'MOTION'}
              </span>
            ) : (
              <span>
                {lang === 'fr' ? 'TYPOGRAPHIE' : 'TYPOGRAPHY'}
              </span>
            )}
          </h3>

          <div className="w-max flex gap-8 animate-marquee whitespace-nowrap font-display font-black text-3xl sm:text-5xl text-charcoal/[0.03] direction-reverse">
            <span>EXPLORATION DIGITAL ART &bull; PARIS 2026 &bull;</span>
            <span>EXPLORATION DIGITAL ART &bull; PARIS 2026 &bull;</span>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest text-charcoal-muted animate-pulse">
          {lang === 'fr' ? 'Survolez pour interagir' : 'Hover cursor to interact'}
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-violet font-bold">
            02 / KINETIC MOTION
          </span>
          <h2 className="font-syne font-black text-3xl sm:text-4xl text-charcoal-light uppercase mt-1 leading-none">
            TYPO MOTION
          </h2>
          <p className="font-mono text-[10px] text-charcoal-muted uppercase tracking-widest mt-1">
            Typography / Motion Design / Experimental
          </p>
        </div>

        <p className="text-sm text-charcoal leading-relaxed font-light">
          {lang === 'fr' 
            ? "Des études de typographie animée autour du rythme, des transitions et du motion design pour donner vie aux mots dans le navigateur."
            : "Animated typography studies exploring rhythm, transitions and motion design to bring text layouts to life directly in the viewport."}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {["CSS Marquee", "Framer Motion", "Text Reveal", "Typography"].map((tag) => (
            <span key={tag} className="text-[9px] font-mono uppercase tracking-widest border border-border-light px-2.5 py-0.5 rounded-full bg-charcoal/[0.01] text-charcoal-muted">
              {tag}
            </span>
          ))}
        </div>

        <div className="p-4 border border-dashed border-border-light rounded bg-charcoal/[0.01] text-xs font-mono text-charcoal-muted uppercase tracking-widest">
          {lang === 'fr' ? 'Expérimentation active en survol' : 'Active Hover Experimentation'}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 03 / INTERACTIVE POSTER CARD
// ----------------------------------------------------
function InteractivePosterCard({ lang, t }) {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // range -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // range -0.5 to 0.5
    setTilt({ x: x * 20, y: y * -20 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="lg:col-span-7 border border-border-light rounded-xl overflow-hidden bg-bg-light min-h-[300px] md:min-h-[400px] relative flex items-center justify-center p-8 select-none cursor-none"
      >
        <div className="absolute inset-0 bg-[#111111]/[0.02] bg-grid opacity-10 pointer-events-none" />

        {/* 3D tilted poster container */}
        <motion.div 
          style={{ 
            rotateY: tilt.x, 
            rotateX: tilt.y,
            transformStyle: 'preserve-3d'
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-sm aspect-[3/4.2] border border-charcoal/20 bg-bg-light shadow-2xl p-6 flex flex-col justify-between relative"
        >
          {/* Top banner */}
          <div className="flex justify-between items-baseline font-mono text-[8px] uppercase tracking-widest text-charcoal">
            <span>/ POSTER 03</span>
            <span>AESTHETIC LABORATORY</span>
          </div>

          {/* Central geometric design element */}
          <div className="flex-1 flex items-center justify-center relative my-4">
            <div className="w-32 h-32 rounded-full border-2 border-dashed border-violet animate-spin-slow absolute opacity-70" />
            <div className="w-20 h-20 bg-violet rotate-45 transform hover:rotate-90 transition-transform duration-700 flex items-center justify-center relative shadow-lg">
              <Sparkles className="text-charcoal -rotate-45" size={24} />
            </div>
            <div className="absolute bottom-4 font-mono text-[9px] text-charcoal-muted uppercase tracking-widest">
              Grid Node // 12
            </div>
          </div>

          {/* Bottom typography */}
          <div className="space-y-1">
            <h4 className="font-display font-black text-2xl text-charcoal uppercase leading-none tracking-tighter">
              EVERYTHING STARTS WITH A LINE
            </h4>
            <div className="flex justify-between font-mono text-[8px] uppercase tracking-widest text-charcoal/60">
              <span>Hassen Arkab</span>
              <span>2026 Edition</span>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest text-charcoal-muted">
          {lang === 'fr' ? 'Déplacez la souris pour l\'effet 3D' : 'Move cursor for 3D parallax'}
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-violet font-bold">
            03 / GRAPHIC INTERACTION
          </span>
          <h2 className="font-syne font-black text-3xl sm:text-4xl text-charcoal-light uppercase mt-1 leading-none">
            INTERACTIVE POSTER
          </h2>
          <p className="font-mono text-[10px] text-charcoal-muted uppercase tracking-widest mt-1">
            Interaction / Graphic Design / Layout Experiment
          </p>
        </div>

        <p className="text-sm text-charcoal leading-relaxed font-light">
          {lang === 'fr' 
            ? "Une expérimentation d’affiche digitale interactive explorant le parallax 3D en temps réel et des éléments de conception graphique qui répondent aux mouvements de l'utilisateur."
            : "A digital poster experiment exploring real-time 3D parallax effects and geometric layouts that respond to user cursor movement."}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {["3D Parallax", "Framer Motion", "Layout", "Poster Art"].map((tag) => (
            <span key={tag} className="text-[9px] font-mono uppercase tracking-widest border border-border-light px-2.5 py-0.5 rounded-full bg-charcoal/[0.01] text-charcoal-muted">
              {tag}
            </span>
          ))}
        </div>

        <div className="p-4 border border-dashed border-border-light rounded bg-charcoal/[0.01] text-xs font-mono text-charcoal-muted uppercase tracking-widest">
          {lang === 'fr' ? 'Expérimentation 3D active' : 'Active 3D Experimentation'}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 04 / COLOR LAB CARD
// ----------------------------------------------------
function ColorLabCard({ lang, t }) {
  const [hue, setHue] = useState(280);
  const [saturation, setSaturation] = useState(80);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      <div 
        className="lg:col-span-7 border border-border-light rounded-xl overflow-hidden min-h-[300px] md:min-h-[400px] relative flex flex-col justify-between p-8 select-none transition-all duration-500 cursor-none"
        style={{
          background: `radial-gradient(circle at 70% 30%, hsl(${hue}, ${saturation}%, 85%) 0%, #FAFAF7 70%)`
        }}
      >
        <div className="flex justify-between items-baseline font-mono text-[9px] uppercase tracking-widest text-charcoal/50">
          <span>/ COLOR LAB 04</span>
          <span>HUE GENERATOR</span>
        </div>

        {/* Interactive color generator controllers */}
        <div 
          className="w-full max-w-xs mx-auto bg-white/80 backdrop-blur border border-charcoal/10 rounded-lg p-6 shadow-xl space-y-4"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="space-y-1">
            <label className="flex justify-between font-mono text-[9px] uppercase tracking-widest text-charcoal-muted">
              <span>Hue (Teinte)</span>
              <span className="font-bold text-charcoal">{hue}°</span>
            </label>
            <input 
              type="range" 
              min="0" 
              max="360" 
              value={hue} 
              onChange={(e) => setHue(Number(e.target.value))}
              className="w-full h-1 bg-charcoal/10 rounded-lg appearance-none cursor-none accent-violet"
            />
          </div>

          <div className="space-y-1">
            <label className="flex justify-between font-mono text-[9px] uppercase tracking-widest text-charcoal-muted">
              <span>Saturation</span>
              <span className="font-bold text-charcoal">{saturation}%</span>
            </label>
            <input 
              type="range" 
              min="20" 
              max="100" 
              value={saturation} 
              onChange={(e) => setSaturation(Number(e.target.value))}
              className="w-full h-1 bg-charcoal/10 rounded-lg appearance-none cursor-none accent-violet"
            />
          </div>

          <button 
            onClick={() => {
              setHue(Math.floor(Math.random() * 360));
              setSaturation(Math.floor(Math.random() * 50) + 50);
            }}
            className="w-full flex items-center justify-center gap-2 bg-charcoal text-white hover:bg-violet hover:text-charcoal font-mono text-[10px] uppercase font-bold py-2 rounded transition-colors duration-300 cursor-none"
          >
            <RefreshCw size={12} />
            Randomize Palette
          </button>
        </div>

        <div className="flex justify-between items-baseline font-mono text-[8px] uppercase tracking-widest text-charcoal/40">
          <span>HSL({hue}, {saturation}%, 85%)</span>
          <span>Paris, FR</span>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-violet font-bold">
            04 / GRADIENT LAB
          </span>
          <h2 className="font-syne font-black text-3xl sm:text-4xl text-charcoal-light uppercase mt-1 leading-none">
            COLOR LAB
          </h2>
          <p className="font-mono text-[10px] text-charcoal-muted uppercase tracking-widest mt-1">
            Color / Gradients / Creative Harmony
          </p>
        </div>

        <p className="text-sm text-charcoal leading-relaxed font-light">
          {lang === 'fr' 
            ? "Un terrain d’expérimentation visuelle autour des palettes de couleurs, des dégradés dynamiques et des harmonies d'interface pour générer des ambiances graphiques."
            : "A playground for gradients, palettes, visual harmony and interface moods, allowing users to explore color logic interactively."}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {["Color Theory", "Dynamic HSL", "CSS Gradients", "UI Playground"].map((tag) => (
            <span key={tag} className="text-[9px] font-mono uppercase tracking-widest border border-border-light px-2.5 py-0.5 rounded-full bg-charcoal/[0.01] text-charcoal-muted">
              {tag}
            </span>
          ))}
        </div>

        <div className="p-4 border border-dashed border-border-light rounded bg-charcoal/[0.01] text-xs font-mono text-charcoal-muted uppercase tracking-widest">
          {lang === 'fr' ? 'Générateur de teinte actif' : 'Active Gradient Generator'}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 05 / UI PLAYGROUND CARD
// ----------------------------------------------------
function UIPlaygroundCard({ lang, t }) {
  const [toggleActive, setToggleActive] = useState(false);
  const [sliderVal, setSliderVal] = useState(60);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      <div className="lg:col-span-7 border border-border-light rounded-xl overflow-hidden bg-bg-light min-h-[300px] md:min-h-[400px] relative flex flex-col justify-between p-8 select-none cursor-none">
        <div className="absolute inset-0 bg-[#111111]/[0.02] bg-grid opacity-10 pointer-events-none" />

        <div className="flex justify-between items-baseline font-mono text-[9px] uppercase tracking-widest text-charcoal/50">
          <span>/ CONTROLS LAB 05</span>
          <span>SATISFYING UI COMPONENTS</span>
        </div>

        {/* Satisfying interactive micro components */}
        <div 
          className="w-full max-w-xs mx-auto space-y-6 bg-white/70 border border-charcoal/10 rounded-lg p-6 shadow-xl"
          onPointerDown={(e) => e.stopPropagation()}
        >
          
          {/* Satisfying Toggle */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase font-bold text-charcoal">Toggle Switch</span>
            <button 
              onClick={() => setToggleActive(!toggleActive)}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 flex items-center cursor-none ${toggleActive ? 'bg-violet' : 'bg-charcoal/15'}`}
            >
              <motion.div 
                layout 
                className="w-4 h-4 rounded-full bg-charcoal shadow"
              />
            </button>
          </div>

          {/* Satisfying Slider */}
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] uppercase font-bold text-charcoal">
              <span>Dynamic width slider</span>
              <span>{sliderVal}%</span>
            </div>
            <input 
              type="range"
              min="0"
              max="100"
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
              className="w-full h-1 bg-charcoal/10 rounded-lg appearance-none cursor-none accent-violet"
            />
            {/* Display width based on slider */}
            <div 
              className="h-2 bg-violet rounded transition-all duration-150 ease-out" 
              style={{ width: `${sliderVal}%` }}
            />
          </div>

          {/* Morphing micro Button */}
          <button 
            className="w-full bg-charcoal text-white hover:bg-violet hover:text-charcoal font-mono text-[10px] uppercase tracking-wider font-bold py-2 rounded transition-all duration-300 flex items-center justify-center gap-2 cursor-none"
          >
            <Sliders size={12} />
            <span>Apply Micro adjustments</span>
          </button>
        </div>

        <div className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted text-center">
          {lang === 'fr' ? 'Interagissez avec les éléments' : 'Interact with components'}
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-violet font-bold">
            05 / MICRO INTERACTIONS
          </span>
          <h2 className="font-syne font-black text-3xl sm:text-4xl text-charcoal-light uppercase mt-1 leading-none">
            UI PLAYGROUND
          </h2>
          <p className="font-mono text-[10px] text-charcoal-muted uppercase tracking-widest mt-1">
            Micro-interactions / Interface Design / UI Explorations
          </p>
        </div>

        <p className="text-sm text-charcoal leading-relaxed font-light">
          {lang === 'fr' 
            ? "Une collection de micro-expérimentations d’interface, d’interactions de boutons et d'idées d’animations fluides pour des composants UI satisfaisants."
            : "A collection of micro-interface experiments, interactions and animation concepts for building highly satisfying UI controls."}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {["CSS Springs", "Satisfying UI", "Micro Motion", "Framer Layout"].map((tag) => (
            <span key={tag} className="text-[9px] font-mono uppercase tracking-widest border border-border-light px-2.5 py-0.5 rounded-full bg-charcoal/[0.01] text-charcoal-muted">
              {tag}
            </span>
          ))}
        </div>

        <div className="p-4 border border-dashed border-border-light rounded bg-charcoal/[0.01] text-xs font-mono text-charcoal-muted uppercase tracking-widest">
          {lang === 'fr' ? 'Composants interactifs actifs' : 'Active Interactive Components'}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 06 / MINI GAME CARD (PLAYABLE!)
// ----------------------------------------------------
function MiniGameCard({ lang, t, onGameStateChange }) {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState('idle'); // idle, playing, over
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Game stats
  const basket = useRef({ x: 120, w: 50, h: 10, speed: 20 });
  const star = useRef({ x: 100, y: 0, r: 8, speed: 4 });
  const pointerX = useRef(120);

  // Notify parent component about game state changes for autoplay suspension
  useEffect(() => {
    if (onGameStateChange) {
      onGameStateChange(gameState);
    }
  }, [gameState, onGameStateChange]);

  const startGame = () => {
    setScore(0);
    setGameState('playing');
    basket.current.x = 120;
    star.current.y = 0;
    star.current.x = Math.random() * 240 + 20;
    star.current.speed = 4;
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    pointerX.current = x;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    const gameLoop = () => {
      ctx.clearRect(0, 0, width, height);

      // Grid backing
      ctx.strokeStyle = 'rgba(0,0,0,0.02)';
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      if (gameState === 'playing') {
        // Move basket toward pointer
        const targetX = pointerX.current - basket.current.w / 2;
        basket.current.x += (targetX - basket.current.x) * 0.25;

        // Fall star
        star.current.y += star.current.speed;

        // Collision check
        if (
          star.current.y + star.current.r >= height - 40 &&
          star.current.y - star.current.r <= height - 30 &&
          star.current.x >= basket.current.x &&
          star.current.x <= basket.current.x + basket.current.w
        ) {
          // Point!
          setScore((prev) => {
            const next = prev + 1;
            if (next > highScore) setHighScore(next);
            return next;
          });
          star.current.y = 0;
          star.current.x = Math.random() * (width - 40) + 20;
          star.current.speed = 4 + score * 0.2; // Speed up
        }

        // Out of bounds check
        if (star.current.y > height) {
          setGameState('over');
        }

        // Draw star
        ctx.fillStyle = '#EEB8F9';
        ctx.beginPath();
        ctx.arc(star.current.x, star.current.y, star.current.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = '#EEB8F9';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(star.current.x, star.current.y, star.current.r - 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw basket
        ctx.fillStyle = '#111111';
        ctx.fillRect(basket.current.x, height - 40, basket.current.w, basket.current.h);
      }

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [gameState, score, highScore]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      <div 
        onMouseMove={handleMouseMove}
        onPointerDown={(e) => e.stopPropagation()}
        className="lg:col-span-7 border border-border-light rounded-xl overflow-hidden bg-bg-light h-[350px] md:h-[400px] relative flex flex-col items-center justify-center p-8 select-none cursor-none"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* UI overlays based on game state */}
        {gameState === 'idle' && (
          <div className="relative z-10 text-center space-y-4 max-w-xs bg-white/95 border border-charcoal/10 rounded-lg p-6 shadow-xl">
            <Gamepad2 className="text-violet mx-auto" size={32} />
            <h4 className="font-syne font-bold text-sm uppercase tracking-wide">
              {lang === 'fr' ? 'Jeu Catcher Étoile' : 'Star Catcher arcade'}
            </h4>
            <p className="font-mono text-[9px] text-charcoal-muted uppercase tracking-widest leading-relaxed">
              {lang === 'fr' ? 'Déplacez la plateforme pour attraper les étoiles violettes !' : 'Move the slider with your cursor to catch the falling stars!'}
            </p>
            <button 
              onClick={startGame}
              onPointerDown={(e) => e.stopPropagation()}
              className="bg-charcoal text-white font-mono text-[10px] uppercase font-bold py-2 px-6 rounded hover:bg-violet hover:text-charcoal transition-colors cursor-none"
            >
              Start Game
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="absolute top-4 left-4 flex gap-4 font-mono text-[9px] uppercase tracking-widest text-charcoal">
            <span>Score: <span className="font-bold">{score}</span></span>
            <span>High: <span className="font-bold">{highScore}</span></span>
          </div>
        )}

        {gameState === 'over' && (
          <div className="relative z-10 text-center space-y-4 max-w-xs bg-white/95 border border-charcoal/10 rounded-lg p-6 shadow-xl">
            <h4 className="font-syne font-black text-lg text-charcoal uppercase leading-none">
              Game Over
            </h4>
            <p className="font-mono text-[10px] text-charcoal-muted uppercase tracking-widest">
              Final Score: <span className="font-black text-charcoal">{score}</span>
            </p>
            <button 
              onClick={startGame}
              onPointerDown={(e) => e.stopPropagation()}
              className="bg-charcoal text-white font-mono text-[10px] uppercase font-bold py-2 px-6 rounded hover:bg-violet hover:text-charcoal transition-colors cursor-none"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-violet font-bold">
            06 / RETRO ARCADE
          </span>
          <h2 className="font-syne font-black text-3xl sm:text-4xl text-charcoal-light uppercase mt-1 leading-none">
            MINI GAME
          </h2>
          <p className="font-mono text-[10px] text-charcoal-muted uppercase tracking-widest mt-1">
            Game Design / Playful mechanics / Canvas
          </p>
        </div>

        <p className="text-sm text-charcoal leading-relaxed font-light">
          {lang === 'fr' 
            ? "Un petit concept jouable dans le navigateur, entre mécanique ludique et design d'interface, utilisant des animations à 60 FPS sur Canvas."
            : "A small browser-based game concept mixing playful mechanics and interface design, demonstrating high-performance canvas loops."}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {["Arcade Node", "Playable Canvas", "60 FPS Render", "HTML5 Game"].map((tag) => (
            <span key={tag} className="text-[9px] font-mono uppercase tracking-widest border border-border-light px-2.5 py-0.5 rounded-full bg-charcoal/[0.01] text-charcoal-muted">
              {tag}
            </span>
          ))}
        </div>

        <button 
          onClick={startGame}
          onPointerDown={(e) => e.stopPropagation()}
          className="group self-start inline-flex items-center gap-2 px-5 py-2.5 border border-charcoal text-xs font-mono uppercase tracking-widest font-bold hover:bg-charcoal hover:text-white transition-all duration-300 cursor-none interactive-hover rounded"
        >
          {lang === 'fr' ? 'JOUER AU JEU' : 'PLAY ARCADE GAME'}
          <Gamepad2 size={12} className="group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 07 / VISUAL EXPERIMENT CARD
// ----------------------------------------------------
function VisualExperimentCard({ lang, t }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, active: false });

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouse.current.x = e.clientX - rect.left;
    mouse.current.y = e.clientY - rect.top;
    mouse.current.active = true;
  };

  const handleMouseLeave = () => {
    mouse.current.active = false;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    // Create particles
    const particles = [];
    const numParticles = 40;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        r: Math.random() * 3 + 1
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Back grid
      ctx.strokeStyle = 'rgba(0,0,0,0.01)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }

      // Draw particle connections
      for (let i = 0; i < numParticles; i++) {
        const p1 = particles[i];
        
        // Move particle
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce walls
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Draw particle
        ctx.fillStyle = '#111111';
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.r, 0, Math.PI * 2);
        ctx.fill();

        // Connect to mouse
        if (mouse.current.active) {
          const dx = mouse.current.x - p1.x;
          const dy = mouse.current.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(238, 184, 249, ${1 - dist / 120})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(mouse.current.x, mouse.current.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.stroke();
          }
        }

        // Connect to other particles
        for (let j = i + 1; j < numParticles; j++) {
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.08 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onPointerDown={(e) => e.stopPropagation()}
        className="lg:col-span-7 border border-border-light rounded-xl overflow-hidden bg-bg-light min-h-[300px] md:min-h-[400px] relative flex flex-col justify-between p-8 select-none cursor-none"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        <div className="flex justify-between items-baseline font-mono text-[9px] uppercase tracking-widest text-charcoal/50 z-10">
          <span>/ PARTICLE SYSTEM 07</span>
          <span>NODE EXPERIMENT</span>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest text-charcoal-muted animate-pulse z-10">
          {lang === 'fr' ? 'Déplacez la souris sur le canevas' : 'Move cursor over canvas'}
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-violet font-bold">
            07 / VISUAL CODE
          </span>
          <h2 className="font-syne font-black text-3xl sm:text-4xl text-charcoal-light uppercase mt-1 leading-none">
            VISUAL EXPERIMENT
          </h2>
          <p className="font-mono text-[10px] text-charcoal-muted uppercase tracking-widest mt-1">
            Art Direction / Digital Composition / Motion
          </p>
        </div>

        <p className="text-sm text-charcoal leading-relaxed font-light">
          {lang === 'fr' 
            ? "Une expérimentation graphique en temps réel autour des systèmes de particules et des structures de réseaux de nœuds réactifs."
            : "A real-time graphic experiment exploring particle systems and reactive node networks that link dynamically to the cursor."}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {["Particle Web", "Generative Art", "HTML5 Canvas", "Math Node"].map((tag) => (
            <span key={tag} className="text-[9px] font-mono uppercase tracking-widest border border-border-light px-2.5 py-0.5 rounded-full bg-charcoal/[0.01] text-charcoal-muted">
              {tag}
            </span>
          ))}
        </div>

        <div className="p-4 border border-dashed border-border-light rounded bg-charcoal/[0.01] text-xs font-mono text-charcoal-muted uppercase tracking-widest">
          {lang === 'fr' ? 'Système de particules actif' : 'Active Node System'}
        </div>
      </div>
    </div>
  );
}
