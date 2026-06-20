import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import LanguageSwitch from './LanguageSwitch';
import Logo from './Logo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { language } = useLanguage();
  const location = useLocation();
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  const navLinks = [
    { name: t.nav.work, href: isHome ? '#work' : '/#work' },
    { name: t.nav.about, href: isHome ? '#about' : '/#about' },
    { name: t.nav.contact, href: isHome ? '#contact' : '/#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 border-b ${
          isScrolled
            ? 'bg-bg-light/90 backdrop-blur-md py-4 border-charcoal/10'
            : 'bg-transparent py-6 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            to="/"
            className="group flex items-center text-charcoal hover:text-violet transition-colors duration-300"
            aria-label="Homepage"
          >
            <Logo height={28} showText={false} className="transition-transform duration-300 group-hover:scale-105" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group relative text-xs font-mono font-bold tracking-widest uppercase text-charcoal-muted hover:text-charcoal transition-colors duration-300 py-1"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
                    <span className="text-violet opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">/</span>
                    {link.name}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-violet group-hover:w-full transition-all duration-300 ease-out" />
                </a>
              ))}
            </nav>

            {/* Language Selection Toggle */}
            <LanguageSwitch />
          </div>

          {/* Hamburger Menu - Mobile */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageSwitch />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal hover:text-violet transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-0 pt-24 pb-12 bg-bg-light border-b border-charcoal/10 shadow-lg z-30 md:hidden"
          >
            <div className="flex flex-col items-center gap-6 px-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-syne font-bold uppercase tracking-wider text-charcoal hover:text-violet transition-colors duration-300 flex items-center"
                >
                  <span className="text-violet mr-2">/</span>
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
