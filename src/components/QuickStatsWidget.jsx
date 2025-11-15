import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const QuickStatsWidget = ({
  title = "Quick Stats",
  stats = [],
  layout = 'grid', // 'grid'|'list'|'compact'
  showComparison = true,
  showTrends = true,
  comparisonPeriod = "vs last period",
  className = '',
  theme = 'default' // 'default'|'minimal'|'colorful'
}) => {
  const getComparisonIcon = (change) => {
    if (change > 0) return <ArrowUpRight className="w-3 h-3" />;
    if (change < 0) return <ArrowDownLeft className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const getComparisonColor = (change) => {
    if (change > 0) return 'text-green-600 bg-green-50';
    if (change < 0) return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />;
      default: return null;
    }
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'minimal':
        return 'bg-white border border-gray-100';
      case 'colorful':
        return 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200';
      default:
        return 'bg-white border border-gray-200 shadow-sm';
    }
  };

  const renderGridLayout = () => (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              {stat.label}
            </span>
            {stat.icon && <span className="text-lg">{stat.icon}</span>}
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
              {stat.unit && (
                <div className="text-xs text-gray-500">{stat.unit}</div>
              )}
            </div>
            
            {showTrends && stat.trend && (
              <div className="flex items-center space-x-1">
                {getTrendIcon(stat.trend)}
              </div>
            )}
          </div>

          {showComparison && stat.comparison !== undefined && (
            <div className={`
              flex items-center space-x-1 mt-2 px-2 py-1 rounded-md text-xs font-medium
              ${getComparisonColor(stat.comparison)}
            `}>
              {getComparisonIcon(stat.comparison)}
              <span>
                {stat.comparison > 0 ? '+' : ''}{stat.comparison}%
              </span>
              <span className="text-gray-500 ml-1">{comparisonPeriod}</span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );

  const renderListLayout = () => (
    <div className="space-y-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.id || index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            {stat.icon && <span className="text-lg">{stat.icon}</span>}
            <div>
              <div className="text-sm font-medium text-gray-700">{stat.label}</div>
              {stat.unit && (
                <div className="text-xs text-gray-500">{stat.unit}</div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">{stat.value}</div>
              {showComparison && stat.comparison !== undefined && (
                <div className={`
                  flex items-center justify-end space-x-1 text-xs font-medium
                  ${getComparisonColor(stat.comparison).split(' ')[0]}
                `}>
                  {getComparisonIcon(stat.comparison)}
                  <span>{stat.comparison > 0 ? '+' : ''}{stat.comparison}%</span>
                </div>
              )}
            </div>
            
            {showTrends && stat.trend && (
              <div>{getTrendIcon(stat.trend)}</div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderCompactLayout = () => (
    <div className="grid grid-cols-4 gap-2">
      {stats.slice(0, 4).map((stat, index) => (
        <motion.div
          key={stat.id || index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="text-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all"
        >
          {stat.icon && (
            <div className="text-lg mb-1">{stat.icon}</div>
          )}
          <div className="text-lg font-bold text-gray-900">{stat.value}</div>
          <div className="text-xs text-gray-600 truncate">{stat.label}</div>
          
          {showComparison && stat.comparison !== undefined && (
            <div className={`
              flex items-center justify-center space-x-1 mt-1 text-xs font-medium
              ${getComparisonColor(stat.comparison).split(' ')[0]}
            `}>
              {getComparisonIcon(stat.comparison)}
              <span>{stat.comparison > 0 ? '+' : ''}{stat.comparison}%</span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );

  const renderLayout = () => {
    switch (layout) {
      case 'list': return renderListLayout();
      case 'compact': return renderCompactLayout();
      default: return renderGridLayout();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        rounded-xl p-6 transition-all duration-200 hover:shadow-md
        ${getThemeClasses()} ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="text-xs text-gray-500">
          {showComparison && comparisonPeriod}
        </div>
      </div>

      {/* Stats Layout */}
      {renderLayout()}

      {/* Summary Row for Compact Layout */}
      {layout === 'compact' && stats.length > 4 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600">
            +{stats.length - 4} more metrics available
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Predefined stat configurations
export const createEnergyStats = (data) => [
  {
    id: 'consumption',
    label: 'Power Usage',
    value: data.consumption || '0W',
    unit: 'Real-time',
    icon: '⚡',
    comparison: data.consumptionChange || 0,
    trend: data.consumptionTrend || 'stable'
  },
  {
    id: 'battery',
    label: 'Battery',
    value: `${data.batteryLevel || 0}%`,
    unit: 'Charge level',
    icon: '🔋',
    comparison: data.batteryChange || 0,
    trend: data.batteryTrend || 'stable'
  },
  {
    id: 'efficiency',
    label: 'Efficiency',
    value: `${data.efficiency || 0}%`,
    unit: 'System performance',
    icon: '📊',
    comparison: data.efficiencyChange || 0,
    trend: data.efficiencyTrend || 'stable'
  },
  {
    id: 'uptime',
    label: 'Uptime',
    value: data.uptime || '0h',
    unit: 'Today',
    icon: '🕒',
    comparison: data.uptimeChange || 0,
    trend: data.uptimeTrend || 'stable'
  }
];

export default QuickStatsWidget;