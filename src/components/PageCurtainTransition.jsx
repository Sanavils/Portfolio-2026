import { motion } from 'framer-motion';
import { usePageTransition } from '../context/PageTransitionContext';

/**
 * PageCurtainTransition:
 * The signature violet (#EEB8F9) curtain that sweeps between internal routes:
 * 1. 'covering': Rises from bottom (translateY 100% -> 0%) over ~380ms
 * 2. 'revealing': Descends to bottom (translateY 0% -> 100%) over ~420ms
 *
 * Always pointer-events-none.
 */
export default function PageCurtainTransition() {
  const { curtainState } = usePageTransition();

  if (curtainState === 'idle') return null;

  return (
    <motion.div
      key="route-violet-curtain"
      initial={{ y: '100%' }}
      animate={{ y: curtainState === 'covering' ? '0%' : '100%' }}
      transition={{
        duration: curtainState === 'covering' ? 0.38 : 0.42,
        ease: [0.76, 0, 0.24, 1],
      }}
      className="fixed inset-0 bg-violet z-[9995] pointer-events-auto flex items-center justify-center border-t-2 border-charcoal/20 select-none"
    >
      <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-widest text-charcoal/60">
        <span className="font-syne font-black text-xs text-charcoal">HA</span>
        <span className="text-charcoal/30">/</span>
        <span className="font-bold">2026</span>
      </div>
    </motion.div>
  );
}
