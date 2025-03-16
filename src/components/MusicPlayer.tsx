
import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  audioSrc: string;
  autoPlay?: boolean;
}

const MusicPlayer = ({ audioSrc, autoPlay = true }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        // Use a promise to handle the play method
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Playback started successfully
              console.log("Audio started playing successfully");
            })
            .catch(error => {
              // Auto-play was prevented
              console.log("Audio playback was prevented:", error);
              setIsPlaying(false);
            });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center space-x-2">
      <audio 
        ref={audioRef} 
        src={audioSrc} 
        loop 
        preload="auto"
        onCanPlayThrough={() => console.log("Audio can play through")}
        onError={(e) => console.error("Audio error:", e)}
      />
      
      <button 
        onClick={togglePlay}
        className="rounded-full p-2 bg-white bg-opacity-70 backdrop-blur-sm shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <Music 
          size={20} 
          className={`transition-colors ${isPlaying ? 'text-pink-500' : 'text-gray-500'}`} 
        />
      </button>
      
      <button 
        onClick={toggleMute}
        className="rounded-full p-2 bg-white bg-opacity-70 backdrop-blur-sm shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX size={20} className="text-gray-500" />
        ) : (
          <Volume2 size={20} className={`transition-colors ${isPlaying ? 'text-pink-500' : 'text-gray-500'}`} />
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;
