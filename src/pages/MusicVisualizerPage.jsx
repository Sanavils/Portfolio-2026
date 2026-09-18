import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import MusicPlayer from '../components/playground/MusixVisualizer/MusicPlayer';
import PageTransition from '../components/PageTransition';

export default function MusicVisualizerPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <>
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
