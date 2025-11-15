import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { formatTime, formatDate } from '../utils/format';
import { useApp } from '../context/AppContext';

const Logs = () => {
  const { state, dispatch } = useApp();
  const [filter, setFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  // Real-time logs from state
  const logs = state.logs || [];

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesFilter = filter === 'all' || log.type === filter;
      const matchesSource = sourceFilter === 'all' || log.source === sourceFilter;
      const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSource && matchesSearch;
    });
  }, [logs, filter, sourceFilter, searchTerm]);

  const clearLogs = useCallback(() => {
    dispatch({ type: 'CLEAR_LOGS' });
  }, [dispatch]);

  const exportLogs = useCallback(() => {
    const logsData = filteredLogs.map(log => ({
      timestamp: log.timestamp,
      type: log.type,
      source: log.source,
      message: log.message
    }));
    
    const dataStr = JSON.stringify(logsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `system-logs-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [filteredLogs]);

  const getLogColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getLogIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📝';
    }
  };

  const getSeverityBadge = (type) => {
    switch (type) {
      case 'error': return 'HIGH';
      case 'warning': return 'MED';
      case 'success': return 'LOW';
      case 'info': return 'LOW';
      default: return 'LOW';
    }
  };

  const getSeverityColor = (type) => {
    switch (type) {
      case 'error': return 'bg-red-600 text-white';
      case 'warning': return 'bg-orange-500 text-white';
      default: return 'bg-green-500 text-white';
    }
  };

  const uniqueSources = [...new Set(logs.map(log => log.source))];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Real-Time System Logs</h1>
            <p className="text-gray-600 mt-2">Live monitoring of system events and activities</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span>📊 Total Logs: {logs.length}</span>
              <span>🔍 Filtered: {filteredLogs.length}</span>
              <span className={`flex items-center space-x-1 ${isAutoScroll ? 'text-green-600' : 'text-gray-500'}`}>
                <span>🔄</span>
                <span>Auto-scroll: {isAutoScroll ? 'ON' : 'OFF'}</span>
              </span>
            </div>
          </div>
          <div className="mt-4 lg:mt-0 flex space-x-2">
            <button
              onClick={() => setIsAutoScroll(!isAutoScroll)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isAutoScroll 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isAutoScroll ? '⏸️ Pause' : '▶️ Resume'}
            </button>
            <button
              onClick={exportLogs}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              📥 Export
            </button>
            <button
              onClick={clearLogs}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              🗑️ Clear
            </button>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Filters and Search */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <div className="space-y-4">
          {/* Log Type Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
            <div className="flex flex-wrap gap-2">
              {['all', 'info', 'success', 'warning', 'error'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                    filter === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {type === 'all' ? '🔄 All' : `${getLogIcon(type)} ${type}`}
                  {type !== 'all' && (
                    <span className="ml-2 bg-white/20 px-2 py-0.5 rounded text-xs">
                      {logs.filter(l => l.type === type).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Source Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Source</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSourceFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  sourceFilter === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🔄 All Sources
              </button>
              {uniqueSources.map((source) => (
                <button
                  key={source}
                  onClick={() => setSourceFilter(source)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                    sourceFilter === source
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {source}
                  <span className="ml-2 bg-white/20 px-2 py-0.5 rounded text-xs">
                    {logs.filter(l => l.source === source).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Logs</label>
            <input
              type="text"
              placeholder="Search log messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* Real-Time Logs List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Live Log Stream</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live</span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto max-h-96 overflow-y-auto" style={{ scrollBehavior: isAutoScroll ? 'smooth' : 'auto' }}>
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log, index) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(log.type)}`}>
                      {getSeverityBadge(log.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`badge inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getLogColor(log.type)} ${log.type}`}>
                      <span className="mr-2">{getLogIcon(log.type)}</span>
                      {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 max-w-md truncate" title={log.message}>
                      {log.message}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
                      {log.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatTime(log.timestamp)}</div>
                    <div className="text-sm text-gray-500">{formatDate(log.timestamp)}</div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📋</div>
            <p className="text-gray-500 text-lg">
              {logs.length === 0 
                ? 'No logs yet - start the socket server to see real-time events' 
                : 'No logs match your filters'
              }
            </p>
            <p className="text-gray-400 text-sm mt-1">
              {logs.length === 0 
                ? 'Run: node server/mock-socket-server.js'
                : 'Try changing your filters or search term'
              }
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Logs;