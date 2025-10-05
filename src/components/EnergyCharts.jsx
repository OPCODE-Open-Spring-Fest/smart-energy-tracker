import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
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
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value} {entry.name === 'consumption' ? 'W' : '%'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Real-time Energy Consumption */}
      <div className="chart-container p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Real-time Energy Overview</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Current Consumption</p>
            <p className="text-2xl font-bold text-blue-800">{state.energyConsumption} W</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Battery Level</p>
            <p className="text-2xl font-bold text-green-800">{state.batteryLevel}%</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-orange-600">Temperature</p>
            <p className="text-2xl font-bold text-orange-800">{state.temperature}°C</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={energyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area type="monotone" dataKey="consumption" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Consumption (W)" />
            <Area type="monotone" dataKey="battery" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Battery (%)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly Consumption */}
      <div className="chart-container p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Weekly Energy Summary</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="consumption" fill="#3b82f6" name="Total Consumption (W)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="savings" fill="#10b981" name="Energy Savings (W)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Battery Health Trend */}
      <div className="chart-container p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Battery Health Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={energyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" stroke="#666" />
            <YAxis stroke="#666" domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="battery" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981' }} name="Battery Level (%)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EnergyCharts;