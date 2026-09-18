import { motion } from 'framer-motion';
import { Headphones, Eye, Compass, Radio } from 'lucide-react';

const iconMap = {
  playing: Headphones,
  watching: Eye,
  exploring: Compass
};

export default function CurrentMood({ meta }) {
  if (!meta || !meta.moodItems) return null;

  return (
    <section className="mb-14">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-2 border-b border-border-light">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-violet animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-violet relative" />
          </div>
          <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-charcoal">
            {meta.currentMoodTitle}
          </h2>
        </div>
        <span className="font-mono text-[10px] text-charcoal-muted uppercase tracking-widest hidden sm:inline-block">
          {meta.currentMoodTag}
        </span>
      </div>

      {/* 3 Columns Mood Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {meta.moodItems.map((item, index) => {
          const Icon = iconMap[item.id] || Radio;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative border border-border-light hover:border-violet/60 bg-white/40 hover:bg-white/90 p-5 rounded-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-violet bg-charcoal px-2 py-0.5 rounded">
                  0{index + 1} // {item.label}
                </span>
                <Icon size={14} className="text-charcoal-muted group-hover:text-charcoal transition-colors duration-300" />
              </div>

              {/* Mood Description */}
              <p className="font-inter text-xs md:text-sm text-charcoal font-normal leading-relaxed">
                {item.value}
              </p>

              {/* Bottom decorative bar */}
              <div className="mt-4 pt-3 border-t border-charcoal/5 flex items-center justify-between font-mono text-[9px] text-charcoal-muted uppercase tracking-wider">
                <span>Active signal</span>
                <span className="text-violet font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Live &bull;
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
