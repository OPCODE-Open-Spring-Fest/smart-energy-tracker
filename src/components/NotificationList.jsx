import React from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { useNotification } from '../context/NotificationContext';
import { formatTime, formatDate } from '../utils/format';

const NotificationList = () => {
  const { notifications, removeNotification, clearNotifications } = useNotification();

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'border-green-200 bg-green-50';
      case 'error': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-orange-200 bg-orange-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Notifications</h3>
        {notifications.length > 0 && (
          <button
            onClick={clearNotifications}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto" aria-live="polite">
        <AnimatePresence>
          {notifications.map((notification, index) => (
            <Motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 border-l-4 rounded-lg ${getNotificationColor(notification.type)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <span className="text-lg mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{notification.message}</p>
                    <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                      <span>{formatTime(notification.timestamp)}</span>
                      <span>•</span>
                      <span>{formatDate(notification.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
                >
                  ✕
                </button>
              </div>
            </Motion.div>
          ))}
        </AnimatePresence>

        {notifications.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">🔔</div>
            <p>No notifications</p>
            <p className="text-sm">All caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationList;