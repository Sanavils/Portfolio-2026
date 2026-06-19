import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center border border-charcoal/10 rounded-full p-0.5 bg-charcoal/5 font-mono text-xs select-none">
      <button
        onClick={() => setLanguage('fr')}
        className={`px-3 py-1 rounded-full transition-all duration-300 font-bold uppercase ${
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
        className={`px-3 py-1 rounded-full transition-all duration-300 font-bold uppercase ${
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
