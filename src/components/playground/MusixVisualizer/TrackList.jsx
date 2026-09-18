import React, { useState } from 'react';
import { Sparkles, Music } from 'lucide-react';

// procedural brutalist cover art matching DA
export function TrackCover({ coverSrc, title, artist, className }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !coverSrc) {
    return (
      <div className={`rounded flex flex-col justify-between p-2.5 relative overflow-hidden bg-[#1f1f1f] border border-white/5 select-none ${className}`}>
        <div className="absolute inset-0 opacity-[0.03] bg-grid pointer-events-none" />
        <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-violet/10 blur-xl pointer-events-none" />
        <span className="font-mono text-[6px] tracking-widest text-violet uppercase font-black z-10">
          / LAB-0{title.length % 9}
        </span>
        <div className="flex flex-col z-10 min-w-0">
          <span className="font-display font-black text-[9px] uppercase leading-none text-white tracking-tighter truncate">
            {title}
          </span>
          <span className="font-mono text-[6px] text-white/40 tracking-widest uppercase truncate mt-0.5">
            {artist}
          </span>
        </div>
      </div>
    );
  }

  return (
    <img 
      src={coverSrc} 
      alt={title} 
      onError={() => setHasError(true)}
      className={`rounded object-cover ${className}`}
    />
  );
}

export default function TrackList({ 
  tracks, 
  activeTrackId, 
  isPlaying, 
  onSelectTrack, 
  onClose,
  lang 
}) {
  return (
    <div className="space-y-3">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounceEq {
          0%, 100% { height: 3px; }
          50% { height: 11px; }
        }
        .eq-bar {
          animation: bounceEq 0.7s ease-in-out infinite;
        }
      `}} />

      <div className="flex justify-between items-center font-mono text-[9px] uppercase tracking-widest text-white/40 pb-1 border-b border-white/10">
        <span>{lang === 'fr' ? 'File d\'attente' : 'Play Queue / Playlist'}</span>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-violet hover:underline cursor-none hover:text-white transition-colors py-1 px-2 -mr-2"
          >
            {lang === 'fr' ? 'Fermer' : 'Close'}
          </button>
        )}
      </div>

      <div className="space-y-2 max-h-48 lg:max-h-72 overflow-y-auto hide-scrollbar">
        {tracks.map((track, idx) => {
          const isActive = track.id === activeTrackId;
          return (
            <div 
              key={track.id}
              onClick={() => onSelectTrack(idx)}
              className={`group flex items-center justify-between p-2 rounded-lg cursor-none transition-all duration-300 ${
                isActive 
                  ? 'bg-violet/15 border border-violet/30 text-white' 
                  : 'hover:bg-white/5 border border-transparent text-white/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Track Number / Icon */}
                <div className="w-4 text-center font-mono text-[9px] text-white/30 flex items-center justify-center">
                  {isActive && isPlaying ? (
                    // Little equalizer bar animation
                    <div className="flex items-end gap-[1.5px] h-3 w-3 justify-center pb-[1px]">
                      <span className="w-[1.5px] bg-violet eq-bar rounded-full" style={{ animationDelay: '0.1s', height: '4px' }} />
                      <span className="w-[1.5px] bg-violet eq-bar rounded-full" style={{ animationDelay: '0.4s', height: '6px' }} />
                      <span className="w-[1.5px] bg-violet eq-bar rounded-full" style={{ animationDelay: '0.2s', height: '3px' }} />
                    </div>
                  ) : (
                    <span>0{idx + 1}</span>
                  )}
                </div>

                {/* Cover art thumbnail */}
                <TrackCover 
                  coverSrc={track.cover} 
                  title={track.title} 
                  artist={track.artist}
                  className="w-10 h-10 flex-shrink-0"
                />

                {/* Metadata */}
                <div className="min-w-0">
                  <h5 className="font-syne font-bold text-xs uppercase tracking-wide truncate">
                    {track.title}
                  </h5>
                  <p className="text-[9px] text-white/50 font-mono tracking-widest uppercase truncate mt-0.5">
                    {track.artist}
                  </p>
                </div>
              </div>

              {/* Action indicator */}
              <div className="flex-shrink-0 pr-2">
                {isActive ? (
                  <Sparkles size={10} className="text-violet animate-pulse" />
                ) : (
                  <Music size={10} className="text-white/20 group-hover:text-white/55 transition-colors" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
