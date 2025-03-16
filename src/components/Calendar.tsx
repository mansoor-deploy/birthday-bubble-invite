
import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarProps {
  eventName: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  className?: string;
}

const Calendar = ({ 
  eventName, 
  description, 
  location, 
  startDate, 
  endDate,
  className 
}: CalendarProps) => {
  
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const constructGoogleCalendarUrl = () => {
    const startDateFormatted = formatDate(startDate);
    const endDateFormatted = formatDate(endDate);
    
    const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    const eventParams = `&text=${encodeURIComponent(eventName)}`;
    const dateParams = `&dates=${startDateFormatted}/${endDateFormatted}`;
    const detailsParams = `&details=${encodeURIComponent(description)}`;
    const locationParams = `&location=${encodeURIComponent(location)}`;
    
    return `${baseUrl}${eventParams}${dateParams}${detailsParams}${locationParams}&sf=true&output=xml`;
  };

  return (
    <a
      href={constructGoogleCalendarUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center justify-center px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-sm font-medium",
        className
      )}
    >
      <CalendarIcon className="mr-2 h-5 w-5 text-pink-500" />
      <span>Add to Google Calendar</span>
    </a>
  );
};

export default Calendar;
