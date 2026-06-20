import React from 'react';

export default function Logo({ className = '', height = 40, showText = true }) {
  // Dynamically adjust viewBox to crop empty margins when rendering monogram only
  const viewBox = showText ? "0 0 110 100" : "15 10 60 80";

  return (
    <svg
      viewBox={viewBox}
      height={height}
      className={`inline-block select-none ${className}`}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top-left rectangle block */}
      <rect x="17" y="13.5" width="14" height="31.5" />
      
      {/* Right vertical stem block */}
      <rect x="58" y="13.5" width="13" height="71.5" />
      
      {/* Bottom-left L-shape and horizontal crossbar */}
      <path d="M 17 58.5 H 58 V 71.5 H 31 V 85 H 17 Z" />
      
      {/* Vertically rotated name label with expanded spacing to prevent overlaps */}
      {showText && (
        <text
          x="84"
          y="85"
          transform="rotate(-90 84 85)"
          fontFamily="'Inter', 'Neue Montreal', 'Satoshi', sans-serif"
          fontWeight="900"
          fontSize="9.5"
          letterSpacing="0.6"
        >
          HASSEN ARKAB
        </text>
      )}
    </svg>
  );
}
