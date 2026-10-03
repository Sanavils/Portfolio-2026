import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Image as ImageIcon, Music2, Disc3 } from 'lucide-react';

export default function InterestCard({
  item,
  meta,
  language,
  onOpenDrawer
}) {
  const [imgError, setImgError] = useState(false);

  // Dynamic grid spanning for editorial bento layout on desktop
  const getBentoClasses = (size, id) => {
    switch (id) {
      case 'league-of-legends':
        return 'lg:col-span-7 md:col-span-12';
      case 'honkai-star-rail':
        return 'lg:col-span-5 md:col-span-12';
      case 'music-rotation':
        return 'lg:col-span-8 md:col-span-12';
      case 'design-motion':
        return 'lg:col-span-4 md:col-span-12';
      case 'ai-tools':
        return 'lg:col-span-6 md:col-span-12';
      case 'fashion-identity':
        return 'lg:col-span-6 md:col-span-12';
      default:
        return 'lg:col-span-6 md:col-span-12';
    }
  };

  const title = item.title[language] || item.title.en;
  const description = item.description[language] || item.description.en;
  const status = item.status[language] || item.status.en;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`group relative border border-border-light hover:border-violet bg-white/70 hover:bg-white rounded-xl p-6 md:p-8 flex flex-col justify-between transition-all duration-500 shadow-sm hover:shadow-xl ${getBentoClasses(
        item.bentoSize,
        item.id
      )}`}
    >
      {/* Card Header Info */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-charcoal/5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black tracking-widest text-charcoal bg-violet/40 px-2 py-0.5 rounded">
              /{item.number}
            </span>
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-charcoal-muted">
              {item.category}
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-charcoal bg-charcoal/[0.04] border border-charcoal/5 px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
            {status}
          </span>
        </div>

        {/* Media Container (GIF or editorial placeholder) */}
        <div className="mb-6 overflow-hidden rounded-lg">
          {item.asset && !imgError ? (
            <div className="interest-media relative w-full h-56 md:h-64 bg-charcoal/5 overflow-hidden rounded-lg">
              <img
                src={item.asset}
                alt={item.alt ? (item.alt[language] || item.alt.en) : title}
                onError={() => setImgError(true)}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>
          ) : (
            <div className="w-full h-48 md:h-56 bg-charcoal/[0.02] border border-dashed border-charcoal/20 rounded-lg flex flex-col items-center justify-center p-6 text-center select-none group-hover:border-violet/60 transition-colors">
              <div className="w-10 h-10 rounded-full bg-violet/20 border border-violet/50 flex items-center justify-center mb-3">
                <ImageIcon className="text-charcoal" size={16} />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-charcoal">
                {meta.placeholderText}
              </span>
              <span className="font-mono text-[9px] text-charcoal-muted uppercase tracking-wider mt-1">
                {item.asset ? item.asset.replace('/assets/interests/', '') : 'asset.gif'}
              </span>
              <span className="font-mono text-[8px] text-charcoal-muted/60 mt-1">
                {meta.placeholderSub}
              </span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-syne font-black text-xl md:text-2xl text-charcoal-light leading-snug uppercase tracking-tight mb-3 group-hover:text-charcoal transition-colors">
          {title}
        </h3>

        {/* Short description */}
        <p className="font-inter text-xs md:text-sm text-charcoal/80 font-light leading-relaxed line-clamp-3 mb-4">
          {description}
        </p>

        {/* Dedicated Tracklist for Music Rotation */}
        {item.tracklist && (
          <div className="my-5 p-4 rounded-lg bg-charcoal/[0.02] border border-charcoal/10 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-charcoal/5">
              <div className="flex items-center gap-2">
                <Music2 size={13} className="text-violet" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-charcoal">
                  {meta.nowPlayingTitle}
                </span>
              </div>
              <Disc3 size={13} className="text-charcoal-muted animate-spin-slow" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {item.tracklist.map((track, i) => (
                <div
                  key={track.id}
                  className="flex items-center justify-between px-3 py-2 rounded bg-white/70 border border-charcoal/5 hover:border-violet transition-colors"
                >
                  <div className="flex items-center gap-2 overflow-hidden mr-2">
                    <span className="font-mono text-[9px] text-violet font-black">
                      0{i + 1}
                    </span>
                    <span className="font-syne font-bold text-xs truncate text-charcoal">
                      {track.title}
                    </span>
                    <span className="text-[10px] text-charcoal-muted truncate font-light">
                      — {track.artist}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-charcoal-muted shrink-0">
                    {track.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Tags & Action Button */}
      <div className="pt-4 border-t border-charcoal/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-mono uppercase tracking-wider border border-border-light px-2 py-0.5 rounded bg-charcoal/[0.01] text-charcoal-muted"
            >
              {tag}
            </span>
          ))}
          {item.tags.length > 4 && (
            <span className="text-[9px] font-mono uppercase tracking-wider text-charcoal-muted/60 self-center">
              +{item.tags.length - 4}
            </span>
          )}
        </div>

        {/* Read Note Action Button */}
        <button
          onClick={() => onOpenDrawer(item)}
          className="group/btn inline-flex items-center gap-1.5 self-start sm:self-auto font-mono text-[10px] uppercase font-bold tracking-widest text-charcoal bg-charcoal/[0.04] hover:bg-violet px-3 py-1.5 rounded transition-all duration-300 cursor-none interactive-hover shrink-0"
        >
          <span>{meta.readNote}</span>
          <ArrowUpRight
            size={13}
            className="transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300"
          />
        </button>
      </div>
    </motion.article>
  );
}
