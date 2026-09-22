import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

/**
 * IntroLoader:
 * Two-stage cinematic intro for the initial site visit:
 *
 * Stage 1: Deep black canvas (#08080A) with centered HA monogram,
 *          studio typography, and 0% -> 100% #EEB8F9 progress bar.
 *
 * Stage 2: Handover to the signature violet (#EEB8F9) curtain.
 *          The curtain rises from the bottom to cover the black loader completely.
 *          Only once the screen is 100% violet does the black canvas unmount.
 *
 * Stage 3: The violet curtain slides down, unveiling the Home page seamlessly.
 *
 * Runs once per session via sessionStorage ('hasSeenIntroLoader').
 * Fully respects prefers-reduced-motion.
 */
export default function Loader() {
  const [phase, setPhase] = useState(() => {
    try {
      if (sessionStorage.getItem('hasSeenIntroLoader') === 'true') {
        return 'complete';
      }
    } catch {
      // Ignore storage restrictions
    }
    return 'black-loading';
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (phase === 'complete') return;

    const isReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reduced motion: snappy 500ms progress + fade
    if (isReducedMotion) {
      const timer = setTimeout(() => {
        try {
          sessionStorage.setItem('hasSeenIntroLoader', 'true');
        } catch {
          // Ignore
        }
        setPhase('complete');
      }, 600);
      return () => clearTimeout(timer);
    }

    // Normal motion: ~1.8s progress bar fill
    const totalDuration = 1800; // ms
    const startTime = performance.now();
    let animFrame;

    const tick = (currentTime) => {
      const elapsed = currentTime - startTime;
      const ratio = Math.min(1, elapsed / totalDuration);
      
      // Easing curve with gentle ease-out near the end
      const currentVal = Math.min(100, Math.round(ratio * 100));
      setProgress(currentVal);

      if (ratio < 1) {
        animFrame = requestAnimationFrame(tick);
      } else {
        // Guarantee 100% reached
        setProgress(100);

        // Step 2: Trigger violet curtain rise to cover the black screen
        setTimeout(() => {
          setPhase('curtain-rising');

          // Step 3: When curtain covers the screen (at ~650ms), switch to revealing
          setTimeout(() => {
            try {
              sessionStorage.setItem('hasSeenIntroLoader', 'true');
            } catch {
              // Ignore
            }
            setPhase('curtain-revealing');

            // Step 4: When reveal finishes (at ~750ms), unmount completely
            setTimeout(() => {
              setPhase('complete');
            }, 750);
          }, 650);
        }, 120);
      }
    };

    animFrame = requestAnimationFrame(tick);

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [phase]);

  if (phase === 'complete') return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden">
      {/* ──────────────────────────────────────────────────────────── */}
      {/* LAYER A: BLACK CANVAS (z-[9998])                             */}
      {/* Kept mounted and 100% opaque while violet curtain rises over */}
      {/* ──────────────────────────────────────────────────────────── */}
      {(phase === 'black-loading' || phase === 'curtain-rising') && (
        <motion.div
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="absolute inset-0 bg-[#08080A] flex flex-col items-center justify-center px-6 z-[9998]"
        >
          <div className="flex flex-col items-center max-w-sm w-full">
            {/* Monogram and Typographic Reveal */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-5 sm:gap-7"
            >
              <div className="text-violet flex items-center justify-center">
                <Logo height={56} showText={false} />
              </div>
              <div className="hidden sm:block w-[1px] h-10 bg-violet/20" />
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <span className="font-syne font-black text-sm sm:text-base uppercase tracking-widest text-violet">
                  HASSEN ARKAB
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-violet/60 mt-1">
                  UX/UI DESIGNER &bull; PARIS
                </span>
              </div>
            </motion.div>

            {/* Minimal Progress Bar Block */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
              className="w-full mt-12 space-y-3"
            >
              <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-violet/70 uppercase">
                <span>EVERYTHING STARTS WITH A LINE</span>
                <span className="font-bold text-violet">{progress}%</span>
              </div>
              
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-violet rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(238,184,249,0.4)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* LAYER B: VIOLET CURTAIN (z-[9999])                           */}
      {/* Rises over the black loader, covers, then descends to reveal */}
      {/* ──────────────────────────────────────────────────────────── */}
      {(phase === 'curtain-rising' || phase === 'curtain-revealing') && (
        <motion.div
          key="intro-violet-curtain"
          initial={{ y: '100%' }}
          animate={{ y: phase === 'curtain-rising' ? '0%' : '100%' }}
          transition={{
            duration: phase === 'curtain-rising' ? 0.65 : 0.75,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="absolute inset-0 bg-violet border-t-2 border-charcoal/20 flex items-center justify-center z-[9999]"
        >
          <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-widest text-charcoal/60 select-none">
            <span className="font-syne font-black text-charcoal text-xs">HA</span>
            <span className="text-charcoal/30">/</span>
            <span className="font-bold">2026</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
