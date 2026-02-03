import React, { useState, useEffect, useRef } from 'react';
import { PixelButton } from './components/PixelButton';
import { PixelHeart } from './components/PixelHeart';
import { PixelRoseBouquet } from './components/PixelRoseBouquet';
import { generateLovePoem } from './services/geminiService';
import { AppState } from './types';
import { Heart, Sparkles, Music, RefreshCw, Gift, ArrowLeft, Disc } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.ASKING);
  const [noCount, setNoCount] = useState(0);
  const [poem, setPoem] = useState<string>("");
  const [hearts, setHearts] = useState<{id: number, left: number, delay: number, duration: number, size: number}[]>([]);

  useEffect(() => {
    // Generate hearts on mount for the entire site
    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // Random horizontal position
      delay: Math.random() * 20, // Random start delay
      duration: 15 + Math.random() * 10, // Slow float
      size: 30 + Math.random() * 40, // Random sizes
    }));
    setHearts(newHearts);
  }, []);

  const phrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Pookie please?",
    "Don't do this!",
    "I'm gonna cry...",
    "Breaking my heart!",
    "Last chance!",
  ];

  const getNoButtonText = () => {
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const handleYesClick = () => {
    setAppState(AppState.SUCCESS);
    if (window.confetti) {
      window.confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6, x: 0.5 },
        colors: ['#ff0000', '#ff69b4', '#ffffff'],
        shapes: ['square'] // pixel feel
      });
    }
  };

  const handleGiftClick = () => {
    setAppState(AppState.GIFT);
    if (window.confetti) {
       window.confetti({
         particleCount: 80,
         spread: 60,
         origin: { y: 0.7 },
         colors: ['#FFD700', '#FFA500', '#FF69B4']
       });
     }
  };
  
  const handlePolaroidClick = (id: number) => {
    if (id === 1) {
        setAppState(AppState.GIFT_ROSE);
    } else if (id === 2) {
        setAppState(AppState.GIFT_LETTER);
    } else if (id === 3) {
        setAppState(AppState.GIFT_SONG);
    }
  };

  const handleBackToGift = () => {
      setAppState(AppState.GIFT);
  }

  // Calculate dynamic size for the YES button
  const yesButtonSize = noCount * 20 + 16; 
  
  // Floating words configuration
  const loveWords = [
    { text: "I Love You", left: '10%', top: '20%', delay: '1s' },
    { text: "Forever & Always", left: '70%', top: '15%', delay: '2.5s' },
    { text: "My Player 2", left: '15%', top: '70%', delay: '4s' },
    { text: "You're my favorite", left: '65%', top: '65%', delay: '5.5s' },
    { text: "Level Up!", left: '40%', top: '10%', delay: '7s' },
    { text: "Be Mine", left: '80%', top: '40%', delay: '3s' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decor - Floating Hearts for the entire site */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {hearts.map(heart => (
          <div 
            key={heart.id}
            className="absolute animate-float-up opacity-60 mix-blend-multiply" 
            style={{
              left: `${heart.left}%`,
              animationDuration: `${heart.duration}s`,
              animationDelay: `-${heart.delay}s`, // Negative delay to populate immediately
            }}
          >
            <img 
              src="https://i.pinimg.com/1200x/a2/52/da/a252dae142c7bb21ade3ba5ac9905b36.jpg" 
              alt="floating heart"
              className="select-none"
              style={{ width: `${heart.size}px`, height: 'auto' }}
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>

      <div className="z-10 w-full max-w-7xl text-center">
        
        {appState === AppState.ASKING ? (
          <div className="flex flex-col items-center gap-8">
            <div className="relative">
               {/* Pixel Art Placeholder Image with Polaroid Frame */}
               <div className="bg-white p-4 pixel-border inline-block relative">
                 <img 
                   src={noCount > 4 ? "https://media.tenor.com/K2s5y4w_WzAAAAAi/sad-hamster-sad.gif" : "https://i.pinimg.com/736x/6c/b8/2c/6cb82c6fc5523ff925d8d3b9651acae6.jpg"} 
                   alt="Cute visual" 
                   className="w-64 h-auto max-h-96 object-cover aspect-square"
                   style={{ imageRendering: 'auto' }} 
                   referrerPolicy="no-referrer"
                 />
                 
                 {/* Notification Badge */}
                 <div className="absolute -top-3 -right-3 animate-bounce">
                    <div className="relative">
                        <PixelHeart size={32} className="text-red-500" />
                        <div className="absolute inset-0 flex items-center justify-center text-[8px] text-white font-bold pt-1">!</div>
                    </div>
                 </div>
               </div>
            </div>

            <h1 className="text-2xl md:text-4xl text-red-600 leading-relaxed drop-shadow-sm px-4">
              {noCount > 0 ? "Wait... really?" : "Will you be my Valentine?"}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <PixelButton 
                onClick={handleYesClick}
                style={{ fontSize: Math.min(yesButtonSize, 100) }} // Cap size to prevent breaking layout totally
                className="" // Defaults to Pink (Primary)
              >
                YES <Heart className="ml-2 fill-current" size={Math.min(yesButtonSize, 100) * 0.8} />
              </PixelButton>

              <PixelButton 
                onClick={handleNoClick}
                variant="danger"
                className="text-xs md:text-base"
              >
                {getNoButtonText()}
              </PixelButton>
            </div>
          </div>
        ) : appState === AppState.SUCCESS ? (
          <div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-500 relative">
            
            <h1 className="text-3xl md:text-5xl text-red-600 mb-2 drop-shadow-md bg-white/70 p-4 rounded-xl backdrop-blur-sm pixel-border z-20">
              YAY! <br/> <span className="text-xl md:text-2xl text-pink-600">I knew you'd say yes!</span>
            </h1>

            <div className="mt-8">
              <PixelButton 
                onClick={handleGiftClick} 
                className="text-lg md:text-xl px-8 py-4 animate-bounce"
              >
                I got something for you <Gift className="ml-2 inline-block" />
              </PixelButton>
            </div>

          </div>
        ) : appState === AppState.GIFT ? (
            // GIFT STATE - Only display the polaroids
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full z-10 animate-in fade-in duration-700">
                
                {/* Polaroid 1 - Clickable */}
                <div 
                    onClick={() => handlePolaroidClick(1)}
                    className="bg-white p-3 pb-12 shadow-xl transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 pixel-border relative group cursor-pointer"
                >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-200/50 w-20 h-6 -rotate-2"></div> {/* Tape effect */}
                    <div className="w-64 h-64 border-2 border-gray-100 flex items-center justify-center bg-gray-50 group-hover:bg-pink-50 transition-colors">
                      <span className="text-8xl text-pink-400 font-bold select-none">1</span>
                    </div>
                </div>

                {/* Polaroid 2 - Clickable */}
                <div 
                    onClick={() => handlePolaroidClick(2)}
                    className="bg-white p-3 pb-12 shadow-xl transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 pixel-border relative group z-10 cursor-pointer"
                >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-200/50 w-20 h-6 rotate-1"></div> {/* Tape effect */}
                    <div className="w-64 h-64 border-2 border-gray-100 flex items-center justify-center bg-gray-50 group-hover:bg-red-50 transition-colors">
                      <span className="text-8xl text-red-400 font-bold select-none">2</span>
                    </div>
                </div>

                {/* Polaroid 3 - Clickable */}
                <div 
                    onClick={() => handlePolaroidClick(3)}
                    className="bg-white p-3 pb-12 shadow-xl transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 pixel-border relative group cursor-pointer"
                >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-200/50 w-20 h-6 -rotate-3"></div> {/* Tape effect */}
                    <div className="w-64 h-64 border-2 border-gray-100 flex items-center justify-center bg-gray-50 group-hover:bg-purple-50 transition-colors">
                      <span className="text-8xl text-purple-400 font-bold select-none">3</span>
                    </div>
                </div>

            </div>
        ) : appState === AppState.GIFT_LETTER ? (
             // GIFT_LETTER State
             <div className="relative w-full min-h-screen flex items-center justify-center p-4 animate-in fade-in zoom-in duration-500">
                <button 
                    onClick={handleBackToGift}
                    className="absolute top-4 left-4 p-3 bg-white pixel-border hover:bg-gray-100 z-50 text-xs md:text-sm"
                >
                    <ArrowLeft size={16} className="inline mr-2" /> BACK
                </button>

                {/* Paper Container */}
                <div className="relative bg-[#fffdf5] text-black w-full max-w-2xl shadow-2xl pixel-border mx-auto transform rotate-1">
                    {/* Washi Tape */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-pink-300/60 -rotate-2"></div>
                    
                    <div className="p-8 md:p-12 flex flex-col gap-6">
                        {/* Header Image/Stamp */}
                        <div className="absolute top-4 right-4 opacity-80 rotate-12">
                             <img 
                                src="https://i.pinimg.com/736x/ef/20/b8/ef20b8e0eadde2c27fdb401852b43fe0.jpg" 
                                className="w-16 h-16 object-cover border-4 border-white shadow-sm"
                                alt="stamp"
                             />
                        </div>

                        {/* Letter Content */}
                        <div className="text-left space-y-4 relative z-10">
                            <p className="font-['Press_Start_2P'] text-[10px] md:text-xs leading-loose text-pink-600 border-b-2 border-pink-100 pb-4">
                                To my beautiful, religious, family-oriented, travel-loving, dessert-eating, and (admittedly) always-right gorgeous baddie:
                            </p>
                            
                            <p className="font-serif text-gray-800 text-sm md:text-lg leading-relaxed md:leading-loose tracking-wide">
                                I can’t thank you enough for being in my life, V. This past year has truly felt like a fever dream, and you are the ray of sunshine that makes my days so much brighter and warmer. I am incredibly grateful to have you as my Valentine again, and I hope to celebrate this day with you for the rest of my life.
                            </p>
                            
                            <p className="font-['Press_Start_2P'] text-right text-[10px] md:text-xs text-red-500 pt-8 mt-4">
                                I love you, always and forever.
                                <br/><br/>
                                <span className="text-lg">~ K</span>
                            </p>
                        </div>
                    </div>

                    {/* Footer Decorations */}
                    <div className="absolute bottom-2 left-2 flex gap-1">
                        <PixelHeart size={16} className="text-pink-300" />
                        <PixelHeart size={16} className="text-red-300" />
                    </div>
                </div>
            </div>
        ) : appState === AppState.GIFT_SONG ? (
             // GIFT_SONG State
             <div className="relative w-full min-h-screen flex items-center justify-center p-4 animate-in fade-in zoom-in duration-500">
                <button 
                    onClick={handleBackToGift}
                    className="absolute top-4 left-4 p-3 bg-white pixel-border hover:bg-gray-100 z-50 text-xs md:text-sm"
                >
                    <ArrowLeft size={16} className="inline mr-2" /> BACK
                </button>

                <div className="bg-white p-6 md:p-8 pixel-border flex flex-col items-center gap-6 shadow-2xl relative max-w-md w-full mx-auto transform rotate-1">
                     {/* Sticker Decorations */}
                     <div className="absolute -top-8 -right-8 animate-spin-slow pointer-events-none hidden md:block">
                         <Disc size={80} className="text-black fill-gray-900" />
                         <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 bg-pink-400 rounded-full"></div>
                         </div>
                     </div>
                     
                     <div className="absolute -top-4 -right-4 animate-spin-slow pointer-events-none md:hidden">
                         <Disc size={60} className="text-black fill-gray-900" />
                     </div>

                     <div className="absolute top-0 -left-6 text-pink-400 animate-bounce delay-100 pointer-events-none">
                        <Music size={32} />
                     </div>
                     <div className="absolute bottom-20 -right-6 text-purple-400 animate-pulse delay-300 pointer-events-none">
                        <Music size={24} />
                     </div>

                     <h2 className="text-xl md:text-3xl text-pink-600 font-bold mt-2">A song for you</h2>

                     {/* The Song Image */}
                     <div className="relative group w-full">
                        <div className="absolute inset-0 bg-gray-900 translate-x-2 translate-y-2 pixel-border"></div>
                        <img 
                            src="https://i.pinimg.com/736x/ac/89/be/ac89be05d84885506c57b0eab0b24650.jpg" 
                            alt="Song" 
                            className="relative w-full h-auto border-4 border-white shadow-sm object-cover"
                        />
                     </div>
                     
                     {/* Cute Player UI */}
                     <div className="w-full bg-gray-50 border-2 border-gray-200 p-3 rounded-lg flex items-center gap-3">
                        <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white animate-pulse">
                            <Music size={14} />
                        </div>
                        <div className="flex-1">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-pink-400 w-2/3"></div>
                            </div>
                        </div>
                        <span className="text-[10px] text-gray-500 font-sans">3:12</span>
                     </div>
                </div>
            </div>
        ) : (
            // GIFT_ROSE State
            <div className="relative w-full h-full flex flex-col items-center justify-center min-h-[500px]">
                {/* Back Button */}
                <button 
                    onClick={handleBackToGift}
                    className="absolute top-0 left-0 p-2 bg-white pixel-border hover:bg-gray-100 z-20"
                >
                    <ArrowLeft />
                </button>

                {/* Floating Words */}
                {loveWords.map((word, index) => (
                    <div 
                        key={index}
                        className="absolute text-xl md:text-3xl font-bold text-pink-600 animate-float pointer-events-none whitespace-nowrap drop-shadow-md"
                        style={{
                            left: word.left,
                            top: word.top,
                            animationDelay: word.delay,
                            textShadow: '2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white'
                        }}
                    >
                        {word.text}
                    </div>
                ))}

                <div className="relative z-10">
                    <PixelRoseBouquet />
                </div>
            </div>
        )}

      </div>
      
      {/* Footer Music Control Simulation - Only show if not in GIFT state */}
      {appState !== AppState.GIFT && appState !== AppState.GIFT_ROSE && appState !== AppState.GIFT_LETTER && appState !== AppState.GIFT_SONG && (
        <div className="fixed bottom-4 right-4 flex gap-2">
            <button className="bg-gray-800 text-white p-2 pixel-border hover:bg-gray-700 active:translate-y-1">
               <Music size={16} />
            </button>
        </div>
      )}
    </div>
  );
};

export default App;