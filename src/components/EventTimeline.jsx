import React from 'react';
import { motion } from 'framer-motion';
import { formatTime, formatDate } from '../utils/format';

const EventTimeline = ({ events }) => {
  const getEventColor = (type) => {
    switch (type) {
      case 'power_cut': return 'bg-red-500';
      case 'inverter_on': return 'bg-green-500';
      case 'inverter_off': return 'bg-gray-500';
      case 'battery_low': return 'bg-orange-500';
      case 'normal': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'power_cut': return '⚡';
      case 'inverter_on': return '🔌';
      case 'inverter_off': return '🔋';
      case 'battery_low': return '🪫';
      case 'normal': return '✅';
      default: return '📝';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Recent Events</h3>
      <div className="space-y-3 sm:space-y-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            whileHover={{ scale: 1.02 }}
            className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-200"
          >
            <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${getEventColor(event.type)}`}></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <p className="font-semibold text-gray-800 text-sm sm:text-base leading-tight">{event.title}</p>
                <span className="text-xl sm:text-2xl ml-2 flex-shrink-0" aria-hidden="true">{getEventIcon(event.type)}</span>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm mt-1 leading-relaxed">{event.description}</p>
              <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                <span>{formatTime(event.timestamp)}</span>
                <span aria-hidden="true">•</span>
                <span>{formatDate(event.timestamp)}</span>
              </div>
            </div>
          </motion.div>
        ))}
        {events.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center text-gray-500 py-8"
          >
            <div className="text-4xl mb-2" aria-hidden="true">📋</div>
            <p className="text-sm sm:text-base">No events to display</p>
            <p className="text-xs text-gray-400 mt-1">System events will appear here</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EventTimeline;