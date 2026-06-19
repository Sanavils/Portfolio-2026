import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Exits after 1.3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1300);
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
          className="fixed inset-0 bg-violet z-[9999] flex items-center justify-center pointer-events-none"
        >
          <div className="flex flex-col items-center">
            {/* Elegant scaling logo Monogram H */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="font-syne font-extrabold text-8xl md:text-[10rem] text-charcoal leading-none tracking-tighter select-none"
            >
              H
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-charcoal/70 mt-6"
            >
              HASSEN ARKAB &bull; UX/UI DESIGNER
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
