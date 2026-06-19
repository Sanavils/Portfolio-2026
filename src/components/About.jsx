import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import SectionTitle from './SectionTitle';

export default function About() {
  const { language } = useLanguage();
  const t = translations[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="about" className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      {/* Title */}
      <SectionTitle number={t.aboutSection.number} title={t.aboutSection.title} id="about-section" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mt-12 lg:mt-16"
      >
        {/* Large Punchline Heading */}
        <motion.div variants={itemVariants} className="lg:col-span-8">
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-syne font-black leading-[1.05] text-charcoal-light uppercase select-none">
            {t.aboutSection.heading.split(' & ').map((part, i) => (
              <span key={i} className="block">
                {part} {i === 0 && <span className="text-violet">&bull;</span>}
              </span>
            ))}
          </h3>
        </motion.div>

        {/* Empty spacing offset */}
        <div className="hidden lg:block lg:col-span-4" />

        {/* Narrative bio text columns */}
        <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
          <p className="text-lg md:text-xl text-charcoal leading-relaxed font-light">
            {t.aboutSection.bio}
          </p>
          <p className="text-sm md:text-base text-charcoal-muted leading-relaxed font-light">
            {t.aboutSection.bio2}
          </p>
          
          <div className="pt-4">
            <a 
              href="#contact" 
              className="group inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-charcoal hover:text-violet transition-colors duration-300 cursor-none interactive-hover"
            >
              {t.aboutSection.ctaContact}
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>

        {/* Quick Facts card column */}
        <motion.div variants={itemVariants} className="lg:col-span-5">
          <div className="bg-bg-light border border-border-light p-8 md:p-10 relative">
            {/* Minimalist corners visual anchors */}
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-charcoal/10" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-charcoal/10" />
            
            <h4 className="font-syne font-bold text-sm uppercase tracking-wider text-charcoal mb-8 border-b border-border-light pb-4 select-none">
              {t.aboutSection.factsTitle}
            </h4>
            
            <dl className="space-y-6 text-xs md:text-sm">
              <div className="grid grid-cols-3 gap-2 border-b border-charcoal/[0.04] pb-3">
                <dt className="font-mono text-charcoal-muted uppercase text-[10px] tracking-wider pt-0.5">{t.aboutSection.location}</dt>
                <dd className="col-span-2 text-charcoal font-bold">{t.aboutSection.locationVal}</dd>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-charcoal/[0.04] pb-3">
                <dt className="font-mono text-charcoal-muted uppercase text-[10px] tracking-wider pt-0.5">{t.aboutSection.role}</dt>
                <dd className="col-span-2 text-charcoal font-bold">{t.aboutSection.roleVal}</dd>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-charcoal/[0.04] pb-3">
                <dt className="font-mono text-charcoal-muted uppercase text-[10px] tracking-wider pt-0.5">{t.aboutSection.focus}</dt>
                <dd className="col-span-2 text-charcoal font-bold">{t.aboutSection.focusVal}</dd>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <dt className="font-mono text-charcoal-muted uppercase text-[10px] tracking-wider pt-0.5">{t.aboutSection.tools}</dt>
                <dd className="col-span-2 text-charcoal font-bold leading-relaxed">{t.aboutSection.toolsVal}</dd>
              </div>
            </dl>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
