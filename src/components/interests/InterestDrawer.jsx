import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Image as ImageIcon, Music2, Tag } from 'lucide-react';

export default function InterestDrawer({
  item,
  meta,
  language,
  onClose
}) {
  const [failedImgIds, setFailedImgIds] = useState({});

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [item, onClose]);

  if (!item) return null;

  const imgError = Boolean(failedImgIds[item.id]);

  const title = item.title[language] || item.title.en;
  const description = item.description[language] || item.description.en;
  const designerNote = item.designerNote[language] || item.designerNote.en;
  const status = item.status[language] || item.status.en;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm"
        />

        {/* Sliding Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-xl bg-bg-light h-full shadow-2xl border-l border-border-light flex flex-col z-10 overflow-hidden"
        >
          {/* Drawer Top Navigation Bar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border-light bg-bg-light/95 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-black tracking-widest text-charcoal bg-violet/40 px-2 py-0.5 rounded">
                /{item.number}
              </span>
              <span className="font-mono text-xs uppercase font-bold tracking-widest text-charcoal">
                {item.category}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-muted border border-charcoal/10 px-2 py-0.5 rounded-full">
                {status}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full border border-charcoal/10 hover:border-violet hover:bg-violet/20 text-charcoal transition-colors duration-200 cursor-none interactive-hover"
              aria-label={meta.closeNote}
            >
              <X size={18} />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 md:px-8 py-8 space-y-8">
            {/* Title */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-violet font-bold block mb-2">
                / {item.category.toUpperCase()} OBSESSION
              </span>
              <h2 className="font-display font-black text-2xl md:text-3xl text-charcoal-light uppercase tracking-tight leading-tight">
                {title}
              </h2>
            </div>

            {/* Media Asset Preview */}
            <div className="overflow-hidden rounded-xl border border-border-light bg-charcoal/5">
              {item.asset && !imgError ? (
                <div className="interest-media relative w-full h-64 md:h-72">
                  <img
                    src={item.asset}
                    alt={title}
                    onError={() => setFailedImgIds((prev) => ({ ...prev, [item.id]: true }))}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent pointer-events-none" />
                </div>
              ) : (
                <div className="w-full h-56 bg-charcoal/[0.02] border border-dashed border-charcoal/20 flex flex-col items-center justify-center p-6 text-center select-none">
                  <div className="w-12 h-12 rounded-full bg-violet/20 border border-violet/50 flex items-center justify-center mb-3">
                    <ImageIcon className="text-charcoal" size={20} />
                  </div>
                  <span className="font-mono text-sm font-bold uppercase tracking-widest text-charcoal">
                    {meta.placeholderText}
                  </span>
                  <span className="font-mono text-[10px] text-charcoal-muted uppercase tracking-wider mt-1">
                    {item.asset ? item.asset.replace('/assets/interests/', '') : 'asset.gif'}
                  </span>
                  <span className="font-mono text-[9px] text-charcoal-muted/60 mt-1">
                    {meta.placeholderSub}
                  </span>
                </div>
              )}
            </div>

            {/* Context & Description */}
            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-charcoal-muted font-bold block">
                / Context & Overview
              </span>
              <p className="font-inter text-sm md:text-base text-charcoal/90 font-light leading-relaxed">
                {description}
              </p>
            </div>

            {/* Designer Note Callout */}
            <div className="relative p-6 rounded-xl bg-violet/10 border border-violet/50 space-y-3">
              <div className="flex items-center gap-2 text-charcoal font-syne font-black text-sm uppercase tracking-wider">
                <Sparkles size={16} className="text-violet" />
                <span>{meta.designerNoteLabel}</span>
              </div>
              <p className="font-inter text-xs md:text-sm text-charcoal leading-relaxed italic">
                “{designerNote}”
              </p>
            </div>

            {/* Tracklist if applicable */}
            {item.tracklist && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-charcoal">
                  <Music2 size={14} className="text-violet" />
                  <span>{meta.nowPlayingTitle}</span>
                </div>
                <div className="divide-y divide-charcoal/5 border border-charcoal/10 rounded-lg overflow-hidden bg-white/60">
                  {item.tracklist.map((track, i) => (
                    <div key={track.id} className="flex items-center justify-between p-3 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-violet font-bold">0{i + 1}</span>
                        <div>
                          <p className="font-syne font-bold text-charcoal">{track.title}</p>
                          <p className="text-[10px] text-charcoal-muted">{track.artist}</p>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-charcoal-muted">{track.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags section */}
            <div className="space-y-3 pt-4 border-t border-charcoal/10">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-charcoal-muted">
                <Tag size={12} />
                <span>Tags & Attributes</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono uppercase tracking-wider border border-border-light px-3 py-1 rounded-full bg-white text-charcoal"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Drawer Bottom Close Button */}
          <div className="p-6 border-t border-border-light bg-bg-light">
            <button
              onClick={onClose}
              className="w-full py-3 bg-charcoal text-white hover:bg-violet hover:text-charcoal font-mono text-xs uppercase font-bold tracking-widest rounded-lg transition-colors duration-300 flex items-center justify-center cursor-none interactive-hover"
            >
              {meta.closeNote}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
