import React from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import SectionTitle from './SectionTitle';

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

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language];

  const socialLinks = [
    {
      name: t.contactSection.emailMe,
      icon: <Mail size={16} />,
      href: 'mailto:hassen.arkab@gmail.com',
      accent: 'bg-violet text-charcoal hover:bg-violet-hover border border-charcoal/10',
      primary: true
    },
    {
      name: t.contactSection.linkedin,
      icon: <Linkedin size={16} />,
      href: 'https://linkedin.com',
      accent: 'border border-charcoal hover:bg-charcoal hover:text-bg-light'
    },
    {
      name: t.contactSection.downloadCv,
      icon: <FileText size={16} />,
      href: '#',
      accent: 'border border-charcoal/20 hover:border-charcoal hover:bg-charcoal/5'
    }
  ];

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 md:px-12 py-12 pb-24">
      {/* Title */}
      <SectionTitle number={t.contactSection.number} title={t.contactSection.title} id="contact-section" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 lg:mt-16 items-center">
        {/* Giant header typography section */}
        <div className="lg:col-span-8 space-y-6">
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-syne font-black leading-[1.05] text-charcoal-light uppercase select-none"
          >
            {t.contactSection.heading.split(', ').map((part, i) => (
              <span key={i} className="block">
                {part}{i < t.contactSection.heading.split(', ').length - 1 ? ',' : ''}
              </span>
            ))}
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-charcoal-muted leading-relaxed max-w-xl font-light"
          >
            {t.contactSection.subheading}
          </motion.p>
        </div>

        {/* Action Buttons list */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-4 flex flex-col gap-4 w-full"
        >
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className={`group flex items-center justify-between px-6 py-4 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 cursor-none interactive-hover ${
                link.primary 
                  ? 'bg-charcoal text-bg-light hover:bg-violet hover:text-charcoal' 
                  : link.accent
              }`}
            >
              <span className="flex items-center gap-3">
                {link.icon}
                {link.name}
              </span>
              <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Footer details */}
      <div className="mt-20 border-t border-border-light pt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted block mb-1">
            {t.contactSection.statusLabel}
          </span>
          <span className="text-xs md:text-sm font-bold text-charcoal flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            {t.contactSection.statusVal}
          </span>
        </div>

        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-muted block mb-1">
            {t.contactSection.directEmail}
          </span>
          <a 
            href="mailto:hassen.arkab@gmail.com" 
            className="text-xs md:text-sm font-mono font-bold text-charcoal hover:text-violet transition-colors duration-300 border-b border-charcoal/20 hover:border-violet cursor-none interactive-hover"
          >
            hassen.arkab@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
