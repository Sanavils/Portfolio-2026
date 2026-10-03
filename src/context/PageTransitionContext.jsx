import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PageTransitionContext = createContext({
  curtainState: 'idle', // 'idle' | 'covering' | 'revealing'
  navigateWithCurtain: () => {},
});

export function PageTransitionProvider({ children }) {
  const [curtainState, setCurtainState] = useState('idle');
  const navigate = useNavigate();
  const location = useLocation();

  const navigateWithCurtain = useCallback((to) => {
    // If navigating to current route, do nothing
    if (!to || to === location.pathname) return;

    const isReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReducedMotion) {
      navigate(to);
      window.scrollTo(0, 0);
      return;
    }

    // Phase 1: Violet curtain rises from bottom to cover the screen
    setCurtainState('covering');

    // Phase 2: When screen is 100% covered, switch route and scroll to top
    const coverTimer = setTimeout(() => {
      navigate(to);
      window.scrollTo(0, 0);

      // Phase 3: Violet curtain descends to reveal new page
      setCurtainState('revealing');

      // Phase 4: Curtain is off-screen, return to idle
      const revealTimer = setTimeout(() => {
        setCurtainState('idle');
      }, 450);

      return () => clearTimeout(revealTimer);
    }, 400);

    return () => clearTimeout(coverTimer);
  }, [navigate, location.pathname]);

  return (
    <PageTransitionContext.Provider value={{ curtainState, navigateWithCurtain }}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  return useContext(PageTransitionContext);
}
