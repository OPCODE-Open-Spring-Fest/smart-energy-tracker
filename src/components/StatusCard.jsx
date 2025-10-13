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
    color = state.batteryLevel > 20 ? 'status-online' : 'status-offline';
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-xl p-6 text-white shadow-lg cursor-pointer transition-all duration-300 ${color} status-card`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          <p className="text-sm opacity-80 mt-1">{subtitle}</p>
        </div>
        <div className="text-3xl">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatusCard;