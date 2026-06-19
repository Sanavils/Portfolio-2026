import React from 'react';
import { motion } from 'framer-motion';

export default function SectionTitle({ number, title, id }) {
  return (
    <div id={id} className="relative w-full pt-16 pb-8 md:pt-24 md:pb-12 border-b border-border-light overflow-hidden">
      {/* Decorative vertical background indicator */}
      <div className="absolute left-0 top-0 w-[3px] h-10 bg-violet" />

      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        {/* Title Group */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center gap-4 md:gap-5"
        >
          <span className="font-syne font-extrabold text-xl md:text-2xl text-violet">
            {number}
          </span>
          <span className="text-charcoal/30 font-light text-base">/</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-syne font-black uppercase tracking-tight text-charcoal-light">
            {title}
          </h2>
        </motion.div>

        {/* Info Label - Editorial Look */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-mono text-[10px] uppercase tracking-widest text-charcoal-muted self-start md:self-auto"
        >
          Hassen Arkab &bull; Portfolio 2026
        </motion.div>
      </div>
    </div>
  );
}
