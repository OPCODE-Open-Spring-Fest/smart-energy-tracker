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

  if (title === 'Inverter Status') {
    value = `${getStatusIcon()} ${state.inverterStatus.toUpperCase()}`;
    color = getStatusColor();
  }

  if (title === 'Power Supply') {
    value = state.powerCut ? '🔴 Power Cut' : '🟢 Grid Active';
    subtitle = state.powerCut ? 'Running on inverter' : 'Grid power stable';
    color = state.powerCut ? 'status-offline' : 'status-online';
  }

  if (title === 'Battery Level') {
    value = `${state.batteryLevel}%`;
    subtitle = state.batteryLevel > 20 ? 'Adequate charge' : 'Low battery';
    color =
      state.batteryLevel > 50
        ? 'status-online'
        : state.batteryLevel > 20
        ? 'status-standby'
        : 'status-offline';
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-xl p-6 text-white shadow-lg cursor-pointer transition-all duration-300 ${color}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          {title === 'Battery Level' ? (
            <div className="mt-2 w-32 h-6 border-2 border-white rounded-md overflow-hidden bg-gray-800 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${state.batteryLevel}%` }}
                transition={{ duration: 1 }}
                className={`h-full ${
                  state.batteryLevel > 50
                    ? 'bg-green-500'
                    : state.batteryLevel > 20
                    ? 'bg-yellow-400'
                    : 'bg-red-500'
                }`}
              />
              <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm font-bold">
                {state.batteryLevel}%
              </span>
            </div>
          ) : (
            <h3 className="text-2xl font-bold mt-2">{value}</h3>
          )}
          <p className="text-sm opacity-80 mt-1">{subtitle}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </motion.div>
  );
};

export default StatusCard;