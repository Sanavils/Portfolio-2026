import Hero from '../components/Hero';
import ProjectGrid from '../components/ProjectGrid';
import About from '../components/About';
import Process from '../components/Process';
import CreativeStack from '../components/CreativeStack';
import Contact from '../components/Contact';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';

export default function HomePage() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: 'https://www.hassenarkab.com/',
    name: 'Hassen Arkab — UX/UI Designer',
    mainEntity: {
      '@type': 'Person',
      name: 'Hassen Arkab',
      jobTitle: 'UX/UI Designer',
      url: 'https://www.hassenarkab.com/',
      image: 'https://www.hassenarkab.com/og-image.jpg',
      description:
        'UX/UI Designer basé à Paris, spécialisé dans la conception d’interfaces digitales, de systèmes visuels et d’expériences interactives.',
      sameAs: [
        'https://www.linkedin.com/in/hassen-arkab',
        'https://github.com/Sanavils?tab=repositories',
      ],
      knowsAbout: [
        'UX Design',
        'UI Design',
        'Product Design',
        'Branding',
        'Design Systems',
        'Interactive Design',
        'Creative Coding',
      ],
    },
  };

  return (
    <>
      <SEO
        title="Hassen Arkab — UX/UI Designer Portfolio"
        description="Portfolio de Hassen Arkab, UX/UI Designer basé à Paris. Interfaces digitales, branding, design systems, expériences interactives et projets créatifs."
        canonical="https://www.hassenarkab.com/"
        schema={personSchema}
      />
      <PageTransition />
      <Hero />
      <ProjectGrid />
      <About />
      <Process />
      <CreativeStack />
      <Contact />
    </>
  );
}
