import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { creativeStack } from '../data/projectsData';

export default function CreativeStack() {
  const { language } = useLanguage();
  const t = translations[language];
  const tools = creativeStack[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-border-light bg-bg-light">
      {/* Header divider */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-10 md:mb-16">
        <div className="flex items-center gap-4">
          <span className="font-syne font-extrabold text-sm text-violet uppercase">{t.stackSection.title}</span>
          <span className="text-charcoal/20 font-light font-mono text-xs">/</span>
          <h3 className="font-syne font-black text-xl md:text-2xl text-charcoal uppercase select-none">
            {t.stackSection.heading}
          </h3>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-charcoal-muted">
          {t.stackSection.subtitle}
        </div>
      </div>

      {/* Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-5%' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {tools.map((tool, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="group bg-bg-light border border-border-light p-6 flex flex-col justify-between hover:border-violet transition-all duration-300 relative cursor-none interactive-hover"
          >
            {/* Minimal corners visual decoration */}
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-charcoal/5 group-hover:border-violet/40 transition-colors duration-300" />
            
            <div>
              <div className="flex justify-between items-baseline mb-4">
                <span className="font-mono text-[9px] uppercase tracking-wider text-charcoal-muted bg-charcoal/5 px-2 py-0.5 rounded">
                  {tool.category}
                </span>
                <span className="font-mono text-[9px] text-violet font-extrabold uppercase tracking-widest">
                  {tool.rating}
                </span>
              </div>
              
              <h4 className="font-syne font-bold text-base text-charcoal group-hover:text-violet transition-colors duration-300 uppercase">
                {tool.name}
              </h4>
            </div>

            <p className="text-charcoal-muted text-[11px] leading-relaxed mt-4 font-light border-t border-charcoal/5 pt-4">
              {tool.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
