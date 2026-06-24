import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ListMusic, Sparkles 
} from 'lucide-react';
import { playgroundTracks } from '../../data/playgroundTracks';
import MusicVisualizer from './MusicVisualizer';
import TrackList, { TrackCover } from './TrackList';

export default function MusicPlayer({ lang, onPlayStateChange }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeTrack, setActiveTrack] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [error, setError] = useState(null);

  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  const currentTrack = playgroundTracks[activeTrack];

  // Suspend/resume autoplay handler
  useEffect(() => {
    if (onPlayStateChange) {
      onPlayStateChange(isPlaying);
    }
  }, [isPlaying, onPlayStateChange]);

  // Audio Element instantiation and setup
  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.preload = "metadata";
    audioRef.current = audio;

    // Error handling listener
    const handleError = (e) => {
      console.warn("Audio element reported an error loading:", audio.src);
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

    // If it was playing, transition and play new song
    if (isPlaying) {
      audio.play().catch((err) => {
        console.warn("Play blocked or failed:", err);
        setError(lang === 'fr' 
          ? "Fichier audio introuvable — ajoutez-le dans public/audio." 
          : "Audio file missing — add the track in public/audio."
        );
        setIsPlaying(false);
      });
    }
  }, [activeTrack]);

  // Player state event sync
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

    const handleDurationChange = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [activeTrack, isPlaying]);

  // Volume sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Initialize Web Audio Analyzer node on user interaction
  const initAudioContext = () => {
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
      console.warn("Failed to initialize AudioContext:", e);
    }
  };

  const handlePlayPause = () => {
    initAudioContext();

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
          console.warn("Failed to play audio:", err);
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
    const clickPercentage = clickX / rect.width;
    
    const newTime = clickPercentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(clickPercentage * 100);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === Infinity) return "00:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Visual Workspace Column (Span 7) */}
      <div 
        className="lg:col-span-7 border border-border-light rounded-xl overflow-hidden bg-charcoal min-h-[340px] md:min-h-[420px] relative flex items-center justify-center p-6 md:p-8 select-none"
        onPointerDown={(e) => e.stopPropagation()}
      >
        {/* Audio Reactive Canvas Overlay */}
        <MusicVisualizer 
          analyserNode={analyserRef.current} 
          isPlaying={isPlaying} 
        />

        {/* Floating audio control overlay */}
        <div className="relative z-10 w-full max-w-sm bg-charcoal/90 backdrop-blur-md border border-white/10 rounded-xl p-5 md:p-6 shadow-2xl flex flex-col gap-4 text-white">
          
          {/* Header Track Info */}
          <div className="flex gap-4 items-center">
            {/* Album Cover Art */}
            <TrackCover 
              coverSrc={currentTrack.cover} 
              title={currentTrack.title} 
              artist={currentTrack.artist}
              className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0"
            />
            
            {/* Song Meta */}
            <div className="flex-1 min-w-0">
              <h4 className="font-syne font-bold text-sm truncate uppercase tracking-wide">
                {currentTrack.title}
              </h4>
              <p className="text-xs text-white/55 font-mono tracking-widest uppercase truncate mt-0.5">
                {currentTrack.artist}
              </p>
            </div>

            {/* Menu Queue Toggle & Volume status */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowQueue(!showQueue)}
                className={`p-1.5 transition-colors cursor-none ${showQueue ? 'text-violet' : 'text-white/50 hover:text-white'}`}
                title="Toggle playlist"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <ListMusic size={16} />
              </button>
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 transition-colors cursor-none text-white/50 hover:text-white"
                title="Mute / Unmute"
                onPointerDown={(e) => e.stopPropagation()}
              >
                {isMuted || volume === 0 ? <VolumeX size={16} className="text-red-400" /> : <Volume2 size={16} className="text-violet" />}
              </button>
            </div>
          </div>

          {showQueue ? (
            /* Playlist queue select list drawer overlay */
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
              {/* Playback Progress Slider */}
              <div 
                className="space-y-1.5 cursor-pointer group"
                onClick={handleTimelineClick}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <div className="relative h-1 w-full bg-white/10 rounded overflow-hidden">
                  <div 
                    className="h-full bg-violet transition-all duration-100 ease-out relative" 
                    style={{ width: `${progress}%` }} 
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="flex justify-between font-mono text-[9px] text-white/40 uppercase tracking-widest">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Player UI Controls */}
              <div className="flex justify-between items-center pt-1 px-2">
                {/* Previous */}
                <button 
                  onClick={handlePrev}
                  className="text-white/70 hover:text-violet transition-colors cursor-none p-2 -m-2"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <SkipBack size={18} />
                </button>

                {/* Play/Pause */}
                <button 
                  onClick={handlePlayPause}
                  className="h-12 w-12 rounded-full bg-violet text-charcoal flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-none shadow-lg shadow-violet/20"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  {isPlaying ? <Pause size={20} className="fill-charcoal" /> : <Play size={20} className="fill-charcoal ml-0.5" />}
                </button>

                {/* Next */}
                <button 
                  onClick={handleNext}
                  className="text-white/70 hover:text-violet transition-colors cursor-none p-2 -m-2"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <SkipForward size={18} />
                </button>
              </div>

              {/* Volume Slider control */}
              <div 
                className="flex items-center gap-3 pt-1 border-t border-white/5"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <span className="font-mono text-[8px] uppercase tracking-widest text-white/30">VOL</span>
                <input 
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(Number(e.target.value));
                    setIsMuted(false);
                  }}
                  className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-none accent-violet"
                />
              </div>
            </>
          )}

          {/* Diagnostic info or missing file error indicators */}
          {error && (
            <div className="text-[10px] text-red-400 font-mono tracking-wider uppercase border border-red-500/20 bg-red-500/5 p-2 rounded text-center">
              {error}
            </div>
          )}
        </div>

        {/* Top watermarks */}
        <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest text-white/40 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
          <span>Interactive Audio Experiment</span>
        </div>
      </div>

      {/* Narrative info column (Span 5) */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        <div className="space-y-6">
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
              ? "Une interface expérimentale de lecteur musical combinant lecture audio réelle, visuels immersifs et visualizer réactif connecté aux fréquences via la Web Audio API."
              : "An experimental music player interface combining real audio playback, immersive visuals and a responsive visualizer mapped to frequency bands via the Web Audio API."}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {["Web Audio API", "HTML5 Canvas", "UI Music", "Motion"].map((tag) => (
              <span key={tag} className="text-[9px] font-mono uppercase tracking-widest border border-border-light px-2.5 py-0.5 rounded-full bg-charcoal/[0.01] text-charcoal-muted">
                {tag}
              </span>
            ))}
          </div>

          {/* Instructions notice */}
          <div className="p-4 border border-dashed border-border-light rounded bg-charcoal/[0.01] text-[10px] font-mono text-charcoal-muted uppercase tracking-widest leading-normal">
            {lang === 'fr'
              ? "💡 Ajoute tes fichiers audio (track-01.mp3, track-02.mp3, track-03.mp3) dans public/audio/ pour activer l'expérience complète."
              : "💡 Add your own audio tracks (track-01.mp3, track-02.mp3, track-03.mp3) inside public/audio/ to play your own custom tracks."}
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

        <button 
          onClick={handlePlayPause}
          onPointerDown={(e) => e.stopPropagation()}
          className="group self-start inline-flex items-center gap-2 px-5 py-2.5 border border-charcoal text-xs font-mono uppercase tracking-widest font-bold hover:bg-charcoal hover:text-white transition-all duration-300 cursor-none interactive-hover rounded"
        >
          {isPlaying ? (lang === 'fr' ? 'PAUSE EXPERIENCE' : 'PAUSE EXPERIENCE') : (lang === 'fr' ? 'LANCER L\'EXPÉRIENCE' : 'LAUNCH EXPERIENCE')}
          <Sparkles size={12} className={isPlaying ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'} />
        </button>
      </div>
    </div>
  );
}
