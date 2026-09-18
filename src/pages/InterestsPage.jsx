import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { interestsMeta, categoriesMap, interestsData } from '../data/interestsData';
import PageTransition from '../components/PageTransition';
import CurrentMood from '../components/interests/CurrentMood';
import InterestFilters from '../components/interests/InterestFilters';
import InterestCard from '../components/interests/InterestCard';
import InterestDrawer from '../components/interests/InterestDrawer';

export default function InterestsPage() {
  const { language } = useLanguage();
  const meta = interestsMeta[language] || interestsMeta.en;

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  // Scroll to top upon navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Compute item counts per category
  const categoryCounts = useMemo(() => {
    const counts = { all: interestsData.length };
    categoriesMap.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = interestsData.filter((item) => item.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return interestsData;
    return interestsData.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <PageTransition />
      <div className="min-h-screen bg-bg-light pt-28 pb-24 overflow-x-hidden">
        
        {/* Container */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section A: Hero Éditorial */}
          <header className="mb-14 border-b border-border-light pb-10">
            {/* Top Label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <Sparkles size={13} className="text-violet" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-violet font-bold">
                {meta.tag}
              </span>
            </motion.div>

            {/* Big Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black text-display-lg leading-none uppercase text-charcoal-light tracking-tighter mb-6"
            >
              {meta.title}
            </motion.h1>

            {/* Intro text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline"
            >
              <p className="lg:col-span-7 font-syne font-bold text-lg md:text-xl text-charcoal leading-snug">
                {meta.subtitle}
              </p>
              <p className="lg:col-span-5 font-inter text-xs md:text-sm text-charcoal-muted font-light leading-relaxed">
                {meta.intro}
              </p>
            </motion.div>
          </header>

          {/* Section B: Current Mood Section */}
          <CurrentMood meta={meta} />

          {/* Section C: Category Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <InterestFilters
              categories={categoriesMap}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              counts={categoryCounts}
              language={language}
            />
          </div>

          {/* Section D: Asymmetric Bento Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <InterestCard
                  key={item.id}
                  item={item}
                  meta={meta}
                  language={language}
                  onOpenDrawer={(card) => setSelectedItem(card)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State Fallback if no item found */}
          {filteredItems.length === 0 && (
            <div className="py-20 text-center border border-dashed border-border-light rounded-xl">
              <Compass className="mx-auto text-charcoal-muted mb-3" size={32} />
              <p className="font-syne font-bold text-base text-charcoal">
                {language === 'fr' ? 'Aucun centre d’intérêt trouvé.' : 'No interests found.'}
              </p>
            </div>
          )}

        </div>

        {/* Side Drawer for Extended Notes */}
        <AnimatePresence>
          {selectedItem && (
            <InterestDrawer
              item={selectedItem}
              meta={meta}
              language={language}
              onClose={() => setSelectedItem(null)}
            />
          )}
        </AnimatePresence>

      </div>
    </>
  );
}
