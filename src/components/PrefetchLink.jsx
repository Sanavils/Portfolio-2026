import React from 'react';
import { Link } from 'react-router-dom';
import { preloadRoute, preloadImage } from '../utils/preload';

/**
 * SmartLink / PrefetchLink:
 * Wraps react-router-dom Link to prefetch route JS chunks and associated
 * images on hover, focus, or touch, making navigation instant and seamless.
 */
export default function PrefetchLink({
  to,
  prefetchImage,
  onMouseEnter,
  onFocus,
  onTouchStart,
  children,
  ...props
}) {
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
      {...props}
    >
      {children}
    </Link>
  );
}
