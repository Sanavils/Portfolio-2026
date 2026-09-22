import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import LanguageSwitch from './LanguageSwitch';
import Logo from './Logo';
import PrefetchLink from './PrefetchLink';

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

  const navLinks = [
    { name: t.nav.work, href: '/work', routePath: '/work' },
    { name: t.nav.playground || 'PLAYGROUND', href: '/playground', routePath: '/playground' },
    { name: t.nav.interests || 'INTERESTS', href: '/interests', routePath: '/interests' },
    { name: t.nav.about, href: '/about', routePath: '/about' },
  ];

  const isContactActive = location.pathname === '/contact';

  const checkIsActive = (routePath) => {
    if (routePath === '/') return location.pathname === '/';
    return location.pathname === routePath || location.pathname.startsWith(routePath + '/');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 border-b ${
          isScrolled
            ? 'bg-bg-light/95 backdrop-blur-md py-4 border-charcoal/10 shadow-xs'
            : 'bg-bg-light/80 backdrop-blur-sm py-5 border-charcoal/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brand mark */}
          <PrefetchLink
            to="/"
            className="group flex items-center gap-3 text-charcoal hover:text-violet transition-colors duration-300"
            aria-label="Accueil Hassen Arkab"
          >
            <Logo height={26} showText={false} className="transition-transform duration-300 group-hover:scale-105" />
            <span className="font-syne font-black text-xs sm:text-sm tracking-tight text-charcoal group-hover:text-violet transition-colors duration-300 uppercase select-none">
              Hassen Arkab
            </span>
          </PrefetchLink>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = checkIsActive(link.routePath);
                return (
                  <PrefetchLink
                    key={link.name}
                    to={link.href}
                    className={`group relative text-xs font-mono font-bold tracking-widest uppercase transition-colors duration-300 py-1 ${
                      isActive ? 'text-charcoal font-black' : 'text-charcoal-muted hover:text-charcoal'
                    }`}
                  >
                    <span className="inline-flex items-center transition-transform duration-300 group-hover:-translate-y-0.5">
                      <span className={`text-violet transition-opacity duration-300 mr-1 ${isActive ? 'opacity-100 font-black' : 'opacity-0 group-hover:opacity-100'}`}>/</span>
                      {link.name}
                    </span>
                    <span className={`absolute bottom-0 left-0 h-[1.5px] bg-violet transition-all duration-300 ease-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </PrefetchLink>
                );
              })}

              {/* Discrete Contact CTA */}
              <PrefetchLink
                to="/contact"
                className={`ml-1 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase border transition-all duration-300 ${
                  isContactActive
                    ? 'border-violet bg-violet text-charcoal font-black'
                    : 'border-charcoal/20 text-charcoal hover:border-violet hover:bg-violet hover:text-charcoal'
                }`}
              >
                {t.nav.contact}
              </PrefetchLink>
            </nav>

            {/* Language Selection Toggle */}
            <LanguageSwitch />
          </div>

          {/* Hamburger Menu - Mobile */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitch />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal hover:text-violet transition-colors duration-300 cursor-none interactive-hover"
              aria-label={mobileMenuOpen ? (language === 'fr' ? 'Fermer le menu' : 'Close menu') : (language === 'fr' ? 'Ouvrir le menu' : 'Open menu')}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-0 pt-24 pb-10 bg-bg-light/98 backdrop-blur-xl border-b border-charcoal/10 shadow-xl z-30 md:hidden"
          >
            <div className="flex flex-col items-center gap-6 px-6">
              {navLinks.map((link) => {
                const isActive = checkIsActive(link.routePath);
                return (
                  <PrefetchLink
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-syne font-bold uppercase tracking-wider transition-colors duration-300 flex items-center ${
                      isActive ? 'text-charcoal font-black' : 'text-charcoal-muted hover:text-charcoal'
                    }`}
                  >
                    <span className={`text-violet mr-2 ${isActive ? 'opacity-100 font-black' : 'opacity-40'}`}>/</span>
                    {link.name}
                  </PrefetchLink>
                );
              })}

              <PrefetchLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`mt-2 px-6 py-2.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase border transition-all duration-300 ${
                  isContactActive
                    ? 'border-violet bg-violet text-charcoal'
                    : 'border-charcoal/20 text-charcoal hover:border-violet hover:bg-violet'
                }`}
              >
                {t.nav.contact}
              </PrefetchLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
