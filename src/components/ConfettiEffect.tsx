
import React, { useState, useEffect, useRef } from 'react';

interface ConfettiProps {
  active: boolean;
  count?: number;
}

const ConfettiEffect = ({ active, count = 200 }: ConfettiProps) => {
  const [confetti, setConfetti] = useState<Array<{ 
    id: number; 
    left: string; 
    color: string; 
    delay: string;
    size: number;
    rotation: number;
    shape: 'circle' | 'square' | 'triangle';
    scrollPos: number;
    depth: number;
    fallDuration: number;
    swayAmount: number;
  }>>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollY = useRef<number>(0);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
      
      // Apply parallax effect to confetti based on scroll
      if (containerRef.current) {
        containerRef.current.style.transform = `translateY(${scrollY.current * 0.5}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: `${Math.random() * 8}s`, // More varied delays
        size: Math.random() * 10 + 5,
        rotation: Math.random() * 360,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        scrollPos: Math.random() * 100,
        depth: Math.random() * 5 + 1, // Add depth factor (1-6)
        fallDuration: 5 + Math.random() * 10, // More varied fall durations (5-15s)
        swayAmount: 5 + Math.random() * 25 // Varied sway amounts (5-30px)
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
          className="confetti"
          style={{
            left: item.left,
            backgroundColor: item.color,
            animationDelay: item.delay,
            width: `${item.size}px`,
            height: `${item.size}px`,
            borderRadius: item.shape === 'circle' ? '50%' : (item.shape === 'square' ? '0' : ''),
            clipPath: item.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
            transform: `rotate(${item.rotation}deg) translateZ(${-item.depth * 10}px)`,
            opacity: (1 / item.depth).toFixed(2), // Fade out items based on depth
            filter: `blur(${(item.depth - 1) * 0.5}px)`, // Add blur based on depth
            zIndex: Math.floor(100 - item.depth * 10),
            animation: `
              confetti-fall ${item.fallDuration}s linear infinite, 
              confetti-sway ${2 + Math.random() * 3}s ease-in-out infinite alternate
            `,
            '--sway-amount': `${item.swayAmount}px`
          } as any}
        />
      ))}
    </div>
  );
};

export default ConfettiEffect;
