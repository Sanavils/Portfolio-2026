import React from 'react';
import { motion } from 'framer-motion';

export default function PageTransition() {
  return (
    <motion.div
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      exit={{ scaleY: 1 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      style={{ originY: 1 }} // Scales up/down vertically
      className="fixed inset-0 bg-violet z-[9998] pointer-events-none"
    />
  );
}
