import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const StatusCard = ({ title, value, subtitle, icon, color, onClick }) => {
  const { state } = useApp();

  const getStatusColor = () => {
    switch (state.inverterStatus) {
      case 'online': return 'status-online';
      case 'offline': return 'status-offline';
      case 'standby': return 'status-standby';
      default: return 'status-offline';
    }
  };

  const getStatusIcon = () => {
    switch (state.inverterStatus) {
      case 'online': return '🟢';
      case 'offline': return '🔴';
      case 'standby': return '🟡';
      default: return '🔴';
    }
  };

  const getWarningLevel = () => {
    if (title === 'Battery Level' && state.batteryLevel <= 20) {
      return 'critical';
    }
    if (title === 'Power Supply' && state.powerCut) {
      return 'critical';
    }
    if (title === 'Battery Level' && state.batteryLevel <= 30) {
      return 'warning';
    }
    return 'normal';
  };

  const warningLevel = getWarningLevel();

  if (title === 'Inverter Status') {
    value = `${getStatusIcon()} ${state.inverterStatus.toUpperCase()}`;
    color = getStatusColor();
  }

  if (title === 'Power Supply') {
    value = state.powerCut ? '🔴 Power Cut' : '🟢 Grid Active';
    subtitle = state.powerCut ? 'Running on inverter' : 'Grid power stable';
    color = state.powerCut ? 'status-warning-power-cut' : 'status-online';
  }

  if (title === 'Battery Level') {
    value = `${state.batteryLevel}%`;
    if (state.batteryLevel <= 20) {
      subtitle = 'Critical - Charge immediately';
      color = 'status-warning-battery';
    } else if (state.batteryLevel <= 30) {
      subtitle = 'Low battery warning';
      color = 'status-warning-battery';
    } else {
      subtitle = 'Adequate charge';
      color = 'status-online';
    }
  }

  if (title === 'Temperature') {
    value = `${state.temperature}°C`;
    if (state.temperature > 60) {
      subtitle = 'High temperature warning';
      color = 'status-warning-temperature';
    } else if (state.temperature > 50) {
      subtitle = 'Elevated temperature';
      color = 'status-warning-battery';
    } else {
      subtitle = 'Normal temperature';
      color = 'status-online';
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-xl p-6 text-white shadow-lg cursor-pointer transition-all duration-300 ${color} status-card`}
      className={`rounded-xl p-4 sm:p-6 text-white shadow-lg cursor-pointer transition-all duration-300 interactive ${color}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${title}: ${value}. ${subtitle}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick();
        }
      }}
      style={{
        minHeight: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs sm:text-sm opacity-90 font-medium">{title}</p>

          {title === 'Battery Level' ? (
            <div className="mt-2 w-40 h-6 border-2 border-white rounded-md overflow-hidden bg-gray-800 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${state.batteryLevel}%` }}
                transition={{ duration: 1 }}
                className={`h-full ${
                  state.batteryLevel > 75
                    ? 'bg-green-500'
                    : state.batteryLevel > 40
                    ? 'bg-yellow-400'
                    : 'bg-red-500 animate-pulse'
                }`}
              />
              <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm font-bold">
                {state.batteryLevel}%
              </span>
            </div>
          ) : (
            <h3 className="text-lg sm:text-2xl font-bold mt-1 sm:mt-2 leading-tight">{value}</h3>
          )}
          <p className="text-xs sm:text-sm opacity-80 mt-1 leading-relaxed">{subtitle}</p>
        </div>
        <div className="text-2xl sm:text-3xl ml-3 flex-shrink-0">{icon}</div>
      </div>
      
      {/* Warning indicator */}
      {warningLevel !== 'normal' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-3 flex items-center space-x-2"
        >
          <div
            className={`w-2 h-2 rounded-full ${
              warningLevel === 'critical' ? 'bg-red-300 animate-pulse' : 'bg-yellow-300'
            }`}
          ></div>
          <span className="text-xs opacity-90">
            {warningLevel === 'critical' ? 'Critical Alert' : 'Warning'}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StatusCard;