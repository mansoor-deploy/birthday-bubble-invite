
import React, { useState, useEffect } from 'react';

interface ConfettiProps {
  active: boolean;
  count?: number;
}

const ConfettiEffect = ({ active, count = 100 }: ConfettiProps) => {
  const [confetti, setConfetti] = useState<Array<{ 
    id: number; 
    left: string; 
    color: string; 
    delay: string;
    size: number;
    rotation: number;
    shape: 'circle' | 'square' | 'triangle';
  }>>([]);

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
        delay: `${Math.random() * 5}s`,
        size: Math.random() * 10 + 5,
        rotation: Math.random() * 360,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      }));

      setConfetti(newConfetti);
    } else {
      setConfetti([]);
    }
  }, [active, count]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
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
            transform: `rotate(${item.rotation}deg)`,
            animation: `confetti-fall ${5 + Math.random() * 5}s linear forwards, confetti-sway ${2 + Math.random() * 3}s ease-in-out infinite alternate`
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiEffect;
