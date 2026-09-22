import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Grid } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  const { language } = useLanguage();

  const isFr = language === 'fr';

  return (
    <>
      <SEO
        title="Page not found — Hassen Arkab"
        description="La page demandée n’existe pas ou a été déplacée."
        canonical="https://www.hassenarkab.com/not-found"
        noindex={true}
      />

      <div className="min-h-[85vh] flex items-center justify-center px-6 md:px-12 py-24">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet/30 bg-violet/5 font-mono text-[10px] uppercase tracking-widest text-violet font-bold">
            <span>/ 404 ERROR</span>
          </div>

          {/* Glitch / Giant numbers */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative select-none"
          >
            <span className="font-display font-black text-7xl sm:text-9xl md:text-[11rem] leading-none text-charcoal/10 tracking-tighter block">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="font-syne font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-charcoal-light">
                {isFr ? 'Page introuvable' : 'Page not found'}
              </h1>
            </div>
          </motion.div>

          {/* Description */}
          <p className="text-sm md:text-base text-charcoal-muted font-light max-w-md mx-auto leading-relaxed">
            {isFr 
              ? 'La page demandée n’existe pas ou a été déplacée.' 
              : 'The page you are looking for does not exist or has been moved.'}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-charcoal text-bg-light hover:bg-violet hover:text-charcoal font-mono text-xs uppercase font-bold tracking-widest transition-all duration-300 rounded cursor-none interactive-hover shadow-sm"
            >
              <ArrowLeft size={14} />
              {isFr ? 'Retour à l’accueil' : 'Back home'}
            </Link>

            <Link
              to="/work"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-charcoal/20 hover:border-charcoal text-charcoal font-mono text-xs uppercase font-bold tracking-widest transition-all duration-300 rounded cursor-none interactive-hover"
            >
              <Grid size={14} />
              {isFr ? 'Voir les projets' : 'View projects'}
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
