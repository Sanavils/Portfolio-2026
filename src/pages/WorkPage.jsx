import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { projectsData } from '../data/projectsData';
import ProjectCard from '../components/ProjectCard';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';

export default function WorkPage() {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const filterOptions = [
    { id: 'all', labelEn: 'All', labelFr: 'Tout' },
    { id: 'ux-ui', labelEn: 'UX/UI Design', labelFr: 'UX/UI Design' },
    { id: 'branding', labelEn: 'Branding', labelFr: 'Branding' },
    { id: 'product', labelEn: 'Product Design', labelFr: 'Product Design' },
  ];

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === 'all') return true;
    const cat = (project.en.category + ' ' + project.tags.join(' ')).toLowerCase();
    if (activeFilter === 'ux-ui') return cat.includes('ux/ui') || cat.includes('corporate') || cat.includes('civic');
    if (activeFilter === 'branding') return cat.includes('branding') || cat.includes('identity') || cat.includes('rebranding');
    if (activeFilter === 'product') return cat.includes('product') || cat.includes('finance') || cat.includes('wellness') || cat.includes('iot') || cat.includes('app');
    return true;
  });

  return (
    <>
      <SEO
        title={language === 'fr' ? 'Projets Sélectionnés — Hassen Arkab' : 'Selected Work — Hassen Arkab'}
        description={
          language === 'fr'
            ? 'Archive complète des projets UX/UI, branding, product design et expériences digitales conçus par Hassen Arkab.'
            : 'Curated archive of UX/UI, branding, product design and digital experiences designed by Hassen Arkab.'
        }
        canonical="https://www.hassenarkab.com/work"
      />
      <PageTransition />

      <div className="min-h-screen bg-bg-light pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Work Hero Header */}
          <div className="border-b border-border-light pb-10 mb-12">
            <span className="font-mono text-[10px] uppercase tracking-widest text-violet font-bold block mb-3">
              / {language === 'fr' ? 'ARCHIVE PROJETS // 2024 — 2026' : 'PORTFOLIO ARCHIVE // 2024 — 2026'}
            </span>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <h1 className="font-syne font-black text-4xl sm:text-6xl md:text-7xl uppercase text-charcoal-light tracking-tight leading-none">
                  {language === 'fr' ? 'Projets Sélectionnés' : 'Selected Work'}
                </h1>
                <p className="text-sm md:text-base text-charcoal-muted leading-relaxed font-light max-w-2xl mt-4">
                  {language === 'fr'
                    ? 'Une sélection complète de projets clients, expériences digitales, branding et systèmes produit pensés avec intention.'
                    : 'A curated archive of client work, digital experiences, branding and product design systems created with intention.'}
                </p>
              </div>

              <div className="font-mono text-xs uppercase tracking-widest text-charcoal-muted self-start lg:self-end">
                [{filteredProjects.length} {language === 'fr' ? 'PROJETS' : 'PROJECTS'}]
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-8 pt-6 border-t border-charcoal/5">
              {filterOptions.map((filter) => {
                const isActive = activeFilter === filter.id;
                const label = language === 'fr' ? filter.labelFr : filter.labelEn;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 cursor-none interactive-hover ${
                      isActive
                        ? 'bg-charcoal text-bg-light border border-charcoal shadow-xs'
                        : 'bg-transparent text-charcoal-muted border border-charcoal/10 hover:border-violet hover:text-charcoal'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-12 gap-y-12 md:gap-x-8"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  className={
                    activeFilter === 'all'
                      ? undefined
                      : 'col-span-12 md:col-span-6 mb-8 md:mb-12'
                  }
                />
              ))}
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </>
  );
}
