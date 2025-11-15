export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const formatPercentage = (value) => {
  return `${Math.round(value)}%`;
};

export const formatTemperature = (celsius) => {
  return `${celsius}°C`;
};

export const formatEnergy = (watts) => {
  if (watts >= 1000) {
    return `${(watts / 1000).toFixed(1)} kW`;
  }
  return `${watts} W`;
};

// Calculate estimated backup time based on battery level and current consumption
export const calculateBackupTime = (batteryLevel, currentConsumption, batteryCapacity = 100) => {
  if (currentConsumption <= 0) return 'Indefinite';
  
  const remainingCapacity = (batteryLevel / 100) * batteryCapacity;
  const hoursRemaining = remainingCapacity / (currentConsumption / 1000); // Convert watts to kW
  
  if (hoursRemaining < 1) {
    const minutes = Math.round(hoursRemaining * 60);
    return `${minutes} minutes`;
  } else if (hoursRemaining < 24) {
    return `${hoursRemaining.toFixed(1)} hours`;
  } else {
    const days = Math.floor(hoursRemaining / 24);
    const hours = Math.round(hoursRemaining % 24);
    return `${days}d ${hours}h`;
  }
};

// Calculate energy efficiency rating based on consumption patterns
export const calculateEfficiencyRating = (actualConsumption, expectedConsumption, batteryEfficiency = 85) => {
  const consumptionEfficiency = Math.max(0, 100 - ((actualConsumption - expectedConsumption) / expectedConsumption * 100));
  const overallEfficiency = (consumptionEfficiency * 0.7) + (batteryEfficiency * 0.3);
  
  let rating;
  if (overallEfficiency >= 90) rating = 'Excellent';
  else if (overallEfficiency >= 80) rating = 'Good';
  else if (overallEfficiency >= 70) rating = 'Fair';
  else if (overallEfficiency >= 60) rating = 'Poor';
  else rating = 'Critical';
  
  return {
    percentage: Math.round(overallEfficiency),
    rating,
    color: overallEfficiency >= 80 ? 'green' : overallEfficiency >= 60 ? 'yellow' : 'red'
  };
};