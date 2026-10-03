import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
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
  preloadCriticalImages,
} from './utils/preload';

// Code-split pages with built-in preload methods
export const HomePage = lazyWithPreload(() => import('./pages/HomePage'));
export const WorkPage = lazyWithPreload(() => import('./pages/WorkPage'));
export const ProjectPage = lazyWithPreload(() => import('./pages/ProjectPage'));
export const PlaygroundPage = lazyWithPreload(
  () => import('./pages/PlaygroundPage')
);
export const InterestsPage = lazyWithPreload(
  () => import('./pages/InterestsPage')
);
export const AboutPage = lazyWithPreload(() => import('./pages/AboutPage'));
export const ContactPage = lazyWithPreload(() => import('./pages/ContactPage'));
export const NotFoundPage = lazyWithPreload(() => import('./pages/NotFoundPage'));

// Heavy Three.js visualizer remains lazy-loaded on demand
const MusicVisualizerPage = lazy(
  () => import('./pages/MusicVisualizerPage')
);

// Register preloaders for navigation on hover/focus
registerRoutePreloader('/', HomePage.preload);
registerRoutePreloader('/work', WorkPage.preload);
registerRoutePreloader('/work/:slug', ProjectPage.preload);
registerRoutePreloader('/playground', PlaygroundPage.preload);
registerRoutePreloader('/interests', InterestsPage.preload);
registerRoutePreloader('/about', AboutPage.preload);
registerRoutePreloader('/contact', ContactPage.preload);
registerRoutePreloader('/not-found', NotFoundPage.preload);

// Top loading bar
function RouteLoader() {
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] bg-violet/30 z-[9999] overflow-hidden pointer-events-none">
      <div className="h-full bg-violet w-1/3 animate-pulse" />
    </div>
  );
}

// Route transitions
function AnimatedRoutes() {
  const location = useLocation();

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
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route
            path="/playground/musix-visualizer"
            element={<MusicVisualizerPage />}
          />
          <Route path="/interests" element={<InterestsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </Suspense>
  );
}

export default function App() {
  // Preload route chunks and critical images after initial render
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

    if (
      typeof window !== 'undefined' &&
      'requestIdleCallback' in window
    ) {
      const handle = window.requestIdleCallback(runBackgroundPreload, {
        timeout: 2500,
      });

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
            {/* Custom cursor */}
            <CustomCursor />

            {/* Intro loader */}
            <Loader />

            {/* Page-to-page curtain transition */}
            <PageCurtainTransition />

            {/* Header */}
            <Header />

            {/* Page content */}
            <main className="relative z-10">
              <AnimatedRoutes />
            </main>

            {/* Persistent page footer */}
            <Footer />

            {/* Vercel Web Analytics & Speed Insights */}
            <Analytics />
            <SpeedInsights />
          </div>
        </PageTransitionProvider>
      </Router>
    </LanguageProvider>
  );
}
