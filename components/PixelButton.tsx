import React from 'react';
import { PixelButtonProps } from '../types';

export const PixelButton: React.FC<PixelButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  style,
  onClick,
  ...props 
}) => {
  
  const baseStyles = "relative inline-flex items-center justify-center font-bold uppercase transition-transform active:translate-y-1 pixel-border focus:outline-none";
  
  const variants = {
    primary: "bg-pink-500 text-white hover:bg-pink-600 border-black",
    secondary: "bg-white text-black hover:bg-gray-100 border-black",
    danger: "bg-red-500 text-white hover:bg-red-600 border-black",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={{
        ...style,
      }}
      {...props}
    >
      {/* Decorative inner highlight for pixel feel */}
      <div className="absolute top-1 left-1 right-1 h-1 bg-white/20 pointer-events-none" />
      {children}
    </button>
  );
};