/* eslint-env node */
/* eslint-disable no-console */

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"]
  }
});

// Store connected clients and their states
const connectedClients = new Map();

// Mock data generators
const generateInverterStatus = () => {
  const statuses = ['online', 'offline', 'standby'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const generateBatteryLevel = () => Math.max(20, Math.min(100, Math.floor(Math.random() * 30) + 70));
const generateEnergyConsumption = () => Math.floor(Math.random() * 500) + 100;
const generateSensorData = () => ({
  temperature: Math.floor(Math.random() * 10) + 28,
  humidity: Math.floor(Math.random() * 20) + 60
});

const initializeClientData = (socketId) => {
  connectedClients.set(socketId, {
    inverterStatus: 'online',
    batteryLevel: 85,
    powerCut: false,
    energyConsumption: 250,
    temperature: 32,
    humidity: 65,
    isManualMode: false
  });
};

io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);

  initializeClientData(socket.id);
  const initialData = connectedClients.get(socket.id);

  socket.emit('inverterStatus', { status: initialData.inverterStatus });
  socket.emit('batteryUpdate', { level: initialData.batteryLevel });
  socket.emit('energyUpdate', { consumption: initialData.energyConsumption });
  socket.emit('sensorData', { temperature: initialData.temperature, humidity: initialData.humidity });
  socket.emit('powerStatus', { powerCut: initialData.powerCut });

  // intervals object to clear later
  const intervals = {};

  intervals.status = setInterval(() => {
    const clientData = connectedClients.get(socket.id);
    if (clientData && !clientData.powerCut) {
      const newStatus = generateInverterStatus();
      clientData.inverterStatus = newStatus;
      socket.emit('inverterStatus', { status: newStatus });
      console.log(`📊 Sent inverter status to ${socket.id}:`, newStatus);
    }
  }, 10000);

  intervals.battery = setInterval(() => {
    const clientData = connectedClients.get(socket.id);
    if (clientData) {
      const newLevel = generateBatteryLevel();
      clientData.batteryLevel = newLevel;
      socket.emit('batteryUpdate', { level: newLevel });
      if (newLevel < 25) {
        socket.emit('notification', {
          type: 'warning',
          message: `Low battery warning: ${newLevel}% remaining`,
          timestamp: new Date()
        });
      }
    }
  }, 15000);

  intervals.energy = setInterval(() => {
    const clientData = connectedClients.get(socket.id);
    if (clientData) {
      const newConsumption = generateEnergyConsumption();
      clientData.energyConsumption = newConsumption;
      socket.emit('energyUpdate', { consumption: newConsumption });
    }
  }, 5000);

  intervals.sensor = setInterval(() => {
    const clientData = connectedClients.get(socket.id);
    if (clientData) {
      const sensorData = generateSensorData();
      clientData.temperature = sensorData.temperature;
      clientData.humidity = sensorData.humidity;
      socket.emit('sensorData', sensorData);

      if (sensorData.temperature > 40) {
        socket.emit('notification', {
          type: 'warning',
          message: `High temperature: ${sensorData.temperature}°C`,
          timestamp: new Date()
        });
      }
    }
  }, 8000);

  const powerCutInterval = setInterval(() => {
    const clientData = connectedClients.get(socket.id);
    if (clientData && Math.random() < 0.03 && !clientData.powerCut) {
      console.log(`⚡ Power cut simulated for ${socket.id}`);
      clientData.powerCut = true;
      clientData.inverterStatus = 'online';

      socket.emit('powerStatus', { powerCut: true });
      socket.emit('inverterStatus', { status: 'online' });
      socket.emit('notification', {
        type: 'warning',
        message: 'Power cut detected! Running on inverter',
        timestamp: new Date()
      });

      setTimeout(() => {
        if (connectedClients.has(socket.id)) {
          clientData.powerCut = false;
          clientData.inverterStatus = 'standby';
          socket.emit('powerStatus', { powerCut: false });
          socket.emit('inverterStatus', { status: 'standby' });
          socket.emit('notification', {
            type: 'success',
            message: 'Grid power restored',
            timestamp: new Date()
          });
          console.log(`⚡ Power restored for ${socket.id}`);
        }
      }, 5000 + Math.random() * 10000);
    }
  }, 20000);

  socket.on('manual_control', (data) => {
    console.log('🎛️ Manual control received:', data);
    const clientData = connectedClients.get(socket.id);
    if (clientData) {
      clientData.isManualMode = !!data.enabled;
      socket.emit('command_ack', { command: 'manual_control', success: true, data: { enabled: clientData.isManualMode } });
      socket.emit('notification', { type: 'info', message: clientData.isManualMode ? 'Manual control enabled' : 'Automatic mode enabled', timestamp: new Date() });
    }
  });

  socket.on('inverter_control', (data) => {
    console.log('🔌 Inverter control received:', data);
    const clientData = connectedClients.get(socket.id);
    if (clientData && clientData.isManualMode) {
      const newStatus = data.action === 'turn_on' ? 'online' : 'standby';
      clientData.inverterStatus = newStatus;
      socket.emit('inverterStatus', { status: newStatus });
      socket.emit('command_ack', { command: 'inverter_control', success: true, data: { action: data.action, status: newStatus } });
      socket.emit('notification', { type: 'success', message: `Inverter ${data.action === 'turn_on' ? 'started' : 'stopped'}`, timestamp: new Date() });
    } else {
      socket.emit('command_ack', { command: 'inverter_control', success: false, error: 'Manual mode not enabled' });
      socket.emit('notification', { type: 'error', message: 'Enable manual mode first', timestamp: new Date() });
    }
  });

  socket.on('get_status', () => {
    const clientData = connectedClients.get(socket.id);
    if (clientData) {
      socket.emit('status_update', {
        inverterStatus: clientData.inverterStatus,
        batteryLevel: clientData.batteryLevel,
        powerCut: clientData.powerCut,
        energyConsumption: clientData.energyConsumption,
        temperature: clientData.temperature,
        humidity: clientData.humidity,
        isManualMode: clientData.isManualMode
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
    Object.values(intervals).forEach(clearInterval);
    clearInterval(powerCutInterval);
    connectedClients.delete(socket.id);
  });

  socket.on('connect_error', (error) => {
    console.error('Connection error for', socket.id, error);
  });

  socket.on('error', (error) => {
    console.error('Socket error for', socket.id, error);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    connectedClients: connectedClients.size,
    uptime: process.uptime()
  });
});

// Server info endpoint
app.get('/info', (req, res) => {
  res.json({
    name: 'InvertorGuard Mock Server',
    version: '1.0.0',
    description: 'Mock WebSocket server for InvertorGuard energy monitoring system',
    endpoints: {
      websocket: '/socket.io/',
      health: '/health'
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 InvertorGuard Mock Socket.IO server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 Server info: http://localhost:${PORT}/info`);
  console.log(`🔌 Connect your React app to: http://localhost:${PORT}`);
  console.log(`👥 Ready for client connections...`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, shutting down...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
