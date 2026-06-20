import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Exits after 1.4 seconds for a premium breathing room
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ 
            clipPath: 'inset(0% 0% 100% 0%)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 bg-[#050505] text-bg-light z-[9999] flex items-center justify-center pointer-events-none"
        >
          {/* Flex container separating monogram and text to prevent overlaps and collisions */}
          <div className="flex items-center gap-6 md:gap-8 h-24 select-none">
            
            {/* Monogram Monolith reveal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-violet"
            >
              <Logo height={64} showText={false} />
            </motion.div>

            {/* Vertical hairline divider */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 0.12 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeInOut' }}
              className="w-[1px] h-12 bg-violet"
            />

            {/* Text logo brand reveal with staggered entrance delay */}
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-violet font-black"
              style={{ 
                writingMode: 'vertical-rl', 
                transform: 'rotate(180deg)' 
              }}
            >
              HASSEN ARKAB
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
