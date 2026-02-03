import React, { useEffect, useState } from 'react';

interface PixelComponentProps {
  x: number;
  y: number;
  color?: string;
  delay?: number;
  isBlooming: boolean;
  scale?: number;
}

const PixelLeaf: React.FC<PixelComponentProps & { rotate?: number }> = ({ x, y, rotate = 0, delay = 0, isBlooming }) => (
  <g 
    style={{ 
      transformOrigin: `${x}px ${y}px`,
      transform: isBlooming ? `rotate(${rotate}deg) scale(1)` : `rotate(${rotate}deg) scale(0)`,
      transition: `transform 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
    }}
  >
    <path d={`M${x} ${y} h2 v-2 h2 v-2 h2 v-2 h-2 v-2 h-2 v2 h-2 v2 h-2 v2 h2 z`} fill="#2d6a4f" />
    <path d={`M${x+2} ${y-2} h2 v-2 h2 v-2 h-2 v2 h-2 v2 z`} fill="#40916c" />
  </g>
);

const PixelRose: React.FC<PixelComponentProps> = ({ x, y, delay = 0, isBlooming, scale = 1 }) => {
  // Center target for stems (the bouquet handle top)
  const stemTargetX = 70;
  const stemTargetY = 90;
  
  // Center of the rose image (assuming ~18x18 size)
  const roseCenterX = x + 9;
  const roseCenterY = y + 9;

  return (
    <g 
      style={{ 
        transformOrigin: `${roseCenterX}px ${roseCenterY}px`,
        transform: isBlooming ? `scale(${scale})` : 'scale(0)',
        transition: `transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
      }}
    >
      {/* Branch/Stem connecting to bouquet center */}
      <line 
        x1={roseCenterX} 
        y1={roseCenterY + 4} // Start slightly below center
        x2={stemTargetX} 
        y2={stemTargetY} 
        stroke="#2d6a4f" 
        strokeWidth="1.5"
        opacity="0.8"
      />

      {/* Rose Image */}
      {/* Using the provided pixel art rose image */}
      <image 
        href="https://i.pinimg.com/736x/ef/20/b8/ef20b8e0eadde2c27fdb401852b43fe0.jpg" 
        x={x} 
        y={y} 
        width="18" 
        height="18" 
        preserveAspectRatio="xMidYMid slice"
        style={{ imageRendering: 'pixelated' }}
      />
    </g>
  );
};

export const PixelRoseBouquet: React.FC = () => {
  const [isBlooming, setIsBlooming] = useState(false);

  useEffect(() => {
    // Start blooming animation
    const timer = setTimeout(() => setIsBlooming(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* Container sized up significantly for "BIG" effect */}
      <div className="w-[22rem] h-[22rem] md:w-[32rem] md:h-[32rem] lg:w-[42rem] lg:h-[42rem] animate-in fade-in duration-700">
        <svg 
            viewBox="0 0 140 140" 
            className="w-full h-full drop-shadow-2xl" 
            style={{ imageRendering: 'pixelated' }}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* --- Wrapping Paper (Beige/Kraft) --- */}
            <g 
                className={`transition-all duration-[1500ms] ease-out origin-[70px_130px] ${isBlooming ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
            >
                {/* Back Paper (Darker) */}
                <path d="M35 50 L25 60 L60 120 L80 120 L115 60 L105 50 z" fill="#9c6644" />
                
                {/* Front Paper (Main) */}
                <path d="M30 60 L70 130 L110 60 L100 50 L70 100 L40 50 z" fill="#ddb892" />
                
                {/* Side Folds */}
                <path d="M30 60 L40 50 L45 65 z" fill="#e6ccb2" />
                <path d="M110 60 L100 50 L95 65 z" fill="#e6ccb2" />
            </g>

            {/* --- Leaves (Behind Roses) --- */}
            <g>
                <PixelLeaf x={20} y={50} rotate={-45} delay={300} isBlooming={isBlooming} />
                <PixelLeaf x={110} y={50} rotate={45} delay={350} isBlooming={isBlooming} />
                <PixelLeaf x={30} y={35} rotate={-60} delay={400} isBlooming={isBlooming} />
                <PixelLeaf x={100} y={35} rotate={60} delay={450} isBlooming={isBlooming} />
                <PixelLeaf x={65} y={20} rotate={0} delay={500} isBlooming={isBlooming} />
            </g>

            {/* --- Ribbon --- */}
             <g 
                style={{ 
                    transformOrigin: '70px 100px',
                    transform: isBlooming ? 'scale(1)' : 'scale(0)',
                    transition: 'transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1.5s'
                }}
            >
                <rect x="50" y="98" width="40" height="6" fill="#9d0208" /> {/* Band */}
                <rect x="66" y="96" width="8" height="10" fill="#d00000" /> {/* Knot center */}
                
                {/* Bow Loops */}
                <path d="M66 100 L50 90 L50 110 L66 104 Z" fill="#d00000" />
                <path d="M74 100 L90 90 L90 110 L74 104 Z" fill="#d00000" />
                
                {/* Ribbon Tails */}
                <path d="M68 106 L60 125 L70 125 L70 106 Z" fill="#9d0208" />
                <path d="M72 106 L80 125 L70 125 L70 106 Z" fill="#9d0208" />
            </g>

            {/* --- Roses (Back to Front Layering) --- */}
            {/* Top Back Row */}
            <PixelRose x={50} y={20} delay={600} isBlooming={isBlooming} scale={0.9} />
            <PixelRose x={75} y={20} delay={650} isBlooming={isBlooming} scale={0.9} />
            <PixelRose x={35} y={30} delay={700} isBlooming={isBlooming} />
            <PixelRose x={90} y={30} delay={750} isBlooming={isBlooming} />
            
            {/* Middle Row */}
            <PixelRose x={62} y={35} delay={800} isBlooming={isBlooming} scale={1.1} />
            <PixelRose x={25} y={45} delay={850} isBlooming={isBlooming} />
            <PixelRose x={100} y={45} delay={900} isBlooming={isBlooming} />
            
            {/* Front Cluster */}
            <PixelRose x={45} y={50} delay={950} isBlooming={isBlooming} scale={1.1} />
            <PixelRose x={80} y={50} delay={1000} isBlooming={isBlooming} scale={1.1} />
            <PixelRose x={62} y={60} delay={1100} isBlooming={isBlooming} scale={1.2} /> {/* Centerpiece */}
            
            {/* Filler buds (Small pink/white pixels) */}
            <g className={`transition-opacity duration-1000 delay-1000 ${isBlooming ? 'opacity-100' : 'opacity-0'}`}>
                <rect x="40" y="25" width="2" height="2" fill="#fff" />
                <rect x="95" y="25" width="2" height="2" fill="#fff" />
                <rect x="55" y="15" width="2" height="2" fill="#fff" />
                <rect x="85" y="15" width="2" height="2" fill="#fff" />
            </g>

            {/* --- Floating Sparkles --- */}
            <g className={isBlooming ? "opacity-100" : "opacity-0 transition-opacity duration-1000 delay-1000"}>
                <rect x="20" y="20" width="2" height="2" fill="#fff" className="animate-pulse" />
                <rect x="110" y="30" width="2" height="2" fill="#fff" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
                <rect x="10" y="80" width="2" height="2" fill="#fff" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
                <rect x="120" y="80" width="2" height="2" fill="#fff" className="animate-pulse" style={{ animationDelay: '1.1s' }} />
                <rect x="70" y="10" width="3" height="3" fill="#ffd60a" className="animate-bounce" style={{ animationDuration: '3s' }} />
            </g>

        </svg>
      </div>
    </div>
  );
};