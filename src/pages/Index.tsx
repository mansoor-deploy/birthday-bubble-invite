
import React, { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import EventDetails from '@/components/EventDetails';
import MusicPlayer from '@/components/MusicPlayer';
import VideoInvite from '@/components/VideoInvite';
import Calendar from '@/components/Calendar';
import { Cake, Heart, Gift, Sparkles } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Set event details
  const childName = "Emma Rose";
  const birthDate = new Date("2023-06-15T00:00:00");
  const eventDate = new Date("2024-06-15T14:00:00"); // The party date
  
  // Venue details
  const venue = "Sunshine Gardens";
  const address = "123 Rainbow Lane, Joyville, CA 92345";
  const mapUrl = "https://maps.google.com/?q=123+Rainbow+Lane+Joyville+CA";
  
  // Media sources
  const audioSrc = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  const videoSrc = "https://assets.mixkit.co/videos/preview/mixkit-multiracial-people-celebrating-a-birthday-with-a-cake-42709-large.mp4";

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Cake className="w-16 h-16 text-birthday-pink animate-bounce" />
          </div>
          <h2 className="text-2xl font-display font-semibold text-gray-800">Preparing something special...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-birthday-blue/10">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-64 bg-birthday-pink opacity-5 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-full h-64 bg-birthday-blue opacity-5 rounded-full blur-3xl transform translate-y-1/2"></div>
      </div>
      
      {/* Music player */}
      <MusicPlayer audioSrc={audioSrc} autoPlay={true} />
      
      {/* Video invite bubble */}
      <VideoInvite videoSrc={videoSrc} />
      
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-24 overflow-hidden">
        {/* Hero section */}
        <Hero 
          childName={childName} 
          birthDate={birthDate} 
          eventDate={eventDate} 
        />
        
        {/* Divider with icon */}
        <div className="flex items-center justify-center">
          <div className="h-px bg-gray-200 w-20 md:w-40"></div>
          <Cake className="mx-4 text-birthday-pink w-8 h-8" />
          <div className="h-px bg-gray-200 w-20 md:w-40"></div>
        </div>
        
        {/* Event details section */}
        <div className="max-w-4xl mx-auto">
          <EventDetails 
            date="June 15, 2024"
            time="2:00 PM - 5:00 PM"
            venue={venue} 
            address={address}
            mapUrl={mapUrl}
          />
        </div>
        
        {/* Divider with icon */}
        <div className="flex items-center justify-center">
          <div className="h-px bg-gray-200 w-20 md:w-40"></div>
          <Gift className="mx-4 text-birthday-yellow w-8 h-8" />
          <div className="h-px bg-gray-200 w-20 md:w-40"></div>
        </div>
        
        {/* What to expect section */}
        <div className="max-w-4xl mx-auto">
          <div className="invitation-card">
            <div className="text-center mb-8">
              <span className="invitation-badge bg-birthday-green text-gray-700 mb-2">What to Expect</span>
              <h2 className="text-2xl md:text-3xl font-semibold mt-2">A Day Full of Joy</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ExpectationCard 
                icon={<Cake className="w-6 h-6 text-birthday-pink" />}
                title="Cake Smash"
                description="Watch as Emma enjoys her very first birthday cake!"
              />
              
              <ExpectationCard 
                icon={<Gift className="w-6 h-6 text-birthday-blue" />}
                title="Gift Opening"
                description="Precious moments as Emma discovers her birthday surprises."
              />
              
              <ExpectationCard 
                icon={<Sparkles className="w-6 h-6 text-birthday-yellow" />}
                title="Fun Activities"
                description="Games and activities for little ones to enjoy."
              />
              
              <ExpectationCard 
                icon={<Heart className="w-6 h-6 text-birthday-purple" />}
                title="Photo Booth"
                description="Capture memories with our adorable themed photo booth."
              />
            </div>
          </div>
        </div>
        
        {/* Calendar integration */}
        <div className="text-center max-w-md mx-auto py-6">
          <p className="text-gray-600 mb-6">Don't miss this special day! Add it to your calendar:</p>
          <Calendar 
            eventName={`${childName}'s First Birthday Party`}
            description="Join us as we celebrate the first birthday of our little angel. There will be cake, games, and lots of fun!"
            location={`${venue}, ${address}`}
            startDate={eventDate}
            endDate={new Date(eventDate.getTime() + 3 * 60 * 60 * 1000)} // 3 hours after start
            className="mx-auto"
          />
        </div>
        
        {/* Footer */}
        <footer className="text-center pt-8 pb-16">
          <p className="text-gray-500 text-sm">
            With love from the Johnson Family
          </p>
          <div className="mt-4 text-birthday-pink">
            <Heart className="w-5 h-5 inline-block animate-pulse" />
          </div>
        </footer>
      </div>
    </div>
  );
};

interface ExpectationCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ExpectationCard = ({ icon, title, description }: ExpectationCardProps) => (
  <div className="flex flex-col items-center text-center p-6 bg-white bg-opacity-70 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
    <div className="bg-white rounded-full p-3 shadow-sm mb-4">
      {icon}
    </div>
    <h3 className="font-medium text-lg mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Index;
