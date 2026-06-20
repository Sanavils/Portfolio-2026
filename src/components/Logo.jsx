import React from 'react';

export default function Logo({ className = '', height = 40, showText = true }) {
  return (
    <svg
      viewBox="0 0 100 100"
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
      
      {/* Vertically rotated name label reading bottom-to-top */}
      {showText && (
        <text
          x="74"
          y="85"
          transform="rotate(-90 74 85)"
          fontFamily="'Inter', 'Neue Montreal', 'Satoshi', sans-serif"
          fontWeight="900"
          fontSize="9"
          letterSpacing="0.4"
        >
          HASSEN ARKAB
        </text>
      )}
    </svg>
  );
}
