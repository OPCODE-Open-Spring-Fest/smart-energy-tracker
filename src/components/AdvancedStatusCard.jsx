import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, MoreVertical, RefreshCw } from 'lucide-react';

const AdvancedStatusCard = ({
  title,
  value,
  subtitle,
  icon,
  color = 'status-online',
  trend = null, // { direction: 'up'|'down'|'stable', value: '12%', period: '24h' }
  progress = null, // { current: 75, max: 100, showBar: true }
  chart = null, // { type: 'line'|'donut', data: [] }
  actions = [], // [{ label: 'Action', onClick: fn, icon: Component }]
  size = 'medium', // 'small'|'medium'|'large'
  showRefresh = false,
  onRefresh = null,
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    if (onRefresh) {
      setIsLoading(true);
      await onRefresh();
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    switch (trend.direction) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />;
      default: return null;
    }
  };

  const getTrendColor = () => {
    if (!trend) return 'text-gray-500';
    switch (trend.direction) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      case 'stable': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'status-online': return 'border-green-200 bg-green-50 hover:bg-green-100';
      case 'status-offline': return 'border-red-200 bg-red-50 hover:bg-red-100';
      case 'status-standby': return 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100';
      case 'status-warning': return 'border-orange-200 bg-orange-50 hover:bg-orange-100';
      default: return 'border-gray-200 bg-white hover:bg-gray-50';
    }
  };

  const renderMiniChart = () => {
    if (!chart || !chart.data || chart.data.length === 0) return null;

    if (chart.type === 'line') {
      const max = Math.max(...chart.data);
      const min = Math.min(...chart.data);
      const range = max - min || 1;
      
      const points = chart.data.map((value, index) => {
        const x = (index / (chart.data.length - 1)) * 60;
        const y = 20 - ((value - min) / range) * 15;
        return `${x},${y}`;
      }).join(' ');

      return (
        <div className="mt-2">
          <svg width="60" height="20" className="text-current opacity-60">
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              points={points}
            />
          </svg>
        </div>
      );
    }

    if (chart.type === 'donut') {
      const percentage = (chart.data[0] / chart.data[1]) * 100;
      const circumference = 2 * Math.PI * 8;
      const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

      return (
        <div className="mt-2 flex justify-center">
          <svg width="20" height="20" className="transform -rotate-90">
            <circle
              cx="10"
              cy="10"
              r="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.2"
            />
            <circle
              cx="10"
              cy="10"
              r="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
            />
          </svg>
        </div>
      );
    }

    return null;
  };

  const renderProgressBar = () => {
    if (!progress || !progress.showBar) return null;

    const percentage = Math.min((progress.current / progress.max) * 100, 100);
    
    return (
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>{progress.current}</span>
          <span>{progress.max}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="h-2 rounded-full bg-current"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`
        relative rounded-xl border-2 transition-all duration-200 shadow-sm hover:shadow-md
        ${getColorClasses()} ${sizeClasses[size]} ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {icon && <span className="text-2xl">{icon}</span>}
          <div>
            <h3 className="text-sm font-medium text-gray-700">{title}</h3>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          {showRefresh && (
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="p-1 rounded-md hover:bg-white/50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 text-gray-500 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          )}
          
          {actions.length > 0 && (
            <div className="relative group">
              <button className="p-1 rounded-md hover:bg-white/50 transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </button>
              <div className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 min-w-32">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    {action.icon && <action.icon className="w-4 h-4" />}
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Value */}
      <div className="mt-4">
        <div className="flex items-end space-x-2">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          {trend && (
            <div className={`flex items-center space-x-1 text-xs ${getTrendColor()}`}>
              {getTrendIcon()}
              <span>{trend.value}</span>
              <span className="text-gray-400">({trend.period})</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {renderProgressBar()}

      {/* Mini Chart */}
      {renderMiniChart()}

      {/* Loading Overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-white/50 rounded-xl flex items-center justify-center"
        >
          <RefreshCw className="w-5 h-5 animate-spin text-gray-500" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default AdvancedStatusCard;