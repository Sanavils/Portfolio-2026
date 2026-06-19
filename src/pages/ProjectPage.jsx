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
          <span className="font-mono text-[10px] uppercase tracking-widest font-bold">ID: {project.id}</span>
        </div>

        <h2 className="font-syne font-black text-6xl sm:text-8xl md:text-[10vw] text-center select-none z-10 tracking-tighter uppercase leading-none" style={{ color: type.includes('light') || type === 'editorial-block' ? '#111111' : '#EEB8F9' }}>
          {project.slug.replace('-', ' ')}
        </h2>

        <div className="flex justify-between items-baseline z-10 font-mono text-[10px] uppercase tracking-widest opacity-60">
          <span>{label}</span>
          <span>{project.year}</span>
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

        {/* Project detailed metadata layout */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-border-light pb-12">
            
            {/* Left Header Title / Role metadata (Span 4) */}
            <div className="lg:col-span-4 space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-syne font-black uppercase leading-none">
                {pContent.title}
              </h1>
              
              <div className="grid grid-cols-2 gap-4 border-t border-border-light pt-6 text-xs md:text-sm">
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
                  <span className="font-bold text-charcoal">{pContent.category}</span>
                </div>
              </div>
            </div>

            {/* Right Intro details columns (Span 8) */}
            <div className="lg:col-span-8 space-y-8 lg:pl-8 border-l border-border-light/0 lg:border-l lg:border-border-light">
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

        {/* Gallery / Interactive details placeholders */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-[16/10] bg-charcoal/5 border border-border-light flex items-center justify-center p-8 select-none">
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted">Visual Spec // layout A</span>
            </div>
            <div className="aspect-[16/10] bg-charcoal/5 border border-border-light flex items-center justify-center p-8 select-none">
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted">Visual Spec // layout B</span>
            </div>
          </div>
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
