import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';

// Custom inline LinkedIn SVG icon due to package version constraints
const Linkedin = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Custom inline GitHub SVG icon due to package version constraints
const Github = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  const socialLinks = [
    { name: 'LinkedIn', icon: <Linkedin size={14} />, href: 'https://linkedin.com' },
    { name: 'GitHub', icon: <Github size={14} />, href: 'https://github.com' },
    { name: 'Email', icon: <Mail size={14} />, href: 'mailto:hassen.arkab@gmail.com' },
  ];

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="border-t border-border-light bg-bg-light pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top block metadata */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 border-b border-charcoal/5 pb-12">
          
          {/* Left Side: Copyright */}
          <div className="flex flex-col gap-1">
            <span className="font-syne font-black text-sm text-charcoal uppercase select-none">
              Hassen Arkab
            </span>
            <span className="text-[10px] text-charcoal-muted font-mono tracking-wider uppercase">
              {t.footer.copyright} &bull; Paris, FR
            </span>
          </div>

          {/* Center: Editorial Motto */}
          <div className="font-serif italic text-charcoal-muted text-sm md:text-base font-light">
            “{t.footer.tagline}”
          </div>

          {/* Right Side: Social and Back to top */}
          <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8">
            <nav className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold tracking-widest text-charcoal-muted hover:text-violet transition-colors duration-300 cursor-none interactive-hover"
                >
                  {link.icon}
                  {link.name}
                </a>
              ))}
            </nav>

            <a
              href="#"
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-[10px] font-mono uppercase font-bold tracking-widest text-charcoal hover:text-violet transition-colors duration-300 cursor-none interactive-hover"
            >
              {t.footer.backToTop}
              <span className="h-7 w-7 rounded-full border border-charcoal/10 flex items-center justify-center group-hover:border-violet group-hover:bg-violet group-hover:text-charcoal transition-all duration-300">
                <ArrowUp size={12} className="transform group-hover:-translate-y-0.5 transition-transform duration-300" />
              </span>
            </a>
          </div>
        </div>

        {/* Giant Typographic Poster Banner */}
        <div className="w-full flex justify-center py-4 select-none pointer-events-none">
          <h2 className="font-syne font-black text-[12vw] leading-none text-charcoal/[0.04] tracking-tighter text-center uppercase whitespace-nowrap">
            EVERYTHING STARTS WITH A LINE
          </h2>
        </div>

      </div>
    </footer>
  );
}
