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
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      addNotification({
        type: 'success',
        message: 'Connected to real-time server',
        timestamp: new Date(),
      });
      dispatch({ 
        type: 'ADD_LOG', 
        payload: { 
          type: 'success', 
          message: 'Connected to real-time server', 
          source: 'system' 
        } 
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

    newSocket.on('connect_error', (err) => {
      setIsConnected(false);
      addNotification({
        type: 'error',
        message: `Connection error: ${err.message}`,
        timestamp: new Date(),
      });
    });

    newSocket.on('reconnect_attempt', (attempt) => {
      addNotification({
        type: 'info',
        message: `Reconnecting... (attempt ${attempt})`,
        timestamp: new Date(),
      });
    });

    newSocket.on('reconnect', (attempt) => {
      setIsConnected(true);
      addNotification({
        type: 'success',
        message: `Reconnected after ${attempt} attempt(s)`,
        timestamp: new Date(),
      });
    });

    newSocket.on('reconnect_failed', () => {
      setIsConnected(false);
      addNotification({
        type: 'error',
        message: 'Reconnection failed',
        timestamp: new Date(),
      });
    });

    newSocket.on('inverterStatus', (data) => {
      dispatch({ type: 'UPDATE_INVERTER_STATUS', payload: data.status });
      dispatch({ 
        type: 'ADD_LOG', 
        payload: { 
          type: 'info', 
          message: `Inverter status changed to ${data.status}`, 
          source: 'inverter' 
        } 
      });
    });

    newSocket.on('powerStatus', (data) => {
      dispatch({ type: 'UPDATE_POWER_STATUS', payload: data.powerCut });
      const logType = data.powerCut ? 'warning' : 'success';
      const logMessage = data.powerCut ? 'Power cut detected! Running on inverter' : 'Grid power restored';
      dispatch({ 
        type: 'ADD_LOG', 
        payload: { 
          type: logType, 
          message: logMessage, 
          source: 'power' 
        } 
      });
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
      let logType = 'info';
      let logMessage = `Battery level updated to ${data.level}%`;
      
      if (data.level <= 20) {
        logType = 'error';
        logMessage = `Critical battery level: ${data.level}%`;
      } else if (data.level <= 30) {
        logType = 'warning';
        logMessage = `Low battery warning: ${data.level}%`;
      }
      
      dispatch({ 
        type: 'ADD_LOG', 
        payload: { 
          type: logType, 
          message: logMessage, 
          source: 'battery' 
        } 
      });
    });

    newSocket.on('energyUpdate', (data) => {
      dispatch({ type: 'UPDATE_ENERGY_DATA', payload: data.consumption });
      dispatch({ 
        type: 'ADD_LOG', 
        payload: { 
          type: 'info', 
          message: `Energy consumption: ${data.consumption}W`, 
          source: 'energy' 
        } 
      });
    });

    newSocket.on('sensorData', (data) => {
      dispatch({ type: 'UPDATE_SENSOR_DATA', payload: data });
      let logType = 'info';
      let logMessage = `Temperature: ${data.temperature}°C, Humidity: ${data.humidity}%`;
      
      if (data.temperature > 60) {
        logType = 'error';
        logMessage = `Critical temperature warning: ${data.temperature}°C`;
      } else if (data.temperature > 50) {
        logType = 'warning';
        logMessage = `High temperature: ${data.temperature}°C`;
      }
      
      dispatch({ 
        type: 'ADD_LOG', 
        payload: { 
          type: logType, 
          message: logMessage, 
          source: 'sensor' 
        } 
      });
    });

    // Listen for direct log events from server
    newSocket.on('systemLog', (logData) => {
      dispatch({ type: 'ADD_LOG', payload: logData });
    });

    // Surface server-side notifications and command acknowledgements
    newSocket.on('notification', (notification) => {
      addNotification(notification);
    });

    newSocket.on('command_ack', (ack) => {
      addNotification({
        type: ack.success ? 'success' : 'error',
        message: ack.success ? `Command ${ack.command} succeeded` : `Command ${ack.command} failed: ${ack.error || 'unknown error'}`,
        timestamp: new Date(),
      });
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [dispatch]);

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

// eslint-disable-next-line react-refresh/only-export-components
export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}