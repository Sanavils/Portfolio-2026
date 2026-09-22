import { lazy } from 'react';

// Cache to prevent duplicate preloads
const preloadedImages = new Set();
const preloadedRoutes = new Set();
const routePreloaders = {};

/**
 * Preload an image asset in the background.
 */
export const preloadImage = (src) => {
  if (!src || preloadedImages.has(src) || typeof window === 'undefined') return;
  preloadedImages.add(src);
  const img = new Image();
  img.src = src;
};

/**
 * Enhanced React.lazy with a callable .preload() method.
 */
export const lazyWithPreload = (factory) => {
  const Component = lazy(factory);
  Component.preload = factory;
  return Component;
};

/**
 * Register a route path to its lazy preload function.
 */
export const registerRoutePreloader = (path, preloadFn) => {
  routePreloaders[path] = preloadFn;
};

/**
 * Preload a route chunk by pathname.
 */
export const preloadRoute = (path) => {
  if (!path || preloadedRoutes.has(path)) return;

  // Exact match
  if (routePreloaders[path]) {
    preloadedRoutes.add(path);
    routePreloaders[path]();
    return;
  }

  // Project pages dynamic match (/work/:slug)
  if (path.startsWith('/work/')) {
    preloadedRoutes.add('/work/:slug');
    routePreloaders['/work/:slug']?.();
    return;
  }

  // Prefix match
  const matchingKey = Object.keys(routePreloaders).find((k) => path.startsWith(k));
  if (matchingKey) {
    preloadedRoutes.add(matchingKey);
    routePreloaders[matchingKey]();
  }
};

/**
 * Preload critical above-the-fold images after initial render during browser idle.
 */
export const preloadCriticalImages = () => {
  const criticalImages = [
    '/assets/projects/groupe-adp/adp-logo.png',
    '/assets/projects/abercrombie/abercrombie-logo.png',
    '/assets/projects/civic-vote/civic-vote-hero.png',
    '/assets/projects/okane/okane-logo.png',
  ];
  criticalImages.forEach(preloadImage);
};
