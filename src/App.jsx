import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import Loader from './components/Loader';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import About from './components/About';
import Process from './components/Process';
import CreativeStack from './components/CreativeStack';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectPage from './pages/ProjectPage';
import PlaygroundPage from './pages/PlaygroundPage';
import CustomCursor from './components/CustomCursor';

// Inner component to track location pathname for AnimatePresence transitions
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Main Dashboard Route */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <ProjectGrid />
              <About />
              <Process />
              <CreativeStack />
              <Contact />
            </>
          }
        />
        {/* Dynamic Project Details Route */}
        <Route path="/work/:slug" element={<ProjectPage />} />
        
        {/* Playground Route */}
        <Route path="/playground" element={<PlaygroundPage />} />
      </Routes>
    </AnimatePresence>
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
