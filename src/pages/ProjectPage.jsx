import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { projectsData } from '../data/projectsData';
import { projectSeoMap } from '../data/projectSeoData';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';

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
        <div className="min-h-screen flex flex-col items-center justify-center bg-bg-light">
          <h1 className="text-2xl font-syne font-bold uppercase mb-4">Project Not Found</h1>
          <Link to="/work" className="text-xs font-mono font-bold uppercase text-violet underline">
            Back to Work
          </Link>
        </div>
      </>
    );
  }

  const pContent = project[language];

  const seoData = projectSeoMap[project.slug] || {
    title: `${project.title} — Hassen Arkab`,
    description: pContent.heroSummary || `${project.title} UX/UI Case Study by Hassen Arkab`,
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

  // Render giant visual mockup cover
  const renderGiantPlaceholder = (proj) => {
    if (proj.slug === 'groupe-adp') {
      return (
        <div className="w-full aspect-[21/9] min-h-[320px] md:min-h-[480px] relative border-y border-border-light overflow-hidden bg-[#0A2A5C] flex items-center justify-center">
          {/* Main visual taking 100% of the block */}
          <motion.img 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="/assets/projects/groupe-adp/adp-logo.png" 
            alt="Groupe ADP" 
            className="w-full h-full object-cover relative z-10"
          />
          
          <div className="absolute top-6 left-6 md:top-8 md:left-8 flex justify-between items-baseline w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] pointer-events-none text-white/50 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest z-20">
            <span>CASE STUDY // CORPORATE REDESIGN</span>
            <span className="font-bold">ID: {proj.id}</span>
          </div>
          
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex justify-between items-baseline w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] pointer-events-none text-white/50 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest z-20">
            <span>{proj.visual.label}</span>
            <span>{proj.year}</span>
          </div>
        </div>
      );
    }

    if (proj.slug === 'abercrombie') {
      return (
        <div className="w-full aspect-[21/9] min-h-[320px] md:min-h-[480px] relative border-y border-border-light overflow-hidden bg-[#EAEAEA] flex items-center justify-center">
          {/* Main visual taking 100% of the block */}
          <motion.img 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="/assets/projects/abercrombie/abercrombie-logo.png" 
            alt="Abercrombie" 
            className="w-full h-full object-cover relative z-10"
          />
          
          <div className="absolute top-6 left-6 md:top-8 md:left-8 flex justify-between items-baseline w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] pointer-events-none text-charcoal/50 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest z-20">
            <span>CASE STUDY // BRAND REBRANDING</span>
            <span className="font-bold">ID: {proj.id}</span>
          </div>
          
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex justify-between items-baseline w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] pointer-events-none text-charcoal/50 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest z-20">
            <span>{proj.visual.label}</span>
            <span>{proj.year}</span>
          </div>
        </div>
      );
    }

    if (proj.slug === 'civic-vote') {
      return (
        <div className="w-full aspect-[16/9] max-h-[620px] min-h-[320px] md:min-h-[460px] relative border-y border-border-light overflow-hidden bg-[#8D4FE7] flex items-center justify-center">
          {/* Main visual taking 100% of the block */}
          <motion.img 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="/assets/projects/civic-vote/civic-vote-hero.png" 
            alt="Civic Vote — Se déplacer pour voter" 
            className="w-full h-full object-cover relative z-10"
          />
          
          {/* Top-right badges leaving the République Française logo in top-left completely uncluttered */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8 pointer-events-none text-white/90 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest z-20 flex items-center gap-3">
            <span className="hidden sm:inline">CASE STUDY // CIVIC CAMPAIGN</span>
            <span className="font-bold bg-white/20 backdrop-blur px-2 py-0.5 rounded">ID: {proj.id}</span>
          </div>
          
          <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 pointer-events-none text-white/90 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest z-20">
            <span>{proj.visual.label} &bull; {proj.year}</span>
          </div>
        </div>
      );
    }

    if (proj.slug === 'okane') {
      return (
        <div className="w-full aspect-[16/9] max-h-[620px] min-h-[320px] md:min-h-[460px] relative border-y border-border-light overflow-hidden bg-[#5DB075] flex items-center justify-center">
          {/* Main visual taking 100% of the block */}
          <motion.img 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="/assets/projects/okane/okane-logo.png" 
            alt="Okane Logo" 
            className="w-full h-full object-cover relative z-10"
          />
          
          <div className="absolute top-6 left-6 md:top-8 md:left-8 flex justify-between items-baseline w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] pointer-events-none text-white/80 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest z-20">
            <span>CASE STUDY // PRODUCT DESIGN</span>
            <span className="font-bold bg-white/20 backdrop-blur px-2 py-0.5 rounded text-white">ID: {proj.id}</span>
          </div>
          
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex justify-between items-baseline w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] pointer-events-none text-white/80 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest z-20">
            <span>{proj.visual.label}</span>
            <span>{proj.year}</span>
          </div>
        </div>
      );
    }

    const { bgColor, type, label } = proj.visual;
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

        <div className="font-syne font-black text-6xl sm:text-8xl md:text-[10vw] text-center select-none z-10 tracking-tighter uppercase leading-none" style={{ color: type.includes('light') || type === 'editorial-block' ? '#111111' : '#EEB8F9' }}>
          {proj.slug.replace('-', ' ')}
        </div>

        <div className="flex justify-between items-baseline z-10 font-mono text-[10px] uppercase tracking-widest opacity-60">
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
      <div className="space-y-10">
        <div>
          <h3 className="font-syne font-bold text-xs uppercase tracking-wider text-charcoal-muted mb-2">
            / {data.title}
          </h3>
          <p className="text-xs text-charcoal-muted leading-relaxed font-light max-w-2xl">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Board 1 */}
          <div className="border border-border-light rounded-lg overflow-hidden bg-bg-light shadow-sm flex flex-col">
            <div className="p-4 bg-charcoal/5 border-b border-border-light flex justify-between items-center">
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted font-bold">
                {data.board1Title}
              </span>
              <span className="font-mono text-[9px] text-violet font-bold uppercase tracking-widest">
                SPEC // A
              </span>
            </div>
            <div className={`p-8 ${data.board1Theme} flex-1 flex flex-col justify-between min-h-[340px]`}>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {data.pills1.map((pill, i) => (
                    <span key={i} className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-current/20 opacity-80">
                      {pill}
                    </span>
                  ))}
                </div>
                <div className="pt-6 font-syne font-black text-2xl uppercase tracking-tight opacity-90">
                  {proj.title}
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
          <div className="border border-border-light rounded-lg overflow-hidden bg-bg-light shadow-sm flex flex-col">
            <div className="p-4 bg-charcoal/5 border-b border-border-light flex justify-between items-center">
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted font-bold">
                {data.board2Title}
              </span>
              <span className="font-mono text-[9px] text-violet font-bold uppercase tracking-widest">
                SPEC // B
              </span>
            </div>
            <div className={`p-8 ${data.board2Theme} flex-1 flex flex-col justify-between min-h-[340px]`}>
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

              <div className="p-4 rounded border border-current/15 bg-current/[0.03] mt-6">
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

  return (
    <>
      <SEO
        title={seoData.title}
        description={seoData.description}
        canonical={`https://www.hassenarkab.com/work/${project.slug}`}
        schema={creativeWorkSchema}
      />
      <PageTransition />
      
      <div className="min-h-screen bg-bg-light pt-28 pb-16">
        
        {/* Return Button Block */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
          <Link
            to="/work"
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
            <h1 
              className="font-syne font-black text-charcoal-light uppercase tracking-tight"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 4.4rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.035em',
                maxWidth: '1100px'
              }}
            >
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
                <h2 className="font-syne font-bold text-xs uppercase tracking-wider text-charcoal-muted mb-3">
                  / {t.projectPage.context}
                </h2>
                <p className="text-sm md:text-base text-charcoal leading-relaxed font-light">
                  {pContent.context}
                </p>
              </div>

              {/* Challenge Block */}
              <div>
                <h2 className="font-syne font-bold text-xs uppercase tracking-wider text-charcoal-muted mb-3">
                  / {t.projectPage.challenge}
                </h2>
                <p className="text-sm md:text-base text-charcoal leading-relaxed font-light">
                  {pContent.challenge}
                </p>
              </div>

              {/* Goals Block */}
              <div>
                <h2 className="font-syne font-bold text-xs uppercase tracking-wider text-charcoal-muted mb-3">
                  / {t.projectPage.goals}
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm text-charcoal font-light">
                  {pContent.goals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>

              {/* Process Block */}
              <div>
                <h2 className="font-syne font-bold text-xs uppercase tracking-wider text-charcoal-muted mb-3">
                  / {t.projectPage.process}
                </h2>
                <p className="text-sm md:text-base text-charcoal-muted leading-relaxed font-light">
                  {pContent.process}
                </p>
              </div>

              {/* Solution Block */}
              <div>
                <h2 className="font-syne font-bold text-xs uppercase tracking-wider text-charcoal-muted mb-3">
                  / {t.projectPage.solution}
                </h2>
                <p className="text-sm md:text-base text-charcoal leading-relaxed font-light">
                  {pContent.solution}
                </p>
              </div>

              {/* Outcome Block */}
              <div>
                <h2 className="font-syne font-bold text-xs uppercase tracking-wider text-charcoal-muted mb-3">
                  / {t.projectPage.outcome}
                </h2>
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
              {/* Section Parcours complets & Pages Intranet */}
              <div className="space-y-8">
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
            </div>
          ) : project.slug === 'abercrombie' ? (
            <div className="space-y-16">
              {/* Section Parcours complets & Visuels de Rebranding */}
              <div className="space-y-8">
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
                        alt="Direction artistique photo Beat Generation pour Abercrombie" 
                        loading="lazy"
                        decoding="async"
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
                        alt="Cartes de visite typographiques et minimalistes pour Abercrombie" 
                        loading="lazy"
                        decoding="async"
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
                        alt="Affichage urbain grand format pour le rebranding d’Abercrombie" 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto max-h-[600px] object-contain shadow-md rounded"
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ) : project.slug === 'civic-vote' ? (
            <div className="space-y-16">
              {/* Section Campagne & Illustrations */}
              <div className="space-y-8">
                <div>
                  <h3 className="font-syne font-bold text-xs uppercase tracking-wider text-charcoal-muted mb-2">
                    / {language === 'fr' ? 'Campagne & Déclinaisons Illustrées' : 'Campaign & Illustrated Variations'}
                  </h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed font-light max-w-2xl">
                    {language === 'fr' 
                      ? 'Découvrez les déclinaisons graphiques de la campagne citoyenne. Des illustrations vivantes, pop et engageantes conçues pour mobiliser les jeunes électeurs autour du geste démocratique.'
                      : 'Explore the graphic variations of the civic campaign. Vibrant, bold, and engaging illustrations designed to mobilize young voters around civic participation.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                  {/* Visual 1: Allons Voter */}
                  <div className="border border-border-light rounded-lg overflow-hidden bg-bg-light shadow-sm flex flex-col">
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
                  <div className="border border-border-light rounded-lg overflow-hidden bg-bg-light shadow-sm flex flex-col">
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
            </div>
          ) : project.slug === 'okane' ? (
            <div className="space-y-16">
              {/* Section Interfaces & Expérience Mobile */}
              <div className="space-y-8">
                <div>
                  <h3 className="font-syne font-bold text-xs uppercase tracking-wider text-charcoal-muted mb-2">
                    / {language === 'fr' ? 'Interfaces & Expérience Mobile' : 'Mobile Experience & Interfaces'}
                  </h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed font-light max-w-2xl">
                    {language === 'fr' 
                      ? 'Découvrez les maquettes de l’application Okane. Une expérience conçue pour simplifier le suivi budgétaire au quotidien grâce à des jauges visuelles claires, un système de catégorisation intuitif et un ton bienveillant.'
                      : 'Explore the Okane application mockups. An experience designed to simplify daily budget tracking through clear visual gauges, an intuitive categorization system, and an approachable tone.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                  {/* Visual 1: Mockup Trio Overview */}
                  <div className="border border-border-light rounded-lg overflow-hidden bg-bg-light shadow-sm flex flex-col">
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
                  <div className="border border-border-light rounded-lg overflow-hidden bg-bg-light shadow-sm flex flex-col">
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
            </div>
          ) : (
            renderEditorialShowcase(project)
          )}
        </div>

        {/* Prev / Next project navigation links */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-10 border-t border-border-light">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <Link
              to={prevProject.link}
              className="group flex flex-col items-center sm:items-start text-center sm:text-left gap-1 cursor-none interactive-hover"
            >
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted flex items-center gap-1.5">
                <ArrowLeft size={10} />
                {t.projectPage.prevProject}
              </span>
              <span className="font-syne font-bold text-base sm:text-lg text-charcoal group-hover:text-violet transition-colors duration-300 uppercase">
                {prevProject.slug.replace('-', ' ')}
              </span>
            </Link>

            {/* Back to work centered button */}
            <Link
              to="/work"
              className="px-6 py-2.5 rounded-full border border-charcoal/20 hover:border-violet hover:bg-violet hover:text-charcoal font-mono text-xs uppercase font-bold tracking-widest transition-all duration-300 cursor-none interactive-hover my-2 sm:my-0"
            >
              {t.projectPage.backBtn}
            </Link>

            <Link
              to={nextProject.link}
              className="group flex flex-col items-center sm:items-end text-center sm:text-right gap-1 cursor-none interactive-hover"
            >
              <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted flex items-center gap-1.5">
                {t.projectPage.nextProject}
                <ArrowRight size={10} />
              </span>
              <span className="font-syne font-bold text-base sm:text-lg text-charcoal group-hover:text-violet transition-colors duration-300 uppercase">
                {nextProject.slug.replace('-', ' ')}
              </span>
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
