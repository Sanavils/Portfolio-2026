import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function ProjectCard({ project, index }) {
  const { language } = useLanguage();
  const t = translations[language];
  const pContent = project[language];

  const getLayoutClasses = (idx) => {
    switch (idx) {
      case 0: // ADP - Full width
        return 'col-span-12 mb-16 lg:mb-24';
      case 1: // Abercrombie - 50% left
        return 'col-span-12 md:col-span-6 mb-16 lg:mb-24 md:pr-6';
      case 2: // Civic Vote - 50% right
        return 'col-span-12 md:col-span-6 mb-16 lg:mb-24 md:pl-6 md:pt-16';
      case 3: // Okane - 60% left
        return 'col-span-12 md:col-span-7 mb-16 lg:mb-24 md:pr-8';
      case 4: // Serinity - 40% right
        return 'col-span-12 md:col-span-5 mb-16 lg:mb-24 md:pl-4 md:pt-8';
      case 5: // Scentify - Full width
        return 'col-span-12 mb-16 lg:mb-24';
      case 6: // MUSE - 40% left
        return 'col-span-12 md:col-span-5 mb-16 lg:mb-24 md:pr-4';
      case 7: // ALYA - 60% right
        return 'col-span-12 md:col-span-7 mb-16 lg:mb-24 md:pl-8 md:pt-12';
      default:
        return 'col-span-12 mb-16';
    }
  };

  // Render high-fidelity graphic placeholders
  const renderPlaceholder = (proj) => {
    const { bgColor, textColor, type, label } = proj.visual;

    if (proj.slug === 'groupe-adp') {
      return (
        <div className="absolute inset-0 bg-[#0A2A5C] flex items-center justify-center border border-charcoal/10 overflow-hidden">
          <img 
            src="/assets/projects/groupe-adp/adp-logo.png" 
            alt="Groupe ADP Logo" 
            className="w-full h-full object-contain p-6 sm:p-8 md:p-12 transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      );
    }

    if (proj.slug === 'abercrombie') {
      return (
        <div className="absolute inset-0 bg-[#EAEAEA] flex items-center justify-center border border-charcoal/10 overflow-hidden">
          <img 
            src="/assets/projects/abercrombie/abercrombie-logo.png" 
            alt="Abercrombie Logo" 
            className="w-full h-full object-contain p-6 sm:p-8 md:p-12 transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      );
    }

    switch (type) {
      case 'grid-lines':
        return (
          <div className={`absolute inset-0 ${bgColor} flex flex-col justify-between p-8 border border-charcoal/10 overflow-hidden`}>
            {/* Airport lines grid */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
              <div className="w-full h-[1px] bg-bg-light/40 absolute rotate-12" />
              <div className="w-full h-[1px] bg-bg-light/40 absolute -rotate-12" />
              <div className="w-[1px] h-full bg-bg-light/40 absolute left-1/3" />
              <div className="w-[1px] h-full bg-bg-light/40 absolute left-2/3" />
              <div className="w-40 h-40 border border-bg-light/40 rounded-full" />
            </div>
            <div className="flex justify-between items-baseline z-10">
              <span className="font-mono text-[9px] uppercase tracking-widest text-violet">SYS / DATA</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-violet">01</span>
            </div>
            <div className="font-syne font-black text-4xl sm:text-6xl text-violet leading-none select-none z-10 text-center uppercase">
              ADP
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-violet/60 z-10">
              {label}
            </div>
          </div>
        );
      case 'editorial-block':
        return (
          <div className={`absolute inset-0 ${bgColor} flex flex-col justify-between p-8 border border-charcoal/15 overflow-hidden`}>
            <div className="absolute inset-4 border border-charcoal/10 pointer-events-none" />
            <div className="flex justify-between items-baseline z-10">
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal/40">BRAND / ARCHIVE</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal/40">02</span>
            </div>
            <div className="font-serif italic text-3xl sm:text-4xl text-charcoal leading-none select-none z-10 text-center">
              Abercrombie
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-charcoal/60 z-10 text-right">
              {label}
            </div>
          </div>
        );
      case 'badge-stamp':
        return (
          <div className={`absolute inset-0 ${bgColor} flex flex-col justify-between p-8 border border-charcoal/10 overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-center opacity-25">
              <div className="w-36 h-36 border-4 border-dashed border-charcoal rounded-full flex items-center justify-center animate-spin-slow">
                <span className="font-mono text-[8px] uppercase tracking-widest text-charcoal font-bold">VOTE • VOTE • VOTE •</span>
              </div>
            </div>
            <div className="flex justify-between items-baseline z-10">
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal/50">CIVIC / SYSTEM</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal/50">03</span>
            </div>
            <div className="font-syne font-black text-4xl sm:text-5xl text-charcoal leading-none select-none z-10 text-center uppercase">
              CIVIC
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-charcoal/70 z-10">
              {label}
            </div>
          </div>
        );
      case 'finance-chart':
        return (
          <div className={`absolute inset-0 ${bgColor} flex flex-col justify-between p-8 border border-charcoal/10 overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-center opacity-30 gap-1 select-none">
              <div className="w-10 h-24 border border-violet/30 rounded-t-lg" />
              <div className="w-10 h-32 border border-violet/50 rounded-t-lg bg-violet/10" />
              <div className="w-10 h-16 border border-violet/30 rounded-t-lg" />
              <div className="w-10 h-40 border border-violet rounded-t-lg bg-violet/20" />
            </div>
            <div className="flex justify-between items-baseline z-10">
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">FINANCE / PRODUCT</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">04</span>
            </div>
            <div className="font-syne font-bold text-4xl sm:text-5xl text-violet leading-none select-none z-10 text-center uppercase">
              OKANE
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-white/40 z-10 text-right">
              {label}
            </div>
          </div>
        );
      case 'organic-shapes':
        return (
          <div className={`absolute inset-0 ${bgColor} flex flex-col justify-between p-8 border border-charcoal/10 overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <div className="w-48 h-48 border border-violet rounded-full absolute -top-12 -left-12" />
              <div className="w-32 h-32 border border-violet rounded-full absolute -bottom-6 -right-6" />
            </div>
            <div className="flex justify-between items-baseline z-10">
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal/40">WELLNESS / APP</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal/40">05</span>
            </div>
            <div className="font-syne font-medium text-4xl sm:text-5xl text-charcoal leading-none select-none z-10 text-center uppercase">
              SERINITY
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-charcoal/50 z-10">
              {label}
            </div>
          </div>
        );
      case 'diffuser-dials':
        return (
          <div className={`absolute inset-0 ${bgColor} flex flex-col justify-between p-8 border border-charcoal/10 overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-center opacity-25">
              <div className="w-36 h-36 border border-violet/40 rounded-full flex items-center justify-center">
                <div className="w-24 h-24 border border-violet/30 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 border-2 border-violet rounded-full" />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-baseline z-10">
              <span className="font-mono text-[9px] uppercase tracking-widest text-violet/70">IOT / DIFFUSER</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-violet/70">06</span>
            </div>
            <div className="font-syne font-black text-4xl sm:text-5xl text-violet leading-none select-none z-10 text-center uppercase">
              SCENTIFY
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-violet/50 z-10 text-right">
              {label}
            </div>
          </div>
        );
      case 'fashion-frames':
        return (
          <div className={`absolute inset-0 ${bgColor} flex flex-col justify-between p-8 border border-charcoal/10 overflow-hidden`}>
            <div className="absolute inset-8 border border-charcoal/20 flex flex-col items-center justify-center">
              <div className="w-full h-[1px] bg-charcoal/10" />
              <span className="font-mono text-[8px] my-1 text-charcoal/60 uppercase tracking-widest">AI / CURATOR</span>
              <div className="w-full h-[1px] bg-charcoal/10" />
            </div>
            <div className="flex justify-between items-baseline z-10">
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal/50">FASHION / TECH</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal/50">07</span>
            </div>
            <div className="font-syne font-extrabold text-4xl sm:text-5xl text-charcoal leading-none select-none z-10 text-center uppercase">
              MUSE
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-charcoal/70 z-10">
              {label}
            </div>
          </div>
        );
      case 'fitness-rings':
        return (
          <div className={`absolute inset-0 ${bgColor} flex flex-col justify-between p-8 border border-charcoal/10 overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <div className="w-36 h-36 border-4 border-violet rounded-full absolute" />
              <div className="w-24 h-24 border-2 border-violet/60 rounded-full absolute" />
            </div>
            <div className="flex justify-between items-baseline z-10">
              <span className="font-mono text-[9px] uppercase tracking-widest text-violet">FITNESS / SYSTEM</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-violet">08</span>
            </div>
            <div className="font-syne font-black text-4xl sm:text-6xl text-violet leading-none select-none z-10 text-center uppercase">
              ALYA
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-violet/60 z-10 text-right">
              {label}
            </div>
          </div>
        );
      default:
        return <div className="absolute inset-0 bg-charcoal/5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`group flex flex-col ${getLayoutClasses(index)}`}
    >
      {/* Project Card Trigger Area */}
      <Link
        to={project.link}
        className="project-card relative block w-full overflow-hidden aspect-[16/10] md:aspect-[16/9.5] mb-6 cursor-none border border-border-light bg-bg-light interactive-hover"
      >
        {/* Render geometric customized template */}
        {renderPlaceholder(project)}
        
        {/* Transparent visual overlay frame that activates on hover */}
        <div className="absolute inset-0 bg-violet/90 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col justify-between p-8 md:p-10 select-none">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono font-bold tracking-widest text-charcoal/60 uppercase">/ {t.workSection.caseStudy}</span>
            <span className="text-[10px] font-mono px-3 py-1 border border-charcoal/20 text-charcoal rounded-full bg-charcoal/5">
              {project.year}
            </span>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <span className="text-[9px] uppercase tracking-widest font-mono font-extrabold text-charcoal/50">
                {pContent.category}
              </span>
              <h4 className="text-2xl md:text-3xl font-syne font-black text-charcoal mt-1 uppercase leading-none">
                {project.id} &bull; {project.slug.replace('-', ' ')}
              </h4>
            </div>

            <div className="h-10 w-10 rounded-full border border-charcoal/20 flex items-center justify-center bg-charcoal/5 text-charcoal group-hover:border-charcoal transition-all duration-300">
              <ArrowUpRight size={18} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>

      {/* Under-Card Metadata details block */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex gap-4 md:gap-5">
          <span className="font-syne font-black text-lg md:text-xl text-charcoal/30 select-none pt-0.5">
            {project.id}
          </span>

          <div className="flex-1">
            <div className="flex flex-wrap items-baseline gap-2">
              <Link 
                to={project.link}
                className="font-syne text-lg md:text-xl font-bold text-charcoal hover:text-violet transition-colors duration-300 uppercase"
              >
                {project.id === "02" ? "Abercrombie & Fitch" : project.id === "01" ? "Groupe ADP" : project.id === "03" ? "Civic Vote" : project.slug.replace('-', ' ')}
              </Link>
              <span className="text-charcoal/20 font-light text-base">/</span>
              <span className="text-charcoal-muted text-xs uppercase tracking-widest font-mono font-bold">
                {project.year}
              </span>
            </div>

            <p className="text-xs text-charcoal-muted font-light leading-relaxed mt-2 max-w-xl">
              {pContent.intro || project.shortDesc[language]}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag, tIdx) => (
                <span 
                  key={tIdx} 
                  className="text-[9px] tracking-widest uppercase font-mono text-charcoal-muted border border-charcoal/10 px-2.5 py-0.5 rounded-full bg-charcoal/[0.01]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Link
          to={project.link}
          className="group inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest uppercase text-charcoal-muted hover:text-violet transition-colors duration-300 mt-2 sm:mt-1 self-start sm:self-auto cursor-none interactive-hover"
        >
          {t.workSection.viewBtn}
          <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  );
}
