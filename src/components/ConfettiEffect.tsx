
import React, { useState, useEffect } from 'react';

interface ConfettiProps {
  active: boolean;
  count?: number;
}

const ConfettiEffect = ({ active, count = 50 }: ConfettiProps) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: string; color: string; delay: string }>>([]);

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

      const newConfetti = Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: `${Math.random() * 5}s`
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
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0'
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiEffect;
