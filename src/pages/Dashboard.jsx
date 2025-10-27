import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import StatusCard from "../components/StatusCard";
import EventTimeline from "../components/EventTimeline";
import EnergyCharts from "../components/EnergyCharts";
import ManualSwitch from "../components/ManualSwitch";
import NotificationList from "../components/NotificationList";
import AdvancedStatusCard from "../components/AdvancedStatusCard";
import QuickStatsWidget, {
  createEnergyStats,
} from "../components/QuickStatsWidget";
import DashboardWidget, {
  WidgetContainer,
} from "../components/DashboardWidget";
import {
  calculateBackupTime,
  calculateEfficiencyRating,
} from "../utils/format";

const Dashboard = () => {
  const { state, dispatch } = useApp();

  // Mock events data
  const mockEvents = [
    {
      id: 1,
      type: "power_cut",
      title: "Power Cut Detected",
      description: "Grid power interrupted, running on inverter",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: 2,
      type: "inverter_on",
      title: "Inverter Activated",
      description: "Inverter started automatically due to power cut",
      timestamp: new Date(Date.now() - 280000),
    },
    {
      id: 3,
      type: "battery_low",
      title: "Battery Level Low",
      description: "Battery level dropped below 30%",
      timestamp: new Date(Date.now() - 180000),
    },
    {
      id: 4,
      type: "normal",
      title: "Grid Power Restored",
      description: "Grid power is back, inverter in standby",
      timestamp: new Date(Date.now() - 120000),
    },
  ];

  // Mock data for new components
  const mockStats = createEnergyStats({
    consumption: "320W",
    batteryLevel: state.batteryLevel || 75,
    efficiency: 92,
    uptime: "18h",
    consumptionChange: 8,
    batteryChange: -2,
    efficiencyChange: 5,
    uptimeChange: 12,
    consumptionTrend: "up",
    batteryTrend: "down",
    efficiencyTrend: "up",
    uptimeTrend: "up",
  });

  // Calculate utility functions data
  const currentConsumption = 320; // watts
  const batteryLevel = state.batteryLevel || 75;
  const expectedConsumption = 280; // baseline consumption
  const batteryCapacity = 100; // Ah capacity

  const backupTime =
    calculateBackupTime(batteryLevel, currentConsumption, batteryCapacity) ||
    "5.2 hours";
  const efficiencyData = calculateEfficiencyRating(
    currentConsumption,
    expectedConsumption,
    85
  );

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({
        type: "UPDATE_TIME",
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              InvertorGuard Dashboard
            </h1>
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
        <StatusCard
          title="Inverter Status"
          value="Online"
          subtitle="All systems normal"
          icon="🔌"
          color="status-online"
        />
        <StatusCard
          title="Power Supply"
          value="Grid Active"
          subtitle="Stable power supply"
          icon="⚡"
          color="status-online"
        />
        <StatusCard
          title="Battery Level"
          value="75%"
          subtitle="Adequate charge"
          icon="🔋"
          color="status-online"
        />
        <StatusCard
          title="Temperature"
          value="45°C"
          subtitle="Normal temperature"
          icon="🌡️"
          color="status-online"
        />
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

      {/* Utility Functions Display Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
        <StatusCard
          title="Estimated Backup Time"
          value={backupTime}
          subtitle={`At ${currentConsumption}W consumption`}
          icon="⏱️"
          color="status-online"
        />
        <StatusCard
          title="System Efficiency"
          value={`${efficiencyData.percentage}%`}
          subtitle={`Rating: ${efficiencyData.rating}`}
          icon="⚡"
          color={
            efficiencyData.color === "green"
              ? "status-online"
              : efficiencyData.color === "yellow"
              ? "status-warning"
              : "status-error"
          }
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
        <div className="space-y-6 sm:space-y-8">
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
        </div>
      </main>

      {/* New Enhanced Components Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12"
      >
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Enhanced Dashboard Widgets
          </h2>
          <p className="text-gray-600 mt-1">
            Advanced monitoring and control components
          </p>
        </div>

        {/* Advanced Status Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <AdvancedStatusCard
            title="Battery Status"
            value={`${state.batteryLevel || 75}%`}
            subtitle="Lithium-ion battery"
            icon="🔋"
            color={state.batteryLevel > 30 ? "status-online" : "status-warning"}
            trend={{ direction: "down", value: "2%", period: "1h" }}
            progress={{
              current: state.batteryLevel || 75,
              max: 100,
              showBar: true,
            }}
            chart={{ type: "donut", data: [state.batteryLevel || 75, 100] }}
            actions={[
              {
                label: "Battery Details",
                onClick: () => console.log("Battery details"),
              },
              {
                label: "Health Check",
                onClick: () => console.log("Health check"),
              },
            ]}
            showRefresh={true}
            onRefresh={() => console.log("Refreshing battery status")}
          />

          <AdvancedStatusCard
            title="Power Consumption"
            value="320W"
            subtitle="Real-time usage"
            icon="⚡"
            color="status-online"
            trend={{ direction: "up", value: "8%", period: "24h" }}
            chart={{ type: "line", data: [280, 300, 320, 310, 340, 320, 325] }}
            actions={[
              {
                label: "Usage History",
                onClick: () => console.log("Usage history"),
              },
              { label: "Set Limits", onClick: () => console.log("Set limits") },
            ]}
          />

          <AdvancedStatusCard
            title="System Efficiency"
            value="92%"
            subtitle="Performance metric"
            icon="📊"
            color="status-online"
            trend={{ direction: "up", value: "5%", period: "7d" }}
            progress={{ current: 92, max: 100, showBar: true }}
            chart={{ type: "donut", data: [92, 100] }}
            size="medium"
          />
        </div>

        {/* Widget Container with Dashboard Widgets */}
        <WidgetContainer
          columns="repeat(auto-fit, minmax(350px, 1fr))"
          className="mb-8"
        >
          <DashboardWidget
            title="Quick Performance Stats"
            subtitle="Key metrics at a glance"
            icon="📈"
            size="medium"
            collapsible={true}
            expandable={true}
            theme="default"
          >
            <QuickStatsWidget
              title=""
              stats={mockStats}
              layout="grid"
              showComparison={true}
              showTrends={true}
              comparisonPeriod="vs yesterday"
            />
          </DashboardWidget>
        </WidgetContainer>

        {/* New Utility Functions Widget */}
        <WidgetContainer
          columns="repeat(auto-fit, minmax(350px, 1fr))"
          className="mb-8"
        >
          <DashboardWidget
            title="Smart Analytics"
            subtitle="AI-powered insights and calculations"
            icon="🧠"
            size="medium"
            collapsible={true}
            theme="default"
          >
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">
                  ⏱️ Backup Time Analysis
                </h4>
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {backupTime}
                </div>
                <p className="text-sm text-gray-600">
                  Based on current consumption of {currentConsumption}W and
                  battery level of {batteryLevel}%
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  Battery Capacity: {batteryCapacity}Ah | Remaining:{" "}
                  {Math.round((batteryLevel / 100) * batteryCapacity)}Ah
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2">
                  ⚡ Efficiency Rating
                </h4>
                <div className="flex items-center space-x-2 mb-1">
                  <div className="text-2xl font-bold text-green-600">
                    {efficiencyData.percentage}%
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      efficiencyData.color === "green"
                        ? "bg-green-100 text-green-800"
                        : efficiencyData.color === "yellow"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {efficiencyData.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Current: {currentConsumption}W | Expected:{" "}
                  {expectedConsumption}W
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  Consumption efficiency + Battery performance analysis
                </div>
              </div>
            </div>
          </DashboardWidget>
        </WidgetContainer>

        {/* Compact Stats Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <QuickStatsWidget
            title="System Overview"
            stats={mockStats}
            layout="compact"
            theme="colorful"
            showComparison={true}
            comparisonPeriod="vs last hour"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
