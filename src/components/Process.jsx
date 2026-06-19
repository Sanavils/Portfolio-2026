import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { processSteps } from '../data/projectsData';
import SectionTitle from './SectionTitle';

export default function Process() {
  const { language } = useLanguage();
  const t = translations[language];
  const steps = processSteps[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: '100%',
      transition: { duration: 1, ease: 'easeInOut' },
    },
  };

  return (
    <section id="process" className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      {/* Section Title */}
      <SectionTitle number={t.processSection.number} title={t.processSection.title} id="process-section" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 lg:mt-16">
        {/* Left Sticky Column */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
          <h3 className="font-syne font-black text-xl md:text-2xl text-charcoal mb-4 uppercase select-none">
            {t.processSection.heading}
          </h3>
          <p className="text-charcoal-muted leading-relaxed text-sm md:text-base font-light">
            {t.processSection.intro}
          </p>
        </div>

        {/* Right list column containing process rows */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="lg:col-span-8 space-y-1"
        >
          {steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              variants={rowVariants}
              className="group py-8 md:py-10 border-b border-border-light relative overflow-hidden"
            >
              {/* Dynamic scroll border reveals */}
              {idx === 0 && (
                <motion.div 
                  variants={lineVariants} 
                  className="absolute top-0 left-0 h-[1.5px] bg-border-light"
                />
              )}

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start relative z-10">
                {/* Number */}
                <div className="md:col-span-2 flex items-baseline gap-2">
                  <span className="font-syne font-black text-xl text-violet">
                    {step.number}
                  </span>
                  <span className="text-charcoal/20 text-xs font-light font-mono">/</span>
                </div>

                {/* Title */}
                <div className="md:col-span-4">
                  <h4 className="font-syne font-black text-lg md:text-xl text-charcoal group-hover:text-violet transition-colors duration-300 uppercase">
                    {step.title}
                  </h4>
                </div>

                {/* Description */}
                <div className="md:col-span-6">
                  <p className="text-charcoal-muted text-xs md:text-sm leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Hover highlight background slide overlay */}
              <div className="absolute inset-0 bg-violet/[0.04] -z-10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
