
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Countdown from './Countdown';
import ConfettiEffect from './ConfettiEffect';

interface HeroProps {
  childName: string;
  birthDate: Date;
  eventDate: Date;
  className?: string;
}

const Hero = ({ childName, birthDate, eventDate, className }: HeroProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Show confetti after a short delay when component mounts
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden", className)}>
      <ConfettiEffect active={showConfetti} />
      
      {/* Floating decorative elements */}
      <div className="absolute top-1/4 -left-12 md:left-12 w-24 h-24 rounded-full bg-birthday-blue opacity-40 blur-xl animate-float"/>
      <div className="absolute bottom-1/3 -right-12 md:right-16 w-32 h-32 rounded-full bg-birthday-pink opacity-30 blur-xl animate-float" style={{ animationDelay: "2s" }}/>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-birthday-yellow opacity-40 blur-xl animate-float" style={{ animationDelay: "1s" }}/>
      
      <div className="relative z-10 space-y-6 max-w-4xl">
        <div className="animate-fade-in-up">
          <span className="invitation-badge bg-birthday-yellow text-gray-700">First Birthday</span>
          <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-display font-bold">
            <span className="invitation-text-gradient">
              {childName} is turning
            </span>
            <div className="flex justify-center mt-2">
              <div className="relative">
                <span className="text-6xl md:text-8xl lg:text-9xl text-pink-500 font-bold animate-bounce inline-block" style={{ animationDuration: "2.5s" }}>1</span>
                <div className="absolute -top-1 -right-4 md:-right-6 lg:-right-8 w-6 h-6 md:w-10 md:h-10 rounded-full bg-birthday-yellow animate-pulse" style={{ animationDuration: "2.5s" }}></div>
              </div>
            </div>
          </h1>
        </div>
        
        <p className="text-gray-600 text-xl md:text-2xl max-w-2xl mx-auto mt-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          Join us for a day filled with joy, laughter, and precious memories as we celebrate this special milestone!
        </p>
        
        <div className="pt-8 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <h3 className="text-lg text-gray-500 mb-4">The celebration begins in</h3>
          <Countdown targetDate={eventDate} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
