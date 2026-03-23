'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, isSameDay, isSameMonth } from 'date-fns';
import { FaCalendarAlt } from 'react-icons/fa';

export default function FestivalsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(new Date());
  
  // Custom styles for react-calendar
  // These override the default react-calendar styles to match the desired UI
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      if (res.ok) {
        const data = await res.json();
        setEvents(data.map((evt: any) => ({ ...evt, date: new Date(evt.date) })));
      }
    } catch (err) {
      console.error('Failed to fetch events');
    }
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleActiveStartDateChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (activeStartDate) {
      setCurrentMonthDate(activeStartDate);
    }
  };

  // Filter events for selected date
  const selectedDateEvents = events.filter(evt => isSameDay(evt.date, selectedDate));
  
  // Filter events for current viewing month (Right Sidebar)
  const currentMonthEvents = events.filter(evt => isSameMonth(evt.date, currentMonthDate));

  return (
    <div className="min-h-screen bg-green-500 pt-24 pb-16 flex items-center justify-center">
      <style suppressHydrationWarning>{`
        .custom-calendar {
          border: none !important;
          width: 100% !important;
          font-family: inherit;
        }
        .react-calendar__navigation button {
          min-width: 44px;
          background: none;
        }
        .react-calendar__navigation button:disabled {
          background-color: transparent !important;
        }
        .react-calendar__navigation__label {
          font-weight: bold;
          color: #666;
          text-transform: uppercase;
          pointer-events: none;
        }
        .react-calendar__month-view__weekdays {
          text-transform: uppercase;
          font-weight: 500;
          font-size: 0.75rem;
          color: #9ca3af;
        }
        .react-calendar__month-view__weekdays__weekday abbr {
          text-decoration: none;
        }
        .react-calendar__tile {
          padding: 1rem 0.5rem !important;
          font-weight: 500;
          color: #4b5563;
          position: relative;
        }
        .react-calendar__tile:disabled {
          background-color: transparent;
        }
        .react-calendar__tile--now {
          background: none !important;
          font-weight: bold;
          color: #111827;
        }
        .react-calendar__tile--active {
          background: #10b981 !important; /* Emerald 500 */
          color: white !important;
          border-radius: 50%;
        }
        .react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus {
          background-color: #f3f4f6;
          border-radius: 50%;
        }
        .has-event::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background-color: #10b981;
          border-radius: 50%;
        }
        .react-calendar__tile--active.has-event::after {
          background-color: white;
        }
      `}</style>

      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center drop-shadow-md">
          Temple Calendar
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Calendar Card (Left & Center) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]"
          >
            {/* Left side: Selected Date Details (Dark Theme) */}
            <div className="w-full md:w-[40%] bg-[#2a2d34] text-white p-8 md:p-12">
              <div className="flex justify-between items-start mb-12">
                <div className="text-gray-400 cursor-pointer hover:text-white transition-colors">
                  &lsaquo; Back
                </div>
                <div className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors cursor-pointer">
                  +
                </div>
              </div>
              
              <div className="text-center mb-12">
                <div className="text-8xl font-light leading-none mb-2">
                  {format(selectedDate, 'd')}
                </div>
                <div className="text-xl font-medium tracking-widest text-gray-300 uppercase">
                  {format(selectedDate, 'EEEE')}
                </div>
              </div>

              <div className="space-y-6">
                {selectedDateEvents.length > 0 ? (
                  selectedDateEvents.map((evt, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="mt-1.5 w-3 h-3 rounded-full border-2 border-green-500 shrink-0"></div>
                      <div>
                        <div className="font-medium text-lg leading-tight text-gray-100">{evt.title}</div>
                        <div className="text-sm text-gray-400 mt-1">{evt.time}</div>
                        <div className="text-sm text-gray-400 mt-2 italic">{evt.description}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center italic mt-10">
                    No events scheduled on this day.
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Calendar Grid (Light Theme) */}
            <div className="w-full md:w-[60%] bg-white p-8 md:p-12 flex flex-col justify-center relative">
              <div className="absolute top-8 right-8 text-xl text-gray-400 flex items-center gap-2">
                <FaCalendarAlt />
                {format(currentMonthDate, 'yyyy')}
              </div>
              
              <div className="mt-8">
                <Calendar 
                  onChange={handleDateChange} 
                  value={selectedDate}
                  onActiveStartDateChange={handleActiveStartDateChange}
                  className="custom-calendar"
                  navigationLabel={({ date, label, locale, view }) => format(date, 'MMMM')}
                  next2Label={null}
                  prev2Label={null}
                  tileClassName={({ date, view }) => {
                    if (events.find(x => isSameDay(x.date, date))) {
                      return 'has-event';
                    }
                    return null;
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Right Sidebar: Upcoming Events this Month */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-80 bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-iskcon-orange text-white p-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                Events in {format(currentMonthDate, 'MMMM')}
              </h2>
            </div>
            <div className="p-6 max-h-[500px] overflow-y-auto space-y-6">
              {currentMonthEvents.length > 0 ? (
                currentMonthEvents.map((evt, idx) => (
                  <div key={idx} className="border-l-4 border-iskcon-orange pl-4 hover:bg-orange-50 p-2 -ml-2 rounded-r-lg transition-colors cursor-pointer" onClick={() => setSelectedDate(evt.date)}>
                    <div className="text-xs text-iskcon-orange font-bold uppercase tracking-wider mb-1">
                      {format(evt.date, 'MMM d, EEEE')}
                    </div>
                    <div className="font-bold text-gray-800">{evt.title}</div>
                    <div className="text-sm text-gray-500 mt-1">{evt.time}</div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-center py-8">
                  No major events this month.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
