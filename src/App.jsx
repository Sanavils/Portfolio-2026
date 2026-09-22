import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import Loader from './components/Loader';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

// Code-split pages for high performance and reduced initial bundle
const HomePage = lazy(() => import('./pages/HomePage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const PlaygroundPage = lazy(() => import('./pages/PlaygroundPage'));
const MusicVisualizerPage = lazy(() => import('./pages/MusicVisualizerPage'));
const InterestsPage = lazy(() => import('./pages/InterestsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Subtle elegant route loader
function RouteLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-charcoal-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-violet animate-ping" />
        <span>Loading...</span>
      </div>
    </div>
  );
}

// Inner component to track location pathname for AnimatePresence transitions
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<RouteLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Main Portfolio Route */}
          <Route path="/" element={<HomePage />} />

          {/* Work / Projects Hub */}
          <Route path="/work" element={<WorkPage />} />

          {/* Dynamic Project Details Route */}
          <Route path="/work/:slug" element={<ProjectPage />} />
          
          {/* Playground Route */}
          <Route path="/playground" element={<PlaygroundPage />} />

          {/* Fullscreen Music Visualizer Route */}
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
      </AnimatePresence>
    </Suspense>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="relative min-h-screen bg-bg-light select-none">
          {/* Custom magnetic circle cursor trail */}
          <CustomCursor />

          {/* Intro loader curtain */}
          <Loader />

          {/* Fixed header bar */}
          <Header />

          {/* Dynamic route contents */}
          <main className="relative z-10">
            <AnimatedRoutes />
          </main>

          {/* Persistent page footer */}
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}
