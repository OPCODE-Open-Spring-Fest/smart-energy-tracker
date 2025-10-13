import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useApp } from './AppContext';
import { useNotification } from './NotificationContext';

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { dispatch } = useApp();
  const { addNotification } = useNotification();

  useEffect(() => {
    // Connect to mock server - in production, replace with actual server URL
    const newSocket = io('http://localhost:3001', {
      transports: ['websocket'],
    });

    newSocket.on('connection', () => {
      setIsConnected(true);
      addNotification({
        type: 'success',
        message: 'Connected to real-time server',
        timestamp: new Date(),
      });
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      addNotification({
        type: 'error',
        message: 'Disconnected from server',
        timestamp: new Date(),
      });
    });

    newSocket.on('inverterStatus', (data) => {
      dispatch({ type: 'UPDATE_INVERTER_STATUS', payload: data.status });
    });

    newSocket.on('powerStatus', (data) => {
      dispatch({ type: 'UPDATE_POWER_STATUS', payload: data.powerCut });
      if (data.powerCut) {
        addNotification({
          type: 'warning',
          message: 'Power cut detected!',
          timestamp: new Date(),
        });
      }
    });

    newSocket.on('batteryUpdate', (data) => {
      dispatch({ type: 'UPDATE_BATTERY_LEVEL', payload: data.level });
    });

    newSocket.on('energyUpdate', (data) => {
      dispatch({ type: 'UPDATE_ENERGY_DATA', payload: data.consumption });
    });

    newSocket.on('sensorData', (data) => {
      dispatch({ type: 'UPDATE_SENSOR_DATA', payload: data });
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [dispatch, addNotification]);

  const value = {
    socket,
    isConnected,
    sendCommand: (command, data) => {
      if (socket && isConnected) {
        socket.emit(command, data);
      }
    },
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}