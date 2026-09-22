import About from '../components/About';
import Process from '../components/Process';
import CreativeStack from '../components/CreativeStack';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About — Hassen Arkab UX/UI Designer"
        description="À propos de Hassen Arkab, UX/UI Designer basé à Paris, spécialisé en interfaces digitales, branding, design systems et expériences interactives."
        canonical="https://www.hassenarkab.com/about"
      />
      <PageTransition />
      <div className="pt-24 pb-16 space-y-12">
        <About />
        <Process />
        <CreativeStack />
      </div>
    </>
  );
}
