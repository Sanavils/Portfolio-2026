import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center border border-charcoal/10 rounded-full p-0.5 bg-charcoal/5 font-mono text-xs select-none">
      <button
        onClick={() => setLanguage('fr')}
        aria-label="Passer en français"
        aria-pressed={language === 'fr'}
        className={`px-3 py-1 rounded-full transition-all duration-300 font-bold uppercase cursor-none interactive-hover ${
          language === 'fr'
            ? 'bg-violet text-charcoal shadow-sm'
            : 'text-charcoal/40 hover:text-charcoal'
        }`}
      >
        FR
      </button>
      <span className="text-charcoal/10 px-0.5">/</span>
      <button
        onClick={() => setLanguage('en')}
        aria-label="Switch to English"
        aria-pressed={language === 'en'}
        className={`px-3 py-1 rounded-full transition-all duration-300 font-bold uppercase cursor-none interactive-hover ${
          language === 'en'
            ? 'bg-violet text-charcoal shadow-sm'
            : 'text-charcoal/40 hover:text-charcoal'
        }`}
      >
        EN
      </button>
    </div>
  );
}
