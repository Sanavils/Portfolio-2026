import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

export default function Loader() {
  const [isVisible, setIsVisible] = useState(() => {
    try {
      return !sessionStorage.getItem('hasSeenLoader');
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!isVisible) return;
    // Snappy duration: 1.1 seconds for responsive, non-blocking entrance
    const timer = setTimeout(() => {
      setIsVisible(false);
      try {
        sessionStorage.setItem('hasSeenLoader', 'true');
      } catch {
        // Ignore storage restrictions if cookies/storage are disabled
      }
    }, 1100);
    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ 
            clipPath: 'inset(0% 0% 100% 0%)',
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 bg-[#08080A] text-bg-light z-[9999] flex flex-col items-center justify-center pointer-events-none select-none px-6"
        >
          {/* Main Brand Assembly - Guaranteed spacing & responsiveness */}
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
            
            {/* Monogram Monolith */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-violet flex items-center justify-center"
            >
              <Logo height={52} showText={false} />
            </motion.div>

            {/* Subtle Divider (hidden on mobile, visible on sm+) */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 0.2 }}
              transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
              className="hidden sm:block w-[1px] h-10 bg-violet"
            />

            {/* Horizontal rule on mobile */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.2 }}
              transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
              className="sm:hidden w-12 h-[1px] bg-violet my-1"
            />

            {/* Typographic Name Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15, ease: 'easeOut' }}
              className="flex flex-col items-center sm:items-start"
            >
              <span className="font-syne font-black text-sm sm:text-base uppercase tracking-widest text-violet">
                HASSEN ARKAB
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-violet/60 mt-1">
                UX/UI DESIGNER &bull; PARIS
              </span>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
