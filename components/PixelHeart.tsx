import React from 'react';

interface PixelHeartProps {
  size?: number;
  color?: string;
  className?: string;
}

export const PixelHeart: React.FC<PixelHeartProps> = ({ size = 24, color = "currentColor", className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={color} 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated' }}
    >
      <path d="M4 4h4v4H4z" />
      <path d="M8 8h4v4H8z" />
      <path d="M12 12h4v4H12z" />
      <path d="M16 8h4v4H16z" />
      <path d="M20 4h4v4H20z" />
      
      {/* Filled body approximation for pixel look */}
      <path d="M2 8H6V12H2Z" />
      <path d="M18 8H22V12H18Z" />
      <path d="M2 12H10V16H2Z" />
      <path d="M14 12H22V16H14Z" />
      <path d="M4 16H12V20H4Z" />
      <path d="M12 16H20V20H12Z" />
      <path d="M8 20H16V22H8Z" />
      
      <rect x="6" y="2" width="4" height="4" />
      <rect x="14" y="2" width="4" height="4" />
    </svg>
  );
};