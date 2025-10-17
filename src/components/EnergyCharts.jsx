import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useApp } from '../context/AppContext';

const EnergyCharts = () => {
  const { state } = useApp();

  // Mock data for charts
  const energyData = [
    { time: '00:00', consumption: 120, battery: 85 },
    { time: '04:00', consumption: 80, battery: 82 },
    { time: '08:00', consumption: 350, battery: 75 },
    { time: '12:00', consumption: 420, battery: 65 },
    { time: '16:00', consumption: 380, battery: 58 },
    { time: '20:00', consumption: 280, battery: 52 },
    { time: '23:59', consumption: 150, battery: 48 },
  ];

  const weeklyData = [
    { day: 'Mon', consumption: 2450, savings: 120 },
    { day: 'Tue', consumption: 2380, savings: 135 },
    { day: 'Wed', consumption: 2620, savings: 110 },
    { day: 'Thu', consumption: 2510, savings: 125 },
    { day: 'Fri', consumption: 2750, savings: 95 },
    { day: 'Sat', consumption: 2980, savings: 80 },
    { day: 'Sun', consumption: 3120, savings: 65 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg"
        >
          <p className="font-semibold text-gray-800 text-sm">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value} {entry.name === 'consumption' ? 'W' : '%'}
            </p>
          ))}
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4 sm:space-y-6">

      {/* Real-time Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="chart-container p-4 sm:p-6"
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Real-time Energy Chart</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-100"
          >
            <p className="text-xs sm:text-sm text-blue-600 font-medium">Current Consumption</p>
            <motion.p
              key={state.energyConsumption}
              initial={{ scale: 1.1, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-xl sm:text-2xl font-bold text-blue-800"
            >
              {state.energyConsumption} W
            </motion.p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-100"
          >
            <p className="text-xs sm:text-sm text-green-600 font-medium">Battery Level</p>
            <motion.p
              key={state.batteryLevel}
              initial={{ scale: 1.1, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-xl sm:text-2xl font-bold text-green-800"
            >
              {state.batteryLevel}%
            </motion.p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-100 sm:col-span-2 lg:col-span-1"
          >
            <p className="text-xs sm:text-sm text-orange-600 font-medium">Temperature</p>
            <motion.p
              key={state.temperature}
              initial={{ scale: 1.1, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-xl sm:text-2xl font-bold text-orange-800"
            >
              {state.temperature}°C
            </motion.p>
          </motion.div>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={energyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="consumption"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.3}
              name="Consumption (W)"
            />
            <Area
              type="monotone"
              dataKey="battery"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.3}
              name="Battery (%)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Weekly Consumption */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="chart-container p-4 sm:p-6"
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Weekly Energy Summary</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="consumption" fill="#3b82f6" name="Total Consumption (W)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="savings" fill="#10b981" name="Energy Savings (W)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Battery Health Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="chart-container p-4 sm:p-6"
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Battery Health Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={energyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="battery"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981' }}
              name="Battery Level (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default EnergyCharts;