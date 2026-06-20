import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { projectsData } from '../data/projectsData';
import SectionTitle from './SectionTitle';
import ProjectCard from './ProjectCard';

export default function ProjectGrid() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="work" className="max-w-7xl mx-auto px-6 md:px-12 py-12 bg-bg-light">
      {/* Title */}
      <SectionTitle number={t.workSection.number} title={t.workSection.title} id="work-section" />

      {/* Main typographic header statements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 mb-16 items-start">
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-display-md uppercase text-charcoal-light select-none max-w-4xl">
            {t.workSection.heading.split(language === 'fr' ? ' ET ' : ' AND ').map((part, idx) => (
              <span key={idx} className="block">
                {part} {idx === 0 && <span className="text-violet">&bull;</span>}
              </span>
            ))}
          </h3>
          <p className="text-sm md:text-base text-charcoal-muted leading-relaxed font-light max-w-xl">
            {t.workSection.subtitle}
          </p>
        </div>

        {/* Home header side actions links */}
        <div className="lg:col-span-4 flex flex-col gap-3 font-mono text-xs uppercase tracking-widest pt-2 lg:items-end">
          <a
            href="#work-section"
            className="group flex items-center gap-2 text-charcoal hover:text-violet py-2 border-b border-charcoal/5 hover:border-violet transition-all duration-300 cursor-none interactive-hover"
          >
            {t.workSection.ctaAll}
            <ArrowDownRight size={14} className="transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-300" />
          </a>
          <a
            href="mailto:hassen.arkab@gmail.com"
            className="group flex items-center gap-2 text-charcoal hover:text-violet py-2 border-b border-charcoal/5 hover:border-violet transition-all duration-300 cursor-none interactive-hover"
          >
            {t.workSection.ctaEmail}
            <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>

      {/* Asymmetric magazine grid of 8 projects */}
      <div className="grid grid-cols-12 mt-8 md:mt-12">
        {projectsData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
