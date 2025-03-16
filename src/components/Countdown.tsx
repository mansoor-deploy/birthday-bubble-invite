
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface CountdownProps {
  targetDate: Date;
  className?: string;
}

const Countdown = ({ targetDate, className }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={cn("flex justify-center items-center space-x-4 md:space-x-6", className)}>
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

interface TimeUnitProps {
  value: number;
  label: string;
}

const TimeUnit = ({ value, label }: TimeUnitProps) => (
  <div className="flex flex-col items-center">
    <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-md px-4 py-3 md:px-6 md:py-4 min-w-[60px] md:min-w-[80px] flex items-center justify-center">
      <span className="text-2xl md:text-3xl font-display font-semibold text-gray-800 animate-pulse">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="text-xs mt-2 text-gray-600 font-medium tracking-wide">
      {label}
    </span>
  </div>
);

export default Countdown;
