import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Default to English, fallback check in localStorage
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('hassen_portfolio_lang');
    return saved === 'fr' || saved === 'en' ? saved : 'en';
  });

  const setLanguage = (lang) => {
    if (lang === 'fr' || lang === 'en') {
      setLanguageState(lang);
      localStorage.setItem('hassen_portfolio_lang', lang);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
