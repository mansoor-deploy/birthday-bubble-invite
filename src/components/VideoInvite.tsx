
import React, { useState, useRef, useEffect } from 'react';
import { Video, X } from 'lucide-react';

interface VideoInviteProps {
  videoSrc: string;
}

const VideoInvite = ({ videoSrc }: VideoInviteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHalfVisible, setIsHalfVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show the bubble icon after a delay or when user reaches bottom
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      
      // Show bubble when user scrolls 70% of the page or reaches the bottom
      if (scrollPosition > documentHeight * 0.7) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Show the bubble after 30 seconds regardless of scroll
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.error("Video playback was prevented:", error);
        });
      }
      // After the video is opened, make the bubble half visible
      setIsHalfVisible(true);
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  const toggleVideo = () => {
    setIsOpen(!isOpen);
  };

  // Animation classes for the bubble based on its state
  const bubbleClasses = `
    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} 
    ${isHalfVisible && !isOpen ? 'scale-75 opacity-70' : ''}
    bubble-container transition-all duration-500
  `;

  return (
    <>
      <div 
        ref={containerRef}
        className={bubbleClasses}
        style={{ 
          transform: isHalfVisible && !isOpen ? 'translateX(-30%)' : 'translateX(0)'
        }}
      >
        <button
          onClick={toggleVideo}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-birthday-pink to-birthday-purple shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Open video invitation"
        >
          <Video className="w-7 h-7 text-white animate-pulse" />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-all duration-300">
          <div className="relative w-11/12 max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
            <button
              onClick={toggleVideo}
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-70 backdrop-blur-sm"
              aria-label="Close video"
            >
              <X className="w-5 h-5 text-gray-800" />
            </button>
            
            <video
              ref={videoRef}
              className="w-full"
              controls
              playsInline
              src={videoSrc}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VideoInvite;
