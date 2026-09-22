import React from 'react';
import { Link } from 'react-router-dom';
import { preloadRoute, preloadImage } from '../utils/preload';
import { usePageTransition } from '../context/PageTransitionContext';

/**
 * PrefetchLink:
 * 1. Preloads route JS chunk and project image on hover, focus, or touch
 * 2. On click, triggers the signature violet curtain page transition smoothly
 */
export default function PrefetchLink({
  to,
  prefetchImage,
  onMouseEnter,
  onFocus,
  onTouchStart,
  onClick,
  children,
  ...props
}) {
  const { navigateWithCurtain } = usePageTransition();

  const handlePrefetch = () => {
    if (typeof to === 'string') {
      preloadRoute(to);
    }
    if (prefetchImage) {
      if (Array.isArray(prefetchImage)) {
        prefetchImage.forEach(preloadImage);
      } else {
        preloadImage(prefetchImage);
      }
    }
  };

  const handleClick = (e) => {
    onClick?.(e);

    // Standard accessible link checks (allow Cmd+click, new tab, external links, etc.)
    if (
      !e.defaultPrevented &&
      e.button === 0 && // Left-click only
      !e.metaKey && // Not Cmd+click
      !e.altKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      (!props.target || props.target === '_self') &&
      typeof to === 'string' &&
      to.startsWith('/')
    ) {
      e.preventDefault();
      navigateWithCurtain(to);
    }
  };

  return (
    <Link
      to={to}
      onMouseEnter={(e) => {
        handlePrefetch();
        onMouseEnter?.(e);
      }}
      onFocus={(e) => {
        handlePrefetch();
        onFocus?.(e);
      }}
      onTouchStart={(e) => {
        handlePrefetch();
        onTouchStart?.(e);
      }}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
}
