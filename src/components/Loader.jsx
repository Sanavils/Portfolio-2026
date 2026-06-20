import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Exits after 1.2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1200);
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
          className="fixed inset-0 bg-[#0a0a0a] text-bg-light z-[9999] flex items-center justify-center pointer-events-none"
        >
          <div className="flex flex-col items-center">
            {/* Real SVG Logo with fade-in and scale animation */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-violet"
            >
              <Logo height={120} showText={true} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

