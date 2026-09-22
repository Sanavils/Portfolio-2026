import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ListMusic, Sparkles, Maximize2, EyeOff, Eye
} from 'lucide-react';
import * as THREE from 'three';
import { playgroundTracks } from '../../../data/playgroundTracks';
import AudioReactiveScene from './AudioReactiveScene';
import TrackList, { TrackCover } from './TrackList';

export default function MusicPlayer({ lang, onPlayStateChange, isFullScreen = false, onBack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeTrack, setActiveTrack] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [error, setError] = useState(null);
  const [isUIVisible, setIsUIVisible] = useState(true); // Fullscreen immersive toggle

  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animFrameRef = useRef(null);

  // Shared audio frequencies ref for R3F Canvas
  const audioDataRef = useRef({
    bass: 0,
    mid: 0,
    treble: 0,
    volume: 0
  });

  const currentTrack = playgroundTracks[activeTrack];

  // Suspend/resume autoplay handler in parent
  useEffect(() => {
    if (onPlayStateChange) {
      onPlayStateChange(isPlaying);
    }
  }, [isPlaying, onPlayStateChange]);

  // Audio element setup
  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.preload = "metadata";
    audioRef.current = audio;

    const handleError = () => {
      console.warn("Error loading audio file:", audio.src);
      setError(lang === 'fr' 
        ? "Fichier audio introuvable — ajoutez-le dans public/audio." 
        : "Audio file missing — add the track in public/audio."
      );
      setIsPlaying(false);
    };

    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('error', handleError);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Track switching effect
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentTrack.src;
    setProgress(0);
    setCurrentTime(0);
    setError(null);

    if (isPlaying) {
      audio.play().catch((err) => {
        console.warn("Playback blocked/failed:", err);
        setError(lang === 'fr' 
          ? "Fichier audio introuvable — ajoutez-le dans public/audio." 
          : "Audio file missing — add the track in public/audio."
        );
        setIsPlaying(false);
      });
    }
  }, [activeTrack]);

  // Player state synchronizers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setError(null);
    };

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [activeTrack, isPlaying]);

  // Volume sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Audio frequency looping analyzer
  useEffect(() => {
    const updateFrequencies = () => {
      const data = audioDataRef.current;
      if (!analyserRef.current || !isPlaying) {
        // Slow decay to 0 when paused
        data.bass = THREE.MathUtils.lerp(data.bass, 0, 0.08);
        data.mid = THREE.MathUtils.lerp(data.mid, 0, 0.08);
        data.treble = THREE.MathUtils.lerp(data.treble, 0, 0.08);
        data.volume = THREE.MathUtils.lerp(data.volume, 0, 0.08);
      } else {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        // Bass (index 0 - 8)
        let bassSum = 0;
        for (let i = 0; i < 8; i++) {
          bassSum += dataArray[i];
        }
        const bassVal = bassSum / 8 / 255;

        // Mids (index 9 - 40)
        let midSum = 0;
        for (let i = 9; i < 40; i++) {
          midSum += dataArray[i];
        }
        const midVal = midSum / 31 / 255;

        // Treble (index 41 - 100)
        let trebleSum = 0;
        for (let i = 41; i < 100; i++) {
          trebleSum += dataArray[i];
        }
        const trebleVal = trebleSum / 59 / 255;

        // Total volume
        let volSum = 0;
        for (let i = 0; i < bufferLength; i++) {
          volSum += dataArray[i];
        }
        const volVal = volSum / bufferLength / 255;

        // Write directly to ref object at 60 FPS
        data.bass = bassVal;
        data.mid = midVal;
        data.treble = trebleVal;
        data.volume = volVal;
      }

      animFrameRef.current = requestAnimationFrame(updateFrequencies);
    };

    updateFrequencies();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  // Audio Context initializer
  const initAudio = () => {
    if (audioContextRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);
      sourceRef.current = source;
    } catch (e) {
      console.warn("Failed to instantiate Web Audio API context:", e);
    }
  };

  const handlePlayPause = () => {
    initAudio();
    const ctx = audioContextRef.current;
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setError(null);
        })
        .catch((err) => {
          console.warn("Playback failed:", err);
          setError(lang === 'fr' 
            ? "Fichier audio introuvable — ajoutez-le dans public/audio." 
            : "Audio file missing — add the track in public/audio."
          );
          setIsPlaying(false);
        });
    }
  };

  const handleNext = () => {
    setActiveTrack((prev) => (prev + 1) % playgroundTracks.length);
  };

  const handlePrev = () => {
    setActiveTrack((prev) => (prev - 1 + playgroundTracks.length) % playgroundTracks.length);
  };

  const handleTimelineClick = (e) => {
    if (!duration || !audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPct = clickX / rect.width;
    const newTime = clickPct * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(clickPct * 100);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === Infinity) return "00:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // ----------------------------------------------------------------------
  // RENDER INTERACTIVE FLOATING PLAYER WIDGET
  // ----------------------------------------------------------------------
  const renderPlayerCard = (isInsideCard) => {
    return (
      <div className={`w-full ${isInsideCard ? 'max-w-xs md:max-w-sm' : 'max-w-md'} bg-charcoal/90 backdrop-blur-lg border border-white/10 rounded-xl p-5 md:p-6 shadow-2xl flex flex-col gap-4 text-white`}>
        {/* Header metadata */}
        <div className="flex gap-4 items-center">
          <TrackCover 
            coverSrc={currentTrack.cover} 
            title={currentTrack.title} 
            artist={currentTrack.artist}
            className={`${isInsideCard ? 'w-12 h-12' : 'w-14 h-14 md:w-16 md:h-16'} flex-shrink-0`}
          />
          
          <div className="flex-1 min-w-0">
            <span className="font-mono text-[7px] text-violet uppercase tracking-widest block font-bold">
              {lang === 'fr' ? 'PORTAIL AUDIO 3D' : '3D SOUND PORTAL'}
            </span>
            <h4 className="font-syne font-bold text-xs md:text-sm truncate uppercase tracking-wide mt-0.5">
              {currentTrack.title}
            </h4>
            <p className="text-[9px] md:text-[10px] text-white/55 font-mono tracking-widest uppercase truncate">
              {currentTrack.artist}
            </p>
          </div>

          <div className="flex items-center gap-1.5 md:gap-2">
            <button 
              onClick={() => setShowQueue(!showQueue)}
              aria-label={showQueue ? (lang === 'fr' ? 'Fermer la playlist' : 'Close playlist') : (lang === 'fr' ? 'Afficher la playlist' : 'Show playlist')}
              className={`p-1.5 transition-colors cursor-none ${showQueue ? 'text-violet' : 'text-white/50 hover:text-white'}`}
              title="Toggle playlist"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <ListMusic size={15} />
            </button>
            <button 
              onClick={() => setIsMuted(!isMuted)}
              aria-label={isMuted ? (lang === 'fr' ? 'Activer le son' : 'Unmute sound') : (lang === 'fr' ? 'Couper le son' : 'Mute sound')}
              className="p-1.5 transition-colors cursor-none text-white/50 hover:text-white"
              onPointerDown={(e) => e.stopPropagation()}
            >
              {isMuted || volume === 0 ? <VolumeX size={15} className="text-red-400" /> : <Volume2 size={15} className="text-violet" />}
            </button>
          </div>
        </div>

        {showQueue ? (
          <TrackList 
            tracks={playgroundTracks} 
            activeTrackId={currentTrack.id} 
            isPlaying={isPlaying}
            onSelectTrack={(idx) => {
              setActiveTrack(idx);
              setShowQueue(false);
            }}
            onClose={() => setShowQueue(false)}
            lang={lang}
          />
        ) : (
          <>
            {/* Seeking timeline */}
            <div 
              className="space-y-1.5 cursor-pointer group"
              onClick={handleTimelineClick}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <div className="relative h-1 w-full bg-white/10 rounded overflow-hidden">
                <div 
                  className="h-full bg-violet transition-all duration-100 ease-out" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
              <div className="flex justify-between font-mono text-[8px] md:text-[9px] text-white/40 uppercase tracking-widest">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Player control buttons */}
            <div className="flex justify-between items-center pt-0.5 px-2">
              <button 
                onClick={handlePrev}
                aria-label={lang === 'fr' ? 'Piste précédente' : 'Previous track'}
                className="text-white/70 hover:text-violet transition-colors cursor-none p-2 -m-2"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <SkipBack size={16} />
              </button>

              <button 
                onClick={handlePlayPause}
                aria-label={isPlaying ? (lang === 'fr' ? 'Mettre en pause' : 'Pause music') : (lang === 'fr' ? 'Lancer la lecture' : 'Play music')}
                className="h-10 w-10 md:h-11 md:w-11 rounded-full bg-violet text-charcoal flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-none shadow-lg shadow-violet/20"
                onPointerDown={(e) => e.stopPropagation()}
              >
                {isPlaying ? <Pause size={18} className="fill-charcoal" /> : <Play size={18} className="fill-charcoal ml-0.5" />}
              </button>

              <button 
                onClick={handleNext}
                aria-label={lang === 'fr' ? 'Piste suivante' : 'Next track'}
                className="text-white/70 hover:text-violet transition-colors cursor-none p-2 -m-2"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <SkipForward size={16} />
              </button>
            </div>

            {/* Volume Slider */}
            <div 
              className="flex items-center gap-3 pt-2 border-t border-white/5"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <span className="font-mono text-[8px] uppercase tracking-widest text-white/30">VOL</span>
              <input 
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                aria-label={lang === 'fr' ? 'Volume sonore' : 'Volume'}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  setIsMuted(false);
                }}
                className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-none accent-violet"
              />
            </div>
          </>
        )}

        {/* Diagnostic warnings */}
        {error && (
          <div className="text-[9px] text-red-400 font-mono tracking-wider uppercase border border-red-500/20 bg-red-500/5 p-1.5 rounded text-center">
            {error}
          </div>
        )}
      </div>
    );
  };

  // ----------------------------------------------------------------------
  // CASE A: DEDICATED FULLSCREEN IMMERSIVE THEATER VIEW
  // ----------------------------------------------------------------------
  if (isFullScreen) {
    return (
      <div className="w-full h-full relative min-h-screen bg-[#050507] overflow-hidden select-none">
        
        {/* Fullscreen 3D Scene */}
        <AudioReactiveScene audioDataRef={audioDataRef} />

        {/* Back navigation button */}
        {isUIVisible && (
          <div className="absolute top-6 left-6 z-30">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded bg-charcoal/40 backdrop-blur text-xs font-mono uppercase tracking-widest text-white hover:bg-violet hover:text-charcoal transition-colors cursor-none"
              onPointerDown={(e) => e.stopPropagation()}
            >
              &larr; {lang === 'fr' ? 'Retour' : 'Back'}
            </button>
          </div>
        )}

        {/* Immersive Eye toggle button */}
        <div className="absolute top-6 right-6 z-30">
          <button 
            onClick={() => setIsUIVisible(!isUIVisible)}
            aria-label={isUIVisible ? (lang === 'fr' ? 'Masquer l’interface' : 'Hide interface') : (lang === 'fr' ? 'Afficher l’interface' : 'Show interface')}
            className="h-10 w-10 border border-white/10 rounded-full bg-charcoal/40 backdrop-blur flex items-center justify-center text-white hover:bg-violet hover:text-charcoal transition-all cursor-none"
            title={lang === 'fr' ? 'Mode immersif' : 'Immersive mode'}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {isUIVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Centered floating controller */}
        <div 
          className={`absolute z-20 bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-6 transition-all duration-700 ease-in-out ${
            isUIVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        >
          {renderPlayerCard(false)}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // CASE B: RESPONSIVE TWO-COLUMN CARD VIEW (Inside Playground slider)
  // ----------------------------------------------------------------------
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* 3D WebGL Canvas Visual column (Span 7) */}
      <div 
        className="lg:col-span-7 border border-border-light rounded-xl overflow-hidden min-h-[380px] md:min-h-[440px] relative flex items-center justify-center p-6 select-none bg-[#050507]"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <AudioReactiveScene audioDataRef={audioDataRef} />

        {/* Floating Player Card Widget on top of WebGL scene */}
        <div className="relative z-10 w-full flex items-center justify-center">
          {renderPlayerCard(true)}
        </div>

        {/* Watermark label */}
        <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest text-white/40 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
          <span>Purple Sound Portal 3D</span>
        </div>
      </div>

      {/* Narrative info description column (Span 5) */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        <div className="space-y-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-violet font-bold">
              01 / AUDIO REACTIVE EXPERIENCE
            </span>
            <h2 className="font-syne font-black text-3xl sm:text-4xl text-charcoal-light uppercase mt-1 leading-none">
              MUSIX VISUALIZER
            </h2>
            <p className="font-mono text-[10px] text-charcoal-muted uppercase tracking-widest mt-1">
              Three.js / Web Audio API / Generative Art
            </p>
          </div>

          <p className="text-sm text-charcoal leading-relaxed font-light">
            {lang === 'fr' 
              ? "Une installation interactive 3D générant un portail organique réactif aux fréquences audio de la musique via la Web Audio API. Déformations noise, tunnels et anneaux orbitaux."
              : "An interactive 3D WebGL installation generating an organic portal responsive to real-time audio frequencies. Vertices warping, particle tunnels and orbital ripples."}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {["Three.js", "React Three Fiber", "Web Audio API", "Vertex Shader", "Generative"].map((tag) => (
              <span key={tag} className="text-[9px] font-mono uppercase tracking-widest border border-border-light px-2.5 py-0.5 rounded-full bg-charcoal/[0.01] text-charcoal-muted">
                {tag}
              </span>
            ))}
          </div>

          {/* Setup notice warning */}
          <div className="p-4 border border-dashed border-border-light rounded bg-charcoal/[0.01] text-[10px] font-mono text-charcoal-muted uppercase tracking-widest leading-normal">
            {lang === 'fr'
              ? "💡 Déposez vos pistes (track-01.mp3, track-02.mp3, track-03.mp3) dans public/audio/ pour activer vos musiques personnalisées."
              : "💡 Add your custom tracks (track-01.mp3, track-02.mp3, track-03.mp3) inside public/audio/ to play your own music."}
          </div>
        </div>

        {/* Desktop inline tracklist queue (shown only on large layouts) */}
        <div className="hidden lg:block border-t border-border-light pt-6">
          <TrackList 
            tracks={playgroundTracks}
            activeTrackId={currentTrack.id}
            isPlaying={isPlaying}
            onSelectTrack={(idx) => {
              setActiveTrack(idx);
            }}
            lang={lang}
          />
        </div>

        {/* Action triggers */}
        <div 
          className="flex flex-wrap gap-3"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {/* Card Play/Pause */}
          <button 
            onClick={handlePlayPause}
            className="group inline-flex items-center gap-2 px-5 py-2.5 border border-charcoal text-xs font-mono uppercase tracking-widest font-bold hover:bg-charcoal hover:text-white transition-all duration-300 cursor-none interactive-hover rounded bg-white text-charcoal shadow-sm"
          >
            {isPlaying ? (lang === 'fr' ? 'PAUSE PROJET' : 'PAUSE EXPERIENCE') : (lang === 'fr' ? 'LANCER ICI' : 'PLAY IN CARD')}
            <Sparkles size={12} className={isPlaying ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'} />
          </button>
          
          {/* Open Full Screen Detail Page */}
          <Link 
            to="/playground/musix-visualizer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-violet bg-violet text-charcoal text-xs font-mono uppercase tracking-widest font-bold hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-300 cursor-none interactive-hover rounded shadow-md shadow-violet/10"
          >
            {lang === 'fr' ? 'OUVRIR EN PLEIN ÉCRAN' : 'OPEN EXPERIMENT'}
            <Maximize2 size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
