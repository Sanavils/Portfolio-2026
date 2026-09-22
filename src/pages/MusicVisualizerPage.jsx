import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import MusicPlayer from '../components/playground/MusixVisualizer/MusicPlayer';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

export default function MusicVisualizerPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <>
      <SEO
        title="MUSIX Visualizer — Hassen Arkab"
        description="Expérience musicale interactive en Three.js et Web Audio API, avec player audio et visualizer 3D réactif au son."
        canonical="https://www.hassenarkab.com/playground/musix-visualizer"
      />
      <PageTransition />
      <div className="w-screen h-screen bg-[#050507] overflow-hidden select-none">
        <MusicPlayer 
          lang={language}
          isFullScreen={true}
          onBack={() => navigate('/playground')}
        />
      </div>
    </>
  );
}
