
import React from 'react';
import { MapPin, Clock, Calendar as CalendarIcon, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventDetailsProps {
  date: string;
  time: string;
  venue: string;
  address: string;
  mapUrl: string;
  className?: string;
}

const EventDetails = ({ 
  date,
  time,
  venue, 
  address,
  mapUrl,
  className 
}: EventDetailsProps) => {
  return (
    <div className={cn("invitation-card space-y-6", className)}>
      <div className="text-center mb-8">
        <span className="invitation-badge bg-birthday-pink text-gray-700 mb-2">Event Details</span>
        <h2 className="text-2xl md:text-3xl font-semibold mt-2">Join Us To Celebrate</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DetailCard 
          icon={<CalendarIcon className="w-6 h-6 text-birthday-pink" />}
          title="Date"
          content={date}
        />
        
        <DetailCard 
          icon={<Clock className="w-6 h-6 text-birthday-blue" />}
          title="Time"
          content={time}
        />
        
        <DetailCard 
          icon={<MapPin className="w-6 h-6 text-birthday-purple" />}
          title="Venue"
          content={venue}
        />
        
        <DetailCard 
          icon={<Gift className="w-6 h-6 text-birthday-yellow" />}
          title="Theme"
          content="Tiny Treasures"
        />
      </div>
      
      <div className="mt-8 bg-birthday-blue bg-opacity-20 rounded-xl p-4 text-center">
        <p className="text-gray-700 mb-2">{address}</p>
        <a 
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer" 
          className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          View on Google Maps
        </a>
      </div>
    </div>
  );
};

interface DetailCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

const DetailCard = ({ icon, title, content }: DetailCardProps) => (
  <div className="flex items-center space-x-4 p-4 bg-white bg-opacity-50 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
    <div className="bg-white rounded-full p-3 shadow-sm">
      {icon}
    </div>
    <div>
      <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
      <p className="text-gray-800 font-medium mt-1">{content}</p>
    </div>
  </div>
);

export default EventDetails;
