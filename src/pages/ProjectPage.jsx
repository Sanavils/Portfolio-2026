import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { projectsData } from '../data/projectsData';
import { projectSeoMap } from '../data/projectSeoData';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import PrefetchLink from '../components/PrefetchLink';

export default function ProjectPage() {
  const { slug } = useParams();
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
      <>
        <SEO
          title="Project Not Found — Hassen Arkab"
          description="The requested project does not exist or has been moved."
          canonical="https://www.hassenarkab.com/not-found"
          noindex={true}
        />
        <div className="min-h-screen flex flex-col items-center justify-center bg-bg-light px-6">
          <h1 className="text-2xl font-syne font-bold uppercase mb-4">Project Not Found</h1>
          <PrefetchLink to="/work" className="text-xs font-mono font-bold uppercase text-violet underline">
            Back to Work
          </PrefetchLink>
        </div>
      </>
    );
  }

  const pContent = project[language];

  const seoData = projectSeoMap[project.slug] || {
    title: `${project.title || pContent.title} — Hassen Arkab`,
    description: pContent.heroSummary || pContent.intro || `${project.slug} UX/UI Case Study by Hassen Arkab`,
  };

  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: seoData.title,
    headline: seoData.title,
    description: seoData.description,
    author: {
      '@type': 'Person',
      name: 'Hassen Arkab',
      jobTitle: 'UX/UI Designer',
      url: 'https://www.hassenarkab.com',
    },
    url: `https://www.hassenarkab.com/work/${project.slug}`,
    image: `https://www.hassenarkab.com${project.image || '/og-image.jpg'}`,
    inLanguage: language === 'fr' ? 'fr-FR' : 'en-US',
  };

  // Get Next/Prev project configurations
  const prevProject = projectsData[projectIndex === 0 ? projectsData.length - 1 : projectIndex - 1];
  const nextProject = projectsData[projectIndex === projectsData.length - 1 ? 0 : projectIndex + 1];

  const projectTitleDisplay = project.id === "02" 
    ? "Abercrombie & Fitch" 
    : project.id === "01" 
      ? "Groupe ADP" 
      : project.id === "03" 
        ? "Civic Vote" 
        : project.slug.replace('-', ' ');

  // Render giant visual mockup cover (taking 100% of container width)
  const renderGiantPlaceholder = (proj) => {
    if (proj.slug === 'groupe-adp') {
      return (
        <div className="w-full aspect-[21/9] min-h-[300px] md:min-h-[460px] relative border border-border-light rounded-xl overflow-hidden bg-[#0A2A5C] flex items-center justify-center shadow-sm">
          {/* Main visual taking 100% of the block */}
          <motion.img 
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src="/assets/projects/groupe-adp/adp-logo.png" 
            alt="Groupe ADP" 
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover relative z-10"
          />
          
          <div className="absolute top-5 left-6 md:top-6 md:left-8 flex justify-between items-baseline w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] pointer-events-none text-white/60 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest z-20">
            <span>CASE STUDY // CORPORATE REDESIGN</span>
            <span className="font-bold">ID: {proj.id}</span>
          </div>
          
          <div className="absolute bottom-5 left-6 md:bottom-6 md:left-8 flex justify-between items-baseline w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] pointer-events-none text-white/60 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest z-20">
            <span>{proj.visual.label}</span>
            <span>{proj.year}</span>
          </div>
        </div>
      );
    }

    if (proj.slug === 'abercrombie') {
      return (
        <div className="w-full aspect-[21/9] min-h-[300px] md:min-h-[460px] relative border border-border-light rounded-xl overflow-hidden bg-[#EAEAEA] flex items-center justify-center shadow-sm">
          {/* Main visual taking 100% of the block */}
          <motion.img 
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src="/assets/projects/abercrombie/abercrombie-logo.png" 
            alt="Abercrombie" 
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover relative z-10"
          />
          
          <div className="absolute top-5 left-6 md:top-6 md:left-8 flex justify-between items-baseline w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] pointer-events-none text-charcoal/60 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest z-20">
            <span>CASE STUDY // BRAND REBRANDING</span>
            <span className="font-bold">ID: {proj.id}</span>
          </div>
          
          <div className="absolute bottom-5 left-6 md:bottom-6 md:left-8 flex justify-between items-baseline w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] pointer-events-none text-charcoal/60 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest z-20">
            <span>{proj.visual.label}</span>
            <span>{proj.year}</span>
          </div>
        </div>
      );
    }

    if (proj.slug === 'civic-vote') {
      return (
        <div className="w-full aspect-[16/9] max-h-[600px] min-h-[300px] md:min-h-[460px] relative border border-border-light rounded-xl overflow-hidden bg-[#8D4FE7] flex items-center justify-center shadow-sm">
          {/* Main visual taking 100% of the block */}
          <motion.img 
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src="/assets/projects/civic-vote/civic-vote-hero.png" 
            alt="Civic Vote — Se déplacer pour voter" 
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover relative z-10"
          />
          
          <div className="absolute top-5 right-6 md:top-6 md:right-8 pointer-events-none text-white/90 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest z-20 flex items-center gap-3">
            <span className="hidden sm:inline">CASE STUDY // CIVIC CAMPAIGN</span>
            <span className="font-bold bg-white/20 backdrop-blur px-2 py-0.5 rounded">ID: {proj.id}</span>
          </div>
          
          <div className="absolute bottom-5 right-6 md:bottom-6 md:right-8 pointer-events-none text-white/90 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest z-20">
            <span>{proj.visual.label} &bull; {proj.year}</span>
          </div>
        </div>
      );
    }

    if (proj.slug === 'okane') {
      return (
        <div className="w-full aspect-[16/9] max-h-[600px] min-h-[300px] md:min-h-[460px] relative border border-border-light rounded-xl overflow-hidden bg-[#5DB075] flex items-center justify-center shadow-sm">
          {/* Main visual taking 100% of the block */}
          <motion.img 
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src="/assets/projects/okane/okane-logo.png" 
            alt="Okane Logo" 
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover relative z-10"
          />
          
          <div className="absolute top-5 left-6 md:top-6 md:left-8 flex justify-between items-baseline w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] pointer-events-none text-white/80 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest z-20">
            <span>CASE STUDY // PRODUCT DESIGN</span>
            <span className="font-bold bg-white/20 backdrop-blur px-2 py-0.5 rounded text-white">ID: {proj.id}</span>
          </div>
          
          <div className="absolute bottom-5 left-6 md:bottom-6 md:left-8 flex justify-between items-baseline w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] pointer-events-none text-white/80 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest z-20">
            <span>{proj.visual.label}</span>
            <span>{proj.year}</span>
          </div>
        </div>
      );
    }

    const { bgColor, type, label } = proj.visual;
    return (
      <div className={`w-full aspect-[21/9] min-h-[300px] md:min-h-[440px] relative border border-border-light rounded-xl overflow-hidden ${bgColor} flex flex-col justify-between p-8 md:p-12 shadow-sm`}>
        {/* Decorative Graphic Lines based on type */}
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
          <span className="font-mono text-[10px] uppercase tracking-widest text-violet-dark opacity-70">CASE STUDY // GRAPHIC SYSTEM</span>
          <span className="font-mono text-[10px] uppercase tracking-widest font-bold">ID: {proj.id}</span>
        </div>

        <div className="font-syne font-black text-5xl sm:text-7xl md:text-8xl text-center select-none z-10 tracking-tight uppercase leading-none" style={{ color: type.includes('light') || type === 'editorial-block' ? '#111111' : '#EEB8F9' }}>
          {proj.slug.replace('-', ' ')}
        </div>

        <div className="flex justify-between items-baseline z-10 font-mono text-[10px] uppercase tracking-widest opacity-70">
          <span>{label}</span>
          <span>{proj.year}</span>
        </div>
      </div>
    );
  };

  // Render high-fidelity editorial showcases for projects without photo assets
  const renderEditorialShowcase = (proj) => {
    const isFr = language === 'fr';

    const getShowcaseData = (slug) => {
      switch (slug) {
        case 'serinity':
          return {
            title: isFr ? 'Design System & Architecture Calme' : 'Design System & Calm Architecture',
            subtitle: isFr
              ? 'Exploration de l’univers apaisant de Serinity : palette sage/violet, typographie calme et micro-interactions de respiration.'
              : 'Exploration of Serinity’s tranquil universe: sage/violet palette, serene typography and breathing micro-interactions.',
            board1Title: isFr ? '01 / Système Typographique & Couleurs Apaisantes' : '01 / Typographic System & Calm Colors',
            board1Theme: 'bg-[#F2F7F4] text-[#192420]',
            board2Title: isFr ? '02 / Anatomie de l’Interface & Suivi Émotionnel' : '02 / Interface Anatomy & Mood Tracking',
            board2Theme: 'bg-[#FAF6F8] text-[#192420]',
            pills1: ['Sage Green #E2EFE7', 'Soft Violet #EEB8F9', 'Off-White #FAFAF7', 'Dark Slate #192420'],
            pills2: ['Daily Check-in', 'Breathing Rhythm 4-7-8', 'Weekly Mood Trends', 'Zero Notification Anxiety'],
            metrics: [
              { label: isFr ? 'Temps d’onboarding' : 'Onboarding Time', val: '< 45s' },
              { label: isFr ? 'Score de clarté' : 'Clarity Score', val: '98%' },
              { label: isFr ? 'Charge cognitive' : 'Cognitive Load', val: 'Minimale' },
            ]
          };
        case 'scentify':
          return {
            title: isFr ? 'Hardware-Software & Dial de Diffusion' : 'Hardware-Software & Diffusion Dial',
            subtitle: isFr
              ? 'Conception de l’interface de contrôle tactile et de l’expérience de recharge pour le diffuseur connecté Scentify.'
              : 'Interface design for touch-control ambient diffusion and cartridge replenishment for the Scentify connected diffuser.',
            board1Title: isFr ? '01 / Cadran Tactile & Courbes d’Intensité' : '01 / Touch Dial & Intensity Curves',
            board1Theme: 'bg-[#18181E] text-white',
            board2Title: isFr ? '02 / Bibliothèque Olfactive & Gestion des Capsules' : '02 / Olfactory Library & Pod Management',
            board2Theme: 'bg-[#221C26] text-white',
            pills1: ['Rotary Dial UI', 'Intensity Curves 0-100%', 'Quiet Schedule Mode', 'BLE 5.2 Auto-Pairing'],
            pills2: ['Amber & Cedar Pod', 'Bergamot Crisp', 'Lavender Dusk', 'Smart RFID Reorder'],
            metrics: [
              { label: isFr ? 'Précision diffusion' : 'Diffusion Precision', val: '10 Niveaux' },
              { label: isFr ? 'Autonomie pod' : 'Pod Lifespan', val: '60 Jours' },
              { label: isFr ? 'Appairage instantané' : 'Pairing Speed', val: '< 2.5s' },
            ]
          };
        case 'muse':
          return {
            title: isFr ? 'Intelligence Artificielle & Stylisme Digital' : 'Artificial Intelligence & Digital Styling',
            subtitle: isFr
              ? 'Visualisation de l’architecture du dressing virtuel et du moteur d’affinité morphologique et stylistique de MUSE.'
              : 'Architecture visualization of the virtual closet and morphological styling affinity engine of MUSE.',
            board1Title: isFr ? '01 / Indexation Automatique & Dressing Virtuel' : '01 / Auto-Cataloging & Digital Wardrobe',
            board1Theme: 'bg-[#F9F7F5] text-charcoal',
            board2Title: isFr ? '02 / Matrice de Recommandation & Validation' : '02 / Recommendation Matrix & Validation',
            board2Theme: 'bg-[#1C1824] text-white',
            pills1: ['Auto-Segmentation', 'Color Palette Extraction', 'Occasion Classifier', 'Layering Engine'],
            pills2: ['Style DNA Score 94%', 'Weather-Aware Outfits', 'User Veto Power', 'Zero Ghost Choices'],
            metrics: [
              { label: isFr ? 'Précision IA style' : 'AI Match Precision', val: '94%' },
              { label: isFr ? 'Temps composition' : 'Outfit Assembly', val: '< 1.2s' },
              { label: isFr ? 'Taux d’adoption' : 'User Adoption', val: '86%' },
            ]
          };
        case 'alya':
          return {
            title: isFr ? 'Télémétrie d’Effort & Expérience Athlétique' : 'Effort Telemetry & Athletic Experience',
            subtitle: isFr
              ? 'Interface haute performance conçue pour les sportifs : monitoring cardiaque, anneaux de charge et coaching adaptatif.'
              : 'High-performance interface designed for athletes: heart-rate monitoring, strain rings, and adaptive coaching.',
            board1Title: isFr ? '01 / Anneaux d’Intensité & Zones Métaboliques' : '01 / Intensity Rings & Metabolic Zones',
            board1Theme: 'bg-[#0E0E12] text-white',
            board2Title: isFr ? '02 / Algorithme de Récupération & Progression' : '02 / Recovery Algorithm & Progression',
            board2Theme: 'bg-[#16131F] text-white',
            pills1: ['Zone 2 Aerobic', 'Anaerobic Peak', 'Heart Rate Variability', 'Strain Target Index'],
            pills2: ['Daily Readiness 88/100', 'Sleep Debt Tracker', 'Adaptive Pace Guard', 'Community PRs'],
            metrics: [
              { label: isFr ? 'Fréquence de sync' : 'Sync Frequency', val: 'Temps réel' },
              { label: isFr ? 'Index récupération' : 'Recovery Accuracy', val: '91%' },
              { label: isFr ? 'Lisibilité plein soleil' : 'Direct Sunlight UI', val: 'AAA Ultra' },
            ]
          };
        default:
          return null;
      }
    };

    const data = getShowcaseData(proj.slug);
    if (!data) return null;

    return (
      <div className="space-y-8 mt-4">
        <div>
          <p className="text-xs text-charcoal-muted leading-relaxed font-light max-w-[680px]">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Board 1 */}
          <div className="border border-border-light rounded-xl overflow-hidden bg-bg-light shadow-sm flex flex-col">
            <div className="p-4 bg-charcoal/5 border-b border-border-light flex justify-between items-center">
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted font-bold">
                {data.board1Title}
              </span>
              <span className="font-mono text-[9px] text-violet font-bold uppercase tracking-widest">
                SPEC // A
              </span>
            </div>
            <div className={`p-8 ${data.board1Theme} flex-1 flex flex-col justify-between min-h-[320px]`}>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {data.pills1.map((pill, i) => (
                    <span key={i} className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-current/20 opacity-80">
                      {pill}
                    </span>
                  ))}
                </div>
                <div className="pt-6 font-syne font-black text-2xl uppercase tracking-tight opacity-90">
                  {projTitleDisplay}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-8 border-t border-current/10">
                {data.metrics.map((m, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-mono text-[8px] uppercase tracking-widest opacity-60">{m.label}</span>
                    <span className="font-syne font-black text-sm sm:text-base mt-0.5">{m.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Board 2 */}
          <div className="border border-border-light rounded-xl overflow-hidden bg-bg-light shadow-sm flex flex-col">
            <div className="p-4 bg-charcoal/5 border-b border-border-light flex justify-between items-center">
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted font-bold">
                {data.board2Title}
              </span>
              <span className="font-mono text-[9px] text-violet font-bold uppercase tracking-widest">
                SPEC // B
              </span>
            </div>
            <div className={`p-8 ${data.board2Theme} flex-1 flex flex-col justify-between min-h-[320px]`}>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {data.pills2.map((pill, i) => (
                    <span key={i} className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-current/20 opacity-80">
                      {pill}
                    </span>
                  ))}
                </div>
                <div className="pt-6 font-mono text-xs uppercase tracking-widest opacity-70">
                  // ARCHITECTURE & INTERFACE
                </div>
              </div>

              <div className="p-4 rounded-lg border border-current/15 bg-current/[0.03] mt-6">
                <div className="flex justify-between items-center font-mono text-[9px] uppercase tracking-widest opacity-70 mb-2">
                  <span>SYSTEM VALIDATION</span>
                  <span>PARIS 2026</span>
                </div>
                <div className="w-full bg-current/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-violet h-full w-4/5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const projTitleDisplay = project.id === "02" 
    ? "Abercrombie & Fitch" 
    : project.id === "01" 
      ? "Groupe ADP" 
      : project.id === "03" 
        ? "Civic Vote" 
        : project.slug.replace('-', ' ');

  return (
    <>
      <SEO
        title={seoData.title}
        description={seoData.description}
        canonical={`https://www.hassenarkab.com/work/${project.slug}`}
        schema={creativeWorkSchema}
      />
      <PageTransition />
      
      <div className="min-h-screen bg-bg-light pt-28 pb-20">
        
        {/* ──────────────────────────────────────────────────────────── */}
        {/* 1. TOP BAR: BREADCRUMB & BACK BUTTON                        */}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-light">
            
            {/* Discrete breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-charcoal-muted">
              <PrefetchLink to="/" className="hover:text-violet transition-colors">
                {t.projectPage.breadcrumbHome}
              </PrefetchLink>
              <span className="text-charcoal/20">/</span>
              <PrefetchLink to="/work" className="hover:text-violet transition-colors">
                {t.projectPage.breadcrumbWork}
              </PrefetchLink>
              <span className="text-charcoal/20">/</span>
              <span className="text-charcoal font-bold truncate max-w-[220px] sm:max-w-none">
                {projectTitleDisplay}
              </span>
            </nav>

            {/* Back to work visible top button */}
            <PrefetchLink
              to="/work"
              className="group inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-charcoal hover:text-violet transition-colors duration-300 self-start sm:self-auto cursor-none interactive-hover"
            >
              <ArrowLeft size={14} className="transform group-hover:-translate-x-1 transition-transform duration-300" />
              {t.projectPage.backBtn}
            </PrefetchLink>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────── */}
        {/* 2. PROJECT HERO HEADER: LABEL, TITLE, INTRO & METADATA GRID  */}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-4">
          
          {/* Discrete small label */}
          <span className="font-mono text-[10px] uppercase tracking-widest text-violet font-bold block mb-4">
            / {t.projectPage.caseStudyLabel} // {project.year}
          </span>

          {/* Clean, readable heading in font-syne extra-bold (clamp responsive, max-w-[1100px], no awkward breaks) */}
          <h1 
            className="font-syne font-extrabold text-charcoal-light uppercase tracking-tight text-balance"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4.4rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.035em',
              maxWidth: '1100px'
            }}
          >
            {pContent.title}
          </h1>

          {/* Short project intro (2 to 3 lines max) */}
          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-light max-w-[850px] mt-6 border-l-2 border-violet pl-4">
            {pContent.intro}
          </p>

          {/* Clean, airy metadata block (4 columns) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 mt-8 border-t border-border-light">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted block mb-1">
                {t.projectPage.role}
              </span>
              <span className="font-syne font-bold text-xs sm:text-sm text-charcoal block leading-snug">
                {pContent.role}
              </span>
            </div>

            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted block mb-1">
                {t.projectPage.year}
              </span>
              <span className="font-syne font-bold text-xs sm:text-sm text-charcoal block leading-snug">
                {project.year}
              </span>
            </div>

            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted block mb-1">
                {t.projectPage.category}
              </span>
              <span className="font-syne font-bold text-xs sm:text-sm text-charcoal block leading-snug">
                {pContent.category}
              </span>
            </div>

            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted block mb-1">
                {t.projectPage.tools}
              </span>
              <span className="font-syne font-bold text-xs sm:text-sm text-charcoal block leading-snug">
                {project.tags.join(', ')}
              </span>
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────── */}
        {/* 3. GRAND VISUEL PRINCIPAL (HERO BANNER 100% WIDTH)          */}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 my-12 md:my-16">
          {renderGiantPlaceholder(project)}
        </div>

        {/* ──────────────────────────────────────────────────────────── */}
        {/* 4. CASE STUDY BODY: 7 NUMBERED READABLE SECTIONS            */}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          {/* 01 / CONTEXT */}
          <section className="border-t border-border-light pt-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
              <div className="lg:col-span-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-violet font-bold block mb-1">
                  SECTION // 01
                </span>
                <h2 className="font-syne font-bold text-sm sm:text-base uppercase tracking-wider text-charcoal">
                  {t.projectPage.context}
                </h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-base sm:text-lg text-charcoal/80 leading-[1.65] font-light max-w-[680px]">
                  {pContent.context}
                </p>
              </div>
            </div>
          </section>

          {/* 02 / CHALLENGE */}
          <section className="border-t border-border-light pt-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
              <div className="lg:col-span-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-violet font-bold block mb-1">
                  SECTION // 02
                </span>
                <h2 className="font-syne font-bold text-sm sm:text-base uppercase tracking-wider text-charcoal">
                  {t.projectPage.challenge}
                </h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-base sm:text-lg text-charcoal/80 leading-[1.65] font-light max-w-[680px]">
                  {pContent.challenge}
                </p>
              </div>
            </div>
          </section>

          {/* 03 / GOALS */}
          <section className="border-t border-border-light pt-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
              <div className="lg:col-span-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-violet font-bold block mb-1">
                  SECTION // 03
                </span>
                <h2 className="font-syne font-bold text-sm sm:text-base uppercase tracking-wider text-charcoal">
                  {t.projectPage.goals}
                </h2>
              </div>
              <div className="lg:col-span-8">
                <ul className="space-y-3 max-w-[680px]">
                  {pContent.goals.map((goal, index) => (
                    <li key={index} className="flex items-start gap-3 text-base sm:text-lg text-charcoal/80 leading-[1.65] font-light">
                      <span className="text-violet font-bold mt-1 select-none">—</span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 04 / PROCESS */}
          <section className="border-t border-border-light pt-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
              <div className="lg:col-span-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-violet font-bold block mb-1">
                  SECTION // 04
                </span>
                <h2 className="font-syne font-bold text-sm sm:text-base uppercase tracking-wider text-charcoal">
                  {t.projectPage.process}
                </h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-base sm:text-lg text-charcoal/80 leading-[1.65] font-light max-w-[680px]">
                  {pContent.process}
                </p>
              </div>
            </div>
          </section>

          {/* 05 / SOLUTION */}
          <section className="border-t border-border-light pt-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
              <div className="lg:col-span-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-violet font-bold block mb-1">
                  SECTION // 05
                </span>
                <h2 className="font-syne font-bold text-sm sm:text-base uppercase tracking-wider text-charcoal">
                  {t.projectPage.solution}
                </h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-base sm:text-lg text-charcoal/80 leading-[1.65] font-light max-w-[680px]">
                  {pContent.solution}
                </p>
              </div>
            </div>
          </section>

          {/* 06 / VISUALS & DETAILED MOCKUPS */}
          <section className="border-t border-border-light pt-10">
            <div className="mb-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-violet font-bold block mb-1">
                SECTION // 06
              </span>
              <h2 className="font-syne font-bold text-sm sm:text-base uppercase tracking-wider text-charcoal">
                {t.projectPage.visuals}
              </h2>
            </div>

            {project.slug === 'groupe-adp' ? (
              <div className="space-y-6">
                <p className="text-xs text-charcoal-muted leading-relaxed font-light max-w-[680px]">
                  {language === 'fr' 
                    ? 'Explorez les différentes maquettes issues du portail. Faites défiler verticalement chaque écran pour analyser la structure de la grille, le traitement typographique et l\'organisation des contenus sans aucune déformation.'
                    : 'Explore the different mockups from the intranet portal. Scroll vertically within each screen to inspect the grid structure, typography, and content layout without distortion.'}
                </p>

                {/* Grid container for 4 screens */}
                <div className="flex flex-wrap gap-6 justify-center items-start pt-4">
                  {/* Screen 1: Brand Studio */}
                  <div className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] max-w-[280px] border border-border-light rounded-xl overflow-hidden bg-bg-light flex flex-col shadow-sm">
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
                        alt="Capture d’écran de la page Brand Studio Groupe ADP" 
                        loading="lazy"
                        decoding="async"
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
                  <div className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] max-w-[280px] border border-border-light rounded-xl overflow-hidden bg-bg-light flex flex-col shadow-sm">
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
                        alt="Capture d’écran de l’organigramme du Comité Exécutif Groupe ADP" 
                        loading="lazy"
                        decoding="async"
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
                  <div className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] max-w-[280px] border border-border-light rounded-xl overflow-hidden bg-bg-light flex flex-col shadow-sm">
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
                        alt="Capture d’écran de la page Architecture des Marques Groupe ADP" 
                        loading="lazy"
                        decoding="async"
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
                  <div className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] max-w-[280px] border border-border-light rounded-xl overflow-hidden bg-bg-light flex flex-col shadow-sm">
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
                        alt="Capture d’écran de la page Espace Patrimoine Groupe ADP" 
                        loading="lazy"
                        decoding="async"
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
            ) : project.slug === 'abercrombie' ? (
              <div className="space-y-6">
                <p className="text-xs text-charcoal-muted leading-relaxed font-light max-w-[680px]">
                  {language === 'fr' 
                    ? 'Découvrez les maquettes physiques et éditoriales du projet de rebranding. Les visuels intègrent la nouvelle typographie avec l\'univers brut de la marque.'
                    : 'Discover the physical and editorial mockups of the rebranding project. The visuals integrate the new typography with the raw brand identity.'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-4">
                  {/* Visual 1: Beat Generation Photo */}
                  <div className="border border-border-light rounded-xl overflow-hidden bg-bg-light shadow-sm flex flex-col">
                    <div className="p-4 bg-charcoal/5 border-b border-border-light">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted block">
                        {language === 'fr' ? '01 / Direction Artistique Photo' : '01 / Photo Art Direction'}
                      </span>
                    </div>
                    <div className="p-4 flex items-center justify-center bg-[#E5E5E5]">
                      <img 
                        src="/assets/projects/abercrombie/abercrombie-beat.jpg" 
                        alt="Direction artistique photo Beat Generation pour Abercrombie" 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto max-h-[500px] object-contain shadow-md rounded"
                      />
                    </div>
                  </div>

                  {/* Visual 2: Business Card Mockup */}
                  <div className="border border-border-light rounded-xl overflow-hidden bg-bg-light shadow-sm flex flex-col">
                    <div className="p-4 bg-charcoal/5 border-b border-border-light">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted block">
                        {language === 'fr' ? '02 / Cartes de Visite Brutalistes' : '02 / Brutalist Business Cards'}
                      </span>
                    </div>
                    <div className="p-4 flex items-center justify-center bg-[#F2F2F2]">
                      <img 
                        src="/assets/projects/abercrombie/abercrombie-card.jpg" 
                        alt="Cartes de visite typographiques et minimalistes pour Abercrombie" 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto max-h-[500px] object-contain shadow-md rounded"
                      />
                    </div>
                  </div>

                  {/* Visual 3: Street Billboard Mockup (Span 2) */}
                  <div className="md:col-span-2 border border-border-light rounded-xl overflow-hidden bg-bg-light shadow-sm flex flex-col">
                    <div className="p-4 bg-charcoal/5 border-b border-border-light">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted block">
                        {language === 'fr' ? '03 / Affichage Urbain Mockup' : '03 / Urban Billboard Mockup'}
                      </span>
                    </div>
                    <div className="p-4 flex items-center justify-center bg-[#D6D6D6]">
                      <img 
                        src="/assets/projects/abercrombie/abercrombie-billboard.jpg" 
                        alt="Affichage urbain grand format pour le rebranding d’Abercrombie" 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto max-h-[600px] object-contain shadow-md rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : project.slug === 'civic-vote' ? (
              <div className="space-y-6">
                <p className="text-xs text-charcoal-muted leading-relaxed font-light max-w-[680px]">
                  {language === 'fr' 
                    ? 'Découvrez les déclinaisons graphiques de la campagne citoyenne. Des illustrations vivantes, pop et engageantes conçues pour mobiliser les jeunes électeurs.'
                    : 'Explore the graphic variations of the civic campaign. Vibrant, bold, and engaging illustrations designed to mobilize young voters.'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-4">
                  {/* Visual 1: Allons Voter */}
                  <div className="border border-border-light rounded-xl overflow-hidden bg-bg-light shadow-sm flex flex-col">
                    <div className="p-4 bg-charcoal/5 border-b border-border-light">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted block">
                        {language === 'fr' ? '01 / Déclinaison Réseaux — Allons Voter' : '01 / Social Media — Allons Voter'}
                      </span>
                    </div>
                    <div className="p-6 md:p-8 flex items-center justify-center bg-[#F3EEFA] flex-1">
                      <img 
                        src="/assets/projects/civic-vote/civic-vote-allons-voter.png" 
                        alt="Illustration digitale de campagne civique Allons Voter" 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto max-h-[550px] object-contain shadow-md rounded"
                      />
                    </div>
                  </div>

                  {/* Visual 2: En Route Pour Voter */}
                  <div className="border border-border-light rounded-xl overflow-hidden bg-bg-light shadow-sm flex flex-col">
                    <div className="p-4 bg-charcoal/5 border-b border-border-light">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted block">
                        {language === 'fr' ? '02 / Affiche Campagne — En Route Pour Voter' : '02 / Campaign Poster — En Route Pour Voter'}
                      </span>
                    </div>
                    <div className="p-6 md:p-8 flex items-center justify-center bg-[#F3EEFA] flex-1">
                      <img 
                        src="/assets/projects/civic-vote/civic-vote-en-route.png" 
                        alt="Affiche de mobilisation citoyenne En Route Pour Voter" 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto max-h-[550px] object-contain shadow-md rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : project.slug === 'okane' ? (
              <div className="space-y-6">
                <p className="text-xs text-charcoal-muted leading-relaxed font-light max-w-[680px]">
                  {language === 'fr' 
                    ? 'Découvrez les maquettes de l’application Okane. Une expérience conçue pour simplifier le suivi budgétaire au quotidien grâce à des jauges visuelles claires et un ton bienveillant.'
                    : 'Explore the Okane application mockups. An experience designed to simplify daily budget tracking through clear visual gauges and an approachable tone.'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-4">
                  {/* Visual 1: Mockup Trio Overview */}
                  <div className="border border-border-light rounded-xl overflow-hidden bg-bg-light shadow-sm flex flex-col">
                    <div className="p-4 bg-charcoal/5 border-b border-border-light">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted block">
                        {language === 'fr' ? '01 / Parcours Global — Onboarding, Accueil & Suivi' : '01 / Global Journey — Onboarding, Home & Tracking'}
                      </span>
                    </div>
                    <div className="p-6 md:p-8 flex items-center justify-center bg-[#F4FAF6] flex-1">
                      <img 
                        src="/assets/projects/okane/okane-mockups-trio.png" 
                        alt="Maquettes de l’application mobile Okane : onboarding et suivi de budget" 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto max-h-[550px] object-contain shadow-md rounded"
                      />
                    </div>
                  </div>

                  {/* Visual 2: Detailed Expenses Screen */}
                  <div className="border border-border-light rounded-xl overflow-hidden bg-bg-light shadow-sm flex flex-col">
                    <div className="p-4 bg-charcoal/5 border-b border-border-light">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted block">
                        {language === 'fr' ? '02 / Vue Détaillée — Gestion des Dépenses & Catégories' : '02 / Detailed View — Expense Tracking & Categories'}
                      </span>
                    </div>
                    <div className="p-6 md:p-8 flex items-center justify-center bg-[#F4FAF6] flex-1">
                      <img 
                        src="/assets/projects/okane/okane-screen-expenses.png" 
                        alt="Écran détaillé de ventilation des dépenses de l’application Okane" 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto max-h-[550px] object-contain shadow-md rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              renderEditorialShowcase(project)
            )}
          </section>

          {/* 07 / OUTCOME */}
          <section className="border-t border-border-light pt-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
              <div className="lg:col-span-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-violet font-bold block mb-1">
                  SECTION // 07
                </span>
                <h2 className="font-syne font-bold text-sm sm:text-base uppercase tracking-wider text-charcoal">
                  {t.projectPage.outcome}
                </h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-base sm:text-lg text-charcoal/80 leading-[1.65] font-light max-w-[680px]">
                  {pContent.outcome}
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* ──────────────────────────────────────────────────────────── */}
        {/* 5. CONTACT CTA BANNER (DISCRETE END-OF-CASE-STUDY)          */}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20">
          <div className="border border-border-light rounded-xl p-8 sm:p-12 bg-charcoal/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-violet font-bold block">
                / {language === 'fr' ? 'COLLABORATION' : 'COLLABORATION'}
              </span>
              <h3 className="font-syne font-black text-xl sm:text-2xl uppercase tracking-tight text-charcoal">
                {t.projectPage.contactCtaTitle}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted font-light max-w-xl">
                {t.projectPage.contactCtaSubtitle}
              </p>
            </div>
            <PrefetchLink
              to="/contact"
              className="px-6 py-3 rounded-full bg-charcoal text-bg-light hover:bg-violet hover:text-charcoal font-mono text-xs uppercase font-bold tracking-widest transition-all duration-300 self-start md:self-auto cursor-none interactive-hover whitespace-nowrap shadow-xs"
            >
              {t.projectPage.contactCtaBtn}
            </PrefetchLink>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────── */}
        {/* 6. BOTTOM NAVIGATION (PREV / BACK TO WORK / NEXT)           */}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-10 border-t border-border-light">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            
            {/* Prev Project */}
            <PrefetchLink
              to={prevProject.link}
              className="group flex flex-col items-center sm:items-start text-center sm:text-left gap-1 cursor-none interactive-hover"
            >
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted flex items-center gap-1.5">
                <ArrowLeft size={10} className="transform group-hover:-translate-x-1 transition-transform duration-300" />
                {t.projectPage.prevProject}
              </span>
              <span className="font-syne font-bold text-base sm:text-lg text-charcoal group-hover:text-violet transition-colors duration-300 uppercase">
                {prevProject.id === "02" ? "Abercrombie & Fitch" : prevProject.id === "01" ? "Groupe ADP" : prevProject.id === "03" ? "Civic Vote" : prevProject.slug.replace('-', ' ')}
              </span>
            </PrefetchLink>

            {/* Back to work centered button */}
            <PrefetchLink
              to="/work"
              className="px-6 py-2.5 rounded-full border border-charcoal/20 hover:border-violet hover:bg-violet hover:text-charcoal font-mono text-xs uppercase font-bold tracking-widest transition-all duration-300 cursor-none interactive-hover my-2 sm:my-0"
            >
              {t.projectPage.backBtn}
            </PrefetchLink>

            {/* Next Project */}
            <PrefetchLink
              to={nextProject.link}
              className="group flex flex-col items-center sm:items-end text-center sm:text-right gap-1 cursor-none interactive-hover"
            >
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted flex items-center gap-1.5">
                {t.projectPage.nextProject}
                <ArrowRight size={10} className="transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <span className="font-syne font-bold text-base sm:text-lg text-charcoal group-hover:text-violet transition-colors duration-300 uppercase">
                {nextProject.id === "02" ? "Abercrombie & Fitch" : nextProject.id === "01" ? "Groupe ADP" : nextProject.id === "03" ? "Civic Vote" : nextProject.slug.replace('-', ' ')}
              </span>
            </PrefetchLink>

          </div>
        </div>

      </div>
    </>
  );
}
