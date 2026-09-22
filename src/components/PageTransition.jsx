import React from 'react';
import { motion } from 'framer-motion';

/**
 * PageTransition:
 * A subtle, non-blocking 2px accent indicator that sweeps across the top of the viewport
 * on mount, completely eliminating full-screen violet curtains or disruptive blocking flashes.
 */
export default function PageTransition() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0.8 }}
      animate={{ scaleX: 1, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ originX: 0 }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-violet z-[9998] pointer-events-none"
    />
  );
}
