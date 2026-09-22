import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import { PageTransitionProvider } from './context/PageTransitionContext';
import PageCurtainTransition from './components/PageCurtainTransition';
import Loader from './components/Loader';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { 
  lazyWithPreload, 
  registerRoutePreloader, 
  preloadCriticalImages 
} from './utils/preload';

// Code-split pages with built-in preload methods
export const HomePage = lazyWithPreload(() => import('./pages/HomePage'));
export const WorkPage = lazyWithPreload(() => import('./pages/WorkPage'));
export const ProjectPage = lazyWithPreload(() => import('./pages/ProjectPage'));
export const PlaygroundPage = lazyWithPreload(() => import('./pages/PlaygroundPage'));
export const InterestsPage = lazyWithPreload(() => import('./pages/InterestsPage'));
export const AboutPage = lazyWithPreload(() => import('./pages/AboutPage'));
export const ContactPage = lazyWithPreload(() => import('./pages/ContactPage'));
export const NotFoundPage = lazyWithPreload(() => import('./pages/NotFoundPage'));

// Heavy Three.js 3D visualizer chunk remains strictly lazy-loaded on demand
const MusicVisualizerPage = lazy(() => import('./pages/MusicVisualizerPage'));

// Register preloaders for instantaneous navigation on hover/focus
registerRoutePreloader('/', HomePage.preload);
registerRoutePreloader('/work', WorkPage.preload);
registerRoutePreloader('/work/:slug', ProjectPage.preload);
registerRoutePreloader('/playground', PlaygroundPage.preload);
registerRoutePreloader('/interests', InterestsPage.preload);
registerRoutePreloader('/about', AboutPage.preload);
registerRoutePreloader('/contact', ContactPage.preload);
registerRoutePreloader('/not-found', NotFoundPage.preload);

// Non-disruptive, elegant 2px top-line loading bar (never displaces or hides the page layout)
function RouteLoader() {
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] bg-violet/30 z-[9999] overflow-hidden pointer-events-none">
      <div className="h-full bg-violet w-1/3 animate-pulse" />
    </div>
  );
}

// Inner component to track location pathname for route transitions
function AnimatedRoutes() {
  const location = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Suspense fallback={<RouteLoader />}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-full"
      >
          <Routes location={location}>
            {/* Main Portfolio Route */}
            <Route path="/" element={<HomePage />} />

            {/* Work / Projects Hub */}
            <Route path="/work" element={<WorkPage />} />

            {/* Dynamic Project Details Route */}
            <Route path="/work/:slug" element={<ProjectPage />} />
            
            {/* Playground Route */}
            <Route path="/playground" element={<PlaygroundPage />} />

            {/* Fullscreen Music Visualizer Route (Lazy 3D) */}
            <Route path="/playground/musix-visualizer" element={<MusicVisualizerPage />} />

            {/* Interests Radar Route */}
            <Route path="/interests" element={<InterestsPage />} />

            {/* Dedicated About Route */}
            <Route path="/about" element={<AboutPage />} />

            {/* Dedicated Contact Route */}
            <Route path="/contact" element={<ContactPage />} />

            {/* Explicit 404 Route */}
            <Route path="/not-found" element={<NotFoundPage />} />

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </motion.div>
    </Suspense>
  );
}

export default function App() {
  // Preload primary route chunks and critical hero images in the background after initial render
  useEffect(() => {
    const runBackgroundPreload = () => {
      WorkPage.preload?.();
      ProjectPage.preload?.();
      AboutPage.preload?.();
      ContactPage.preload?.();
      InterestsPage.preload?.();
      PlaygroundPage.preload?.();
      preloadCriticalImages();
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(runBackgroundPreload, { timeout: 2500 });
      return () => window.cancelIdleCallback?.(handle);
    } else {
      const timer = setTimeout(runBackgroundPreload, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <PageTransitionProvider>
          <div className="relative min-h-screen bg-bg-light select-none">
            {/* Custom magnetic circle cursor trail */}
            <CustomCursor />

            {/* Intro loader curtain - runs only once on initial session visit */}
            <Loader />

            {/* Signature violet curtain transition for page-to-page navigation */}
            <PageCurtainTransition />

            {/* Fixed header bar */}
            <Header />

            {/* Dynamic route contents */}
            <main className="relative z-10">
              <AnimatedRoutes />
            </main>

            {/* Persistent page footer */}
            <Footer />
          </div>
        </PageTransitionProvider>
      </Router>
    </LanguageProvider>
  );
}
