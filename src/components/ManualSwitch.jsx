import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useSocket } from '../context/SocketContext';
import { useNotification } from '../context/NotificationContext';

const ManualSwitch = () => {
  const { state, dispatch } = useApp();
  const { sendCommand } = useSocket();
  const { addNotification } = useNotification();

  const handleToggle = () => {
    const newMode = !state.isManualMode;
    dispatch({ type: 'TOGGLE_MANUAL_MODE' });
    
    if (newMode) {
      sendCommand('manual_control', { enabled: true });
      addNotification({
        type: 'info',
        message: 'Manual control enabled',
        timestamp: new Date(),
      });
    } else {
      sendCommand('manual_control', { enabled: false });
      addNotification({
        type: 'info',
        message: 'Automatic mode enabled',
        timestamp: new Date(),
      });
    }
  };

  const handleInverterControl = (action) => {
    if (!state.isManualMode) {
      addNotification({
        type: 'warning',
        message: 'Enable manual mode first',
        timestamp: new Date(),
      });
      return;
    }

    sendCommand('inverter_control', { action });
    addNotification({
      type: 'info',
      message: `Inverter ${action === 'turn_on' ? 'started' : 'stopped'}`,
      timestamp: new Date(),
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Manual Control</h3>
      
      {/* Mode Toggle */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
        <div className="flex-1">
          <p className="font-semibold text-gray-800 text-sm sm:text-base">Control Mode</p>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {state.isManualMode ? 'Manual Control Active' : 'Automatic Mode Active'}
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleToggle}
          className={`relative w-14 h-7 sm:w-16 sm:h-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            state.isManualMode ? 'bg-blue-600' : 'bg-gray-300'
          }`}
          aria-label={`Switch to ${state.isManualMode ? 'automatic' : 'manual'} mode`}
          aria-pressed={state.isManualMode}
        >
          <motion.div
            className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full absolute top-1 shadow-md"
            animate={{ left: state.isManualMode ? '1.75rem' : '0.25rem' }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </motion.button>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <motion.button
          whileHover={{ scale: state.isManualMode ? 1.05 : 1 }}
          whileTap={{ scale: state.isManualMode ? 0.95 : 1 }}
          onClick={() => handleInverterControl('turn_on')}
          disabled={!state.isManualMode}
          className={`p-3 sm:p-4 rounded-lg font-semibold text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            state.isManualMode
              ? 'bg-green-600 hover:bg-green-700 cursor-pointer focus:ring-green-500'
              : 'bg-gray-400 cursor-not-allowed opacity-60'
          }`}
          aria-label="Turn on inverter"
          aria-disabled={!state.isManualMode}
        >
          <div className="text-center">
            <div className="text-xl sm:text-2xl mb-1 sm:mb-2" aria-hidden="true">🔌</div>
            <div className="text-xs sm:text-sm">Turn On</div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: state.isManualMode ? 1.05 : 1 }}
          whileTap={{ scale: state.isManualMode ? 0.95 : 1 }}
          onClick={() => handleInverterControl('turn_off')}
          disabled={!state.isManualMode}
          className={`p-3 sm:p-4 rounded-lg font-semibold text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            state.isManualMode
              ? 'bg-red-600 hover:bg-red-700 cursor-pointer focus:ring-red-500'
              : 'bg-gray-400 cursor-not-allowed opacity-60'
          }`}
          aria-label="Turn off inverter"
          aria-disabled={!state.isManualMode}
        >
          <div className="text-center">
            <div className="text-xl sm:text-2xl mb-1 sm:mb-2" aria-hidden="true">🔋</div>
            <div className="text-xs sm:text-sm">Turn Off</div>
          </div>
        </motion.button>
      </div>

      {/* Status Info */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
        <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
          {state.isManualMode 
            ? 'Manual control is active. Use buttons above to control inverter.'
            : 'Automatic mode is active. Inverter is controlled by schedules and sensors.'
          }
        </p>
      </div>
    </div>
  );
};

export default ManualSwitch;