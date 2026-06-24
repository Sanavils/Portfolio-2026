import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { projectsData } from '../data/projectsData';
import PageTransition from '../components/PageTransition';

export default function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  // Find current project
  const projectIndex = projectsData.findIndex((p) => p.slug === slug);
  const project = projectsData[projectIndex];

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-light">
        <h1 className="text-2xl font-syne font-bold uppercase mb-4">Project Not Found</h1>
        <Link to="/" className="text-xs font-mono font-bold uppercase text-violet underline">
          Back to Work
        </Link>
      </div>
    );
  }

  const pContent = project[language];

  // Get Next/Prev project configurations
  const prevProject = projectsData[projectIndex === 0 ? projectsData.length - 1 : projectIndex - 1];
  const nextProject = projectsData[projectIndex === projectsData.length - 1 ? 0 : projectIndex + 1];

  // Render giant visual mockup cover
  const renderGiantPlaceholder = (proj) => {
    if (proj.slug === 'groupe-adp') {
      return (
        <div className="w-full aspect-[21/9] min-h-[300px] md:min-h-[450px] relative border-y border-border-light overflow-hidden bg-[#0A2A5C] flex items-center justify-center p-8 md:p-12">
          {/* Centered logo with premium fade-in and scale animation */}
          <motion.img 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="/assets/projects/groupe-adp/adp-logo.png" 
            alt="Groupe ADP Logo" 
            className="relative z-10"
            style={{
              width: 'clamp(180px, 22vw, 360px)',
              height: 'auto',
              maxHeight: '70%',
              objectFit: 'contain'
            }}
          />
          
          <div className="absolute top-8 left-8 flex justify-between items-baseline w-[calc(100%-4rem)] pointer-events-none text-white/50 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest z-10">
            <span>CASE STUDY // CORPORATE REDESIGN</span>
            <span className="font-bold">ID: {proj.id}</span>
          </div>
          
          <div className="absolute bottom-8 left-8 flex justify-between items-baseline w-[calc(100%-4rem)] pointer-events-none text-white/50 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest z-10">
            <span>{proj.visual.label}</span>
            <span>{proj.year}</span>
          </div>
        </div>
      );
    }

    if (proj.slug === 'abercrombie') {
      return (
        <div className="w-full aspect-[21/9] min-h-[300px] md:min-h-[450px] relative border-y border-border-light overflow-hidden bg-[#EAEAEA] flex items-center justify-center p-8 md:p-12">
          {/* Centered logo with premium fade-in and scale animation */}
          <motion.img 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="/assets/projects/abercrombie/abercrombie-logo.png" 
            alt="Abercrombie Logo" 
            className="relative z-10"
            style={{
              width: 'clamp(180px, 22vw, 360px)',
              height: 'auto',
              maxHeight: '70%',
              objectFit: 'contain'
            }}
          />
          
          <div className="absolute top-8 left-8 flex justify-between items-baseline w-[calc(100%-4rem)] pointer-events-none text-charcoal/50 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest z-10">
            <span>CASE STUDY // BRAND REBRANDING</span>
            <span className="font-bold">ID: {proj.id}</span>
          </div>
          
          <div className="absolute bottom-8 left-8 flex justify-between items-baseline w-[calc(100%-4rem)] pointer-events-none text-charcoal/50 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest z-10">
            <span>{proj.visual.label}</span>
            <span>{proj.year}</span>
          </div>
        </div>
      );
    }

    const { bgColor, textColor, type, label } = proj.visual;
    return (
      <div className={`w-full aspect-[21/9] min-h-[300px] md:min-h-[450px] relative border-y border-border-light overflow-hidden ${bgColor} flex flex-col justify-between p-8 md:p-12`}>
        {/* Decorative Grid Lines / Concentric Circles based on type */}
        <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
          {type === 'grid-lines' && (
            <>
              <div className="w-full h-[1px] bg-bg-light/40 absolute rotate-6" />
              <div className="w-full h-[1px] bg-bg-light/40 absolute -rotate-6" />
              <div className="w-[1px] h-full bg-bg-light/40 absolute left-1/4" />
              <div className="w-[1px] h-full bg-bg-light/40 absolute left-3/4" />
              <div className="w-80 h-80 border-2 border-bg-light/40 rounded-full" />
            </>
          )}
          {type === 'badge-stamp' && (
            <div className="w-64 h-64 border-8 border-dashed border-charcoal rounded-full flex items-center justify-center animate-spin-slow">
              <span className="font-mono text-xs uppercase tracking-widest text-charcoal font-bold">VOTE • SECURE • SYSTEM •</span>
            </div>
          )}
          {type === 'finance-chart' && (
            <div className="w-full h-full flex items-end justify-around px-20">
              {[30, 45, 60, 90, 75, 110, 140, 120].map((h, i) => (
                <div 
                  key={i} 
                  style={{ height: `${h}px` }} 
                  className="w-12 border border-violet/40 bg-violet/10 rounded-t"
                />
              ))}
            </div>
          )}
          {type === 'organic-shapes' && (
            <div className="w-full h-full relative">
              <div className="w-96 h-96 border border-violet/30 rounded-full absolute -top-40 -left-40" />
              <div className="w-80 h-80 border border-violet/40 rounded-full absolute -bottom-20 -right-20 animate-pulse" />
            </div>
          )}
        </div>

        <div className="flex justify-between items-baseline z-10">
          <span className="font-mono text-[10px] uppercase tracking-widest text-violet-dark opacity-60">CASE STUDY // GRAPHIC SYSTEM</span>
          <span className="font-mono text-[10px] uppercase tracking-widest font-bold">ID: {proj.id}</span>
        </div>

        <h2 className="font-syne font-black text-6xl sm:text-8xl md:text-[10vw] text-center select-none z-10 tracking-tighter uppercase leading-none" style={{ color: type.includes('light') || type === 'editorial-block' ? '#111111' : '#EEB8F9' }}>
          {proj.slug.replace('-', ' ')}
        </h2>

        <div className="flex justify-between items-baseline z-10 font-mono text-[10px] uppercase tracking-widest opacity-60">
          <span>{label}</span>
          <span>{proj.year}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <PageTransition />
      
      <div className="min-h-screen bg-bg-light pt-28 pb-16">
        
        {/* Return Button Block */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-charcoal hover:text-violet transition-colors duration-300 cursor-none interactive-hover"
          >
            <ArrowLeft size={14} className="transform group-hover:-translate-x-0.5 transition-transform duration-300" />
            {t.projectPage.backBtn}
          </Link>
        </div>

        {/* Dynamic visual project mockup banner */}
        {renderGiantPlaceholder(project)}

        {/* Project Header block */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 md:mt-16">
          <div className="border-b border-border-light pb-10">
            <h1 className="text-display-md text-charcoal-light uppercase max-w-5xl leading-tight">
              {pContent.title}
            </h1>
          </div>
        </div>

        {/* Project detailed metadata layout */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-border-light pb-12">
            
            {/* Left Header Title / Role metadata (Span 4) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="grid grid-cols-2 gap-4 text-xs md:text-sm">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted block mb-1">
                    {t.projectPage.role}
                  </span>
                  <span className="font-bold text-charcoal">{pContent.role}</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted block mb-1">
                    {t.projectPage.year}
                  </span>
                  <span className="font-bold text-charcoal">{project.year}</span>
                </div>
                <div className="col-span-2 mt-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted block mb-1">
                    {t.projectPage.category}
                  </span>
                  <span className="font-bold text-charcoal leading-relaxed">{pContent.category}</span>
                </div>
              </div>
            </div>

            {/* Right Intro details columns (Span 8) */}
            <div className="lg:col-span-8 space-y-8 lg:pl-10 lg:border-l lg:border-border-light">
              <p className="text-lg md:text-xl leading-relaxed text-charcoal font-light border-l-2 border-violet pl-4">
                {pContent.intro}
              </p>

              {/* Context Block */}
              <div>
                <h3 className="font-syne font-bold text-xs uppercase tracking-wider text-charcoal-muted mb-3">
                  / {t.projectPage.context}
                </h3>
                <p className="text-sm md:text-base text-charcoal leading-relaxed font-light">
                  {pContent.context}
                </p>
              </div>

              {/* Challenge Block */}
              <div>
                <h3 className="font-syne font-bold text-xs uppercase tracking-wider text-charcoal-muted mb-3">
                  / {t.projectPage.challenge}
                </h3>
                <p className="text-sm md:text-base text-charcoal leading-relaxed font-light">
                  {pContent.challenge}
                </p>
              </div>

              {/* Goals Block */}
              <div>
                <h3 className="font-syne font-bold text-xs uppercase tracking-wider text-charcoal-muted mb-3">
                  / {t.projectPage.goals}
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm text-charcoal font-light">
                  {pContent.goals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>

              {/* Process Block */}
              <div>
                <h3 className="font-syne font-bold text-xs uppercase tracking-wider text-charcoal-muted mb-3">
                  / {t.projectPage.process}
                </h3>
                <p className="text-sm md:text-base text-charcoal-muted leading-relaxed font-light">
                  {pContent.process}
                </p>
              </div>

              {/* Solution Block */}
              <div>
                <h3 className="font-syne font-bold text-xs uppercase tracking-wider text-charcoal-muted mb-3">
                  / {t.projectPage.solution}
                </h3>
                <p className="text-sm md:text-base text-charcoal leading-relaxed font-light">
                  {pContent.solution}
                </p>
              </div>

              {/* Outcome Block */}
              <div>
                <h3 className="font-syne font-bold text-xs uppercase tracking-wider text-charcoal-muted mb-3">
                  / {t.projectPage.outcome}
                </h3>
                <p className="text-sm md:text-base text-charcoal leading-relaxed font-light">
                  {pContent.outcome}
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Gallery / Interactive details showcase */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
          {project.slug === 'groupe-adp' ? (
            <div className="space-y-16">
              {/* B. Grand visuel principal inside a mockup browser window */}
              <div className="border border-border-light rounded-lg overflow-hidden bg-bg-light shadow-sm">
                {/* Browser top bar */}
                <div className="bg-charcoal/5 border-b border-border-light px-4 py-3 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="flex-1 max-w-md mx-auto bg-bg-light border border-border-light/60 rounded px-3 py-1 text-center font-mono text-[10px] text-charcoal-muted select-all">
                    groupeadp.fr
                  </div>
                </div>
                {/* Content: Mockup showing the real ADP Logo, contained without distortion or pixelation */}
                <div className="bg-[#0A2A5C] p-12 md:p-24 flex justify-center items-center">
                  <img 
                    src="/assets/projects/groupe-adp/adp-logo.png" 
                    alt="Groupe ADP Logo" 
                    className="w-full h-auto max-w-xl object-contain shadow-sm rounded"
                  />
                </div>
                <div className="p-4 border-t border-border-light bg-charcoal/[0.01]">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-charcoal-muted block mb-1">
                    {language === 'fr' ? 'IDENTITÉ GROUPE ADP' : 'GROUPE ADP IDENTITY'}
                  </span>
                  <span className="font-syne font-bold text-sm text-charcoal">
                    {language === 'fr' ? 'Charte graphique et logo officiel' : 'Official brand identity guidelines'}
                  </span>
                </div>
              </div>

              {/* C. Section Parcours complets & Pages Intranet */}
              <div className="space-y-8 pt-6">
                <div>
                  <h3 className="font-syne font-bold text-xs uppercase tracking-wider text-charcoal-muted mb-2">
                    / {language === 'fr' ? 'Interfaces et pages du portail Intranet' : 'Intranet portal pages & interfaces'}
                  </h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed font-light max-w-2xl">
                    {language === 'fr' 
                      ? 'Explorez les différentes maquettes longues issues du portail. Faites défiler verticalement chaque écran pour analyser la structure de la grille, le traitement typographique et l\'organisation des contenus sans aucune déformation.'
                      : 'Explore the different long-form mockups from the intranet portal. Scroll vertically within each screen to inspect the grid structure, typography, and content layout without distortion.'}
                  </p>
                </div>

                {/* Horizontal scroll / Flex container for multiple mobile viewports */}
                <div className="flex flex-wrap gap-8 justify-center items-start">
                  
                  {/* Screen 1: Brand Studio */}
                  <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-[280px] border border-border-light rounded-lg overflow-hidden bg-bg-light flex flex-col shadow-sm">
                    <div className="bg-charcoal/5 border-b border-border-light px-3 py-2 flex items-center justify-between">
                      <span className="font-mono text-[8px] text-charcoal-muted">brandstudio.adp</span>
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-charcoal/20" />
                        <span className="w-1.5 h-1.5 rounded-full bg-charcoal/20" />
                      </div>
                    </div>
                    <div className="bg-charcoal/[0.02] h-[450px] overflow-y-auto p-4 flex justify-center scrollbar-thin">
                      <img 
                        src="/assets/projects/groupe-adp/adp-brandstudio-full.png" 
                        alt="Brand Studio Page" 
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div className="p-3 border-t border-border-light bg-charcoal/[0.01]">
                      <span className="font-mono text-[8px] uppercase tracking-widest text-violet font-bold block mb-0.5">01 / BRAND STUDIO</span>
                      <span className="text-[10px] text-charcoal-muted font-light leading-tight block">
                        {language === 'fr' ? 'Page de présentation Brand' : 'Brand presentation page'}
                      </span>
                    </div>
                  </div>

                  {/* Screen 2: Le Comité Exécutif (Comex) */}
                  <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-[280px] border border-border-light rounded-lg overflow-hidden bg-bg-light flex flex-col shadow-sm">
                    <div className="bg-charcoal/5 border-b border-border-light px-3 py-2 flex items-center justify-between">
                      <span className="font-mono text-[8px] text-charcoal-muted">comex.adp</span>
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-charcoal/20" />
                        <span className="w-1.5 h-1.5 rounded-full bg-charcoal/20" />
                      </div>
                    </div>
                    <div className="bg-charcoal/[0.02] h-[450px] overflow-y-auto p-4 flex justify-center scrollbar-thin">
                      <img 
                        src="/assets/projects/groupe-adp/adp-comex.png" 
                        alt="Comité Exécutif" 
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div className="p-3 border-t border-border-light bg-charcoal/[0.01]">
                      <span className="font-mono text-[8px] uppercase tracking-widest text-violet font-bold block mb-0.5">02 / LE COMITÉ EXÉCUTIF</span>
                      <span className="text-[10px] text-charcoal-muted font-light leading-tight block">
                        {language === 'fr' ? 'Annuaire et organigramme COMEX' : 'COMEX directory and chart'}
                      </span>
                    </div>
                  </div>

                  {/* Screen 3: Les Marques */}
                  <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-[280px] border border-border-light rounded-lg overflow-hidden bg-bg-light flex flex-col shadow-sm">
                    <div className="bg-charcoal/5 border-b border-border-light px-3 py-2 flex items-center justify-between">
                      <span className="font-mono text-[8px] text-charcoal-muted">marques.adp</span>
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-charcoal/20" />
                        <span className="w-1.5 h-1.5 rounded-full bg-charcoal/20" />
                      </div>
                    </div>
                    <div className="bg-charcoal/[0.02] h-[450px] overflow-y-auto p-4 flex justify-center scrollbar-thin">
                      <img 
                        src="/assets/projects/groupe-adp/adp-marques.png" 
                        alt="Les Marques" 
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div className="p-3 border-t border-border-light bg-charcoal/[0.01]">
                      <span className="font-mono text-[8px] uppercase tracking-widest text-violet font-bold block mb-0.5">03 / ARCHITECTURE DE MARQUE</span>
                      <span className="text-[10px] text-charcoal-muted font-light leading-tight block">
                        {language === 'fr' ? 'Écosystème de marque ADP' : 'ADP brand ecosystem'}
                      </span>
                    </div>
                  </div>

                  {/* Screen 4: Espace Patrimoine */}
                  <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-[280px] border border-border-light rounded-lg overflow-hidden bg-bg-light flex flex-col shadow-sm">
                    <div className="bg-charcoal/5 border-b border-border-light px-3 py-2 flex items-center justify-between">
                      <span className="font-mono text-[8px] text-charcoal-muted">patrimoine.adp</span>
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-charcoal/20" />
                        <span className="w-1.5 h-1.5 rounded-full bg-charcoal/20" />
                      </div>
                    </div>
                    <div className="bg-charcoal/[0.02] h-[450px] overflow-y-auto p-4 flex justify-center scrollbar-thin">
                      <img 
                        src="/assets/projects/groupe-adp/adp-patrimoine.png" 
                        alt="Espace Patrimoine" 
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div className="p-3 border-t border-border-light bg-charcoal/[0.01]">
                      <span className="font-mono text-[8px] uppercase tracking-widest text-violet font-bold block mb-0.5">04 / ESPACE PATRIMOINE</span>
                      <span className="text-[10px] text-charcoal-muted font-light leading-tight block">
                        {language === 'fr' ? 'Page historique et patrimoine' : 'Historical heritage page'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : project.slug === 'abercrombie' ? (
            <div className="space-y-16">
              {/* B. Grand visuel principal inside a mockup browser window */}
              <div className="border border-border-light rounded-lg overflow-hidden bg-bg-light shadow-sm">
                {/* Browser top bar */}
                <div className="bg-charcoal/5 border-b border-border-light px-4 py-3 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="flex-1 max-w-md mx-auto bg-bg-light border border-border-light/60 rounded px-3 py-1 text-center font-mono text-[10px] text-charcoal-muted select-all">
                    abercrombie.com
                  </div>
                </div>
                {/* Content: Mockup showing the real Abercrombie Logo, contained without distortion or pixelation */}
                <div className="bg-[#EAEAEA] p-12 md:p-24 flex justify-center items-center">
                  <img 
                    src="/assets/projects/abercrombie/abercrombie-logo.png" 
                    alt="Abercrombie Logo" 
                    className="w-full h-auto max-w-xl object-contain shadow-sm rounded"
                  />
                </div>
                <div className="p-4 border-t border-border-light bg-charcoal/[0.01]">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-charcoal-muted block mb-1">
                    {language === 'fr' ? 'IDENTITÉ ABERCROMBIE' : 'ABERCROMBIE IDENTITY'}
                  </span>
                  <span className="font-syne font-bold text-sm text-charcoal">
                    {language === 'fr' ? 'Charte graphique et logo officiel' : 'Official brand identity guidelines'}
                  </span>
                </div>
              </div>

              {/* C. Section Parcours complets & Visuels de Rebranding */}
              <div className="space-y-8 pt-6">
                <div>
                  <h3 className="font-syne font-bold text-xs uppercase tracking-wider text-charcoal-muted mb-2">
                    / {language === 'fr' ? 'Visuels du Rebranding & Direction Artistique' : 'Rebranding Visuals & Art Direction'}
                  </h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed font-light max-w-2xl">
                    {language === 'fr' 
                      ? 'Découvrez les maquettes physiques et éditoriales du projet de rebranding. Les visuels intègrent la nouvelle typographie graffiti avec l\'univers brut de la marque.'
                      : 'Discover the physical and editorial mockups of the rebranding project. The visuals integrate the new graffiti typography with the raw brand identity.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  {/* Visual 1: Beat Generation Photo */}
                  <div className="border border-border-light rounded-lg overflow-hidden bg-bg-light shadow-sm flex flex-col">
                    <div className="p-4 bg-charcoal/5 border-b border-border-light">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted block">
                        {language === 'fr' ? '01 / Direction Artistique Photo' : '01 / Photo Art Direction'}
                      </span>
                    </div>
                    <div className="p-4 flex items-center justify-center bg-[#E5E5E5]">
                      <img 
                        src="/assets/projects/abercrombie/abercrombie-beat.jpg" 
                        alt="Abercrombie Beat Generation" 
                        className="w-full h-auto max-h-[500px] object-contain shadow-md rounded"
                      />
                    </div>
                  </div>

                  {/* Visual 2: Business Card Mockup */}
                  <div className="border border-border-light rounded-lg overflow-hidden bg-bg-light shadow-sm flex flex-col">
                    <div className="p-4 bg-charcoal/5 border-b border-border-light">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted block">
                        {language === 'fr' ? '02 / Cartes de Visite Brutalistes' : '02 / Brutalist Business Cards'}
                      </span>
                    </div>
                    <div className="p-4 flex items-center justify-center bg-[#F2F2F2]">
                      <img 
                        src="/assets/projects/abercrombie/abercrombie-card.jpg" 
                        alt="Abercrombie Business Card Mockup" 
                        className="w-full h-auto max-h-[500px] object-contain shadow-md rounded"
                      />
                    </div>
                  </div>

                  {/* Visual 3: Street Billboard Mockup (Span 2) */}
                  <div className="md:col-span-2 border border-border-light rounded-lg overflow-hidden bg-bg-light shadow-sm flex flex-col">
                    <div className="p-4 bg-charcoal/5 border-b border-border-light">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted block">
                        {language === 'fr' ? '03 / Affichage Urbain Mockup' : '03 / Urban Billboard Mockup'}
                      </span>
                    </div>
                    <div className="p-4 flex items-center justify-center bg-[#D6D6D6]">
                      <img 
                        src="/assets/projects/abercrombie/abercrombie-billboard.jpg" 
                        alt="Abercrombie Street Billboard" 
                        className="w-full h-auto max-h-[600px] object-contain shadow-md rounded"
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-[16/10] bg-charcoal/5 border border-border-light flex items-center justify-center p-8 select-none">
                <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted">Visual Spec // layout A</span>
              </div>
              <div className="aspect-[16/10] bg-charcoal/5 border border-border-light flex items-center justify-center p-8 select-none">
                <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted">Visual Spec // layout B</span>
              </div>
            </div>
          )}
        </div>

        {/* Prev / Next project navigation links */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-10 border-t border-border-light">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
            <Link
              to={prevProject.link}
              className="group flex flex-col items-center sm:items-start text-center sm:text-left gap-1 cursor-none interactive-hover"
            >
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted flex items-center gap-1.5">
                <ArrowLeft size={10} />
                {t.projectPage.prevProject}
              </span>
              <span className="font-syne font-bold text-lg md:text-xl text-charcoal group-hover:text-violet transition-colors duration-300 uppercase">
                {prevProject.slug.replace('-', ' ')}
              </span>
            </Link>

            <Link
              to={nextProject.link}
              className="group flex flex-col items-center sm:items-end text-center sm:text-right gap-1 cursor-none interactive-hover"
            >
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted flex items-center gap-1.5">
                {t.projectPage.nextProject}
                <ArrowRight size={10} />
              </span>
              <span className="font-syne font-bold text-lg md:text-xl text-charcoal group-hover:text-violet transition-colors duration-300 uppercase">
                {nextProject.slug.replace('-', ' ')}
              </span>
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
