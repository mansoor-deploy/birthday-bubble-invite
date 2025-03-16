
import React, { useState, useEffect, useRef } from 'react';

interface ConfettiProps {
  active: boolean;
  count?: number;
}

const ConfettiEffect = ({ active, count = 200 }: ConfettiProps) => {
  const [confetti, setConfetti] = useState<Array<{ 
    id: number; 
    left: string; 
    top: string;
    color: string; 
    delay: string;
    size: number;
    rotation: number;
    shape: 'circle' | 'square' | 'triangle';
    depth: number;
    fallSpeed: number;
  }>>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (active) {
      const colors = [
        '#FFDEE2', // pink
        '#FEF7CD', // yellow
        '#D3E4FD', // blue
        '#F2FCE2', // green
        '#FEC6A1', // orange
        '#E5DEFF'  // purple
      ];

      const shapes = ['circle', 'square', 'triangle'] as const;

      const newConfetti = Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * -100}%`, // Start above the viewport at random positions
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: `${Math.random() * 5}s`,
        size: Math.random() * 10 + 5,
        rotation: Math.random() * 360,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        depth: Math.random() * 5 + 1, // Depth factor (1-6)
        fallSpeed: 10 + Math.random() * 15 // Different fall speeds (10-25s)
      }));

      setConfetti(newConfetti);
    } else {
      setConfetti([]);
    }
  }, [active, count]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" ref={containerRef}>
      {confetti.map(item => (
        <div
          key={item.id}
          className="confetti-piece"
          style={{
            left: item.left,
            top: item.top,
            backgroundColor: item.color,
            animationDelay: item.delay,
            width: `${item.size}px`,
            height: `${item.size}px`,
            borderRadius: item.shape === 'circle' ? '50%' : (item.shape === 'square' ? '0' : ''),
            clipPath: item.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
            transform: `rotate(${item.rotation}deg) translateZ(${-item.depth * 10}px)`,
            opacity: (1 / item.depth).toFixed(2),
            filter: `blur(${(item.depth - 1) * 0.5}px)`,
            zIndex: Math.floor(100 - item.depth * 10),
            animation: `natural-fall ${item.fallSpeed}s linear forwards, natural-sway ${2 + Math.random() * 3}s ease-in-out infinite alternate`
          } as any}
        />
      ))}
    </div>
  );
};

export default ConfettiEffect;
