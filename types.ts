import React from 'react';

// Global types
export interface ConfettiOptions {
    particleCount?: number;
    spread?: number;
    origin?: { y?: number; x?: number };
    colors?: string[];
    shapes?: string[];
    scalar?: number;
  }
  
  declare global {
    interface Window {
      confetti: (options?: ConfettiOptions) => Promise<null>;
    }
  }
  
  export enum AppState {
    ASKING = 'ASKING',
    SUCCESS = 'SUCCESS',
    GIFT = 'GIFT',
    GIFT_ROSE = 'GIFT_ROSE',
    GIFT_LETTER = 'GIFT_LETTER',
    GIFT_SONG = 'GIFT_SONG',
  }
  
  export interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    pixelSize?: 'sm' | 'md' | 'lg';
  }