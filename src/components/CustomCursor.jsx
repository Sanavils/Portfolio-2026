import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function CustomCursor() {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isMobile, setIsMobile] = useState(true);

  // Motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Physics spring config
  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024;
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return () => window.removeEventListener('resize', checkDevice);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      
      // Check if hovering over project card
      const projectCard = target.closest('.project-card');
      if (projectCard) {
        setIsHovered(true);
        setCursorText(language === 'fr' ? 'VOIR' : 'VIEW');
        return;
      }

      // Check standard interactive elements
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.interactive-hover') ||
        target.getAttribute('role') === 'button';
        
      setIsHovered(!!isInteractive);
      setCursorText('');
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    // Apply CSS helper class to body to hide default pointer
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isMobile, language]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer tracking capsule or ring */}
      <motion.div
        className="fixed top-0 left-0 border border-violet rounded-full pointer-events-none z-50 mix-blend-difference flex items-center justify-center font-mono text-[9px] font-bold text-charcoal bg-violet"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorText ? 60 : 40,
          height: cursorText ? 60 : 40,
        }}
        animate={{
          scale: isHovered ? 1.2 : 1,
          backgroundColor: cursorText ? '#EEB8F9' : 'rgba(238, 184, 249, 0)',
          borderColor: '#EEB8F9',
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-charcoal select-none uppercase tracking-wider"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner precise dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-violet rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}
