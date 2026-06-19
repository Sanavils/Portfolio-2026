import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { skillsMarquee } from '../data/projectsData';

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language];

  // Motion physics config
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const lineMaskVariants = {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen pt-24 flex flex-col justify-between overflow-hidden bg-bg-light">
      
      {/* Decorative Solid Violet Cover Block (DA cover banner) */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{ originY: 0 }}
        className="w-full h-12 md:h-16 bg-violet border-b border-charcoal/10"
      />

      {/* Hero content area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-grow flex flex-col justify-center py-12 md:py-20 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          {/* Tagline */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 mb-6 text-charcoal font-mono tracking-widest text-[10px] md:text-xs uppercase"
          >
            <span>/ {t.hero.tag}</span>
            <span className="h-[1px] w-8 bg-charcoal/30" />
            <span>UX/UI Designer</span>
          </motion.div>

          {/* Typographic Mask Reveal Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-charcoal-light leading-[0.95] mb-10 font-syne select-none uppercase">
            <div className="text-reveal-mask">
              <motion.div variants={lineMaskVariants}>{t.hero.titleLine1}</motion.div>
            </div>
            <br />
            <div className="text-reveal-mask">
              <motion.div variants={lineMaskVariants}>{t.hero.titleLine2}</motion.div>
            </div>
            <br />
            <div className="text-reveal-mask">
              <motion.div variants={lineMaskVariants}>{t.hero.titleLine3}</motion.div>
            </div>
          </h1>

          {/* Strong Editorial Statement */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl font-syne font-extrabold uppercase leading-snug tracking-tight text-charcoal max-w-4xl border-l-2 border-violet pl-4 md:pl-6 mb-8 mt-12"
          >
            {t.hero.editorial}
          </motion.p>

          {/* Secondary description paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base text-charcoal-muted leading-relaxed max-w-2xl font-light mb-12"
          >
            {t.hero.secondary}
          </motion.p>

          {/* Main Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-6 items-center"
          >
            <a
              href="#work"
              className="group relative flex items-center justify-center gap-2 bg-charcoal hover:bg-violet text-bg-light hover:text-charcoal px-8 py-4 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 border border-charcoal/10"
            >
              {t.hero.ctaWork}
              <ArrowDownRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="group flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-charcoal hover:text-violet py-3 transition-colors duration-300"
            >
              {t.hero.ctaContact}
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Slow, Sobre Endless Marquee */}
      <div className="w-full overflow-hidden border-y border-charcoal/10 bg-charcoal text-bg-light py-5 relative z-10">
        <div className="flex w-max select-none">
          {/* Slide 1 */}
          <div className="animate-marquee-slow flex whitespace-nowrap uppercase font-mono font-extrabold text-xs md:text-sm tracking-widest">
            {skillsMarquee.map((skill, index) => (
              <span key={`sk1-${index}`} className="flex items-center">
                <span className="mx-6 md:mx-8">{skill}</span>
                <span className="text-violet font-bold">/</span>
              </span>
            ))}
          </div>
          {/* Slide 2 */}
          <div className="animate-marquee-slow flex whitespace-nowrap uppercase font-mono font-extrabold text-xs md:text-sm tracking-widest">
            {skillsMarquee.map((skill, index) => (
              <span key={`sk2-${index}`} className="flex items-center">
                <span className="mx-6 md:mx-8">{skill}</span>
                <span className="text-violet font-bold">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
