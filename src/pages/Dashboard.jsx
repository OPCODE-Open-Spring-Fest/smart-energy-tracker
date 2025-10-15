import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import StatusCard from '../components/StatusCard';
import EventTimeline from '../components/EventTimeline';
import EnergyCharts from '../components/EnergyCharts';
import ManualSwitch from '../components/ManualSwitch';
import NotificationList from '../components/NotificationList';

const Dashboard = () => {
  const { state, dispatch } = useApp();

  // Mock events data
  const mockEvents = [
    { id: 1, type: 'power_cut', title: 'Power Cut Detected', description: 'Grid power interrupted, running on inverter', timestamp: new Date(Date.now() - 300000) },
    { id: 2, type: 'inverter_on', title: 'Inverter Activated', description: 'Inverter started automatically due to power cut', timestamp: new Date(Date.now() - 280000) },
    { id: 3, type: 'battery_low', title: 'Battery Level Low', description: 'Battery level dropped below 30%', timestamp: new Date(Date.now() - 180000) },
    { id: 4, type: 'normal', title: 'Grid Power Restored', description: 'Grid power is back, inverter in standby', timestamp: new Date(Date.now() - 120000) },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({
        type: 'UPDATE_TIME',
        payload: new Date().toLocaleTimeString(),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="mb-6 sm:mb-8"
        role="banner"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">InvertorGuard Dashboard</h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
              Real-time monitoring and control of your power system
            </p>
          </div>
          <div className="mt-3 lg:mt-0">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
              <span aria-label="System status: Online">
                <span aria-hidden="true">🟢</span> System Online
              </span>
              <span aria-hidden="true">•</span>
              <span>Last update: {state.currentTime}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Status Cards Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8"
        role="region"
        aria-label="System status cards"
      >
        <StatusCard title="Inverter Status" value="Online" subtitle="All systems normal" icon="🔌" color="status-online" />
        <StatusCard title="Power Supply" value="Grid Active" subtitle="Stable power supply" icon="⚡" color="status-online" />
        <StatusCard title="Battery Level" value="75%" subtitle="Adequate charge" icon="🔋" color="status-online" />
        <StatusCard title="Temperature" value="45°C" subtitle="Normal temperature" icon="🌡️" color="status-online" />
      </motion.div>

      {/* Energy Usage Card - Separate row for better mobile layout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mb-6 sm:mb-8"
        role="region"
        aria-label="Energy usage information"
      >
        <StatusCard 
          title="Energy Usage" 
          value="320W" 
          subtitle="Moderate consumption" 
          icon="📊" 
          color="status-standby" 
        />
      </motion.div>

      {/* Main Content Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3 }}
            role="region"
            aria-label="Energy charts and analytics"
          >
            <EnergyCharts />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.4 }}
            role="region"
            aria-label="System events timeline"
          >
            <EventTimeline events={mockEvents} />
          </motion.div>
        </div>

        {/* Right Column */}
        <aside className="space-y-6 sm:space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3 }}
            role="region"
            aria-label="Manual control panel"
          >
            <ManualSwitch />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.4 }}
            role="region"
            aria-label="System notifications"
          >
            <NotificationList />
          </motion.div>
        </aside>
      </main>
    </div>
  );
};

export default Dashboard