import Contact from '../components/Contact';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact — Hassen Arkab"
        description="Contactez Hassen Arkab pour une collaboration UX/UI, un projet digital, une mission freelance ou une opportunité design."
        canonical="https://www.hassenarkab.com/contact"
      />
      <PageTransition />
      <div className="pt-24 pb-16">
        <Contact />
      </div>
    </>
  );
}
