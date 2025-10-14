import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  inverterStatus: 'offline',
  powerCut: false,
  batteryLevel: 75,
  energyConsumption: 0,
  temperature: 32,
  humidity: 65,
  schedules: [],
  isManualMode: false,
  currentTime: new Date().toLocaleTimeString(),
  theme: 'light',
};

function appReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_INVERTER_STATUS':
      return { ...state, inverterStatus: action.payload };
    case 'UPDATE_POWER_STATUS':
      return { ...state, powerCut: action.payload };
    case 'UPDATE_BATTERY_LEVEL':
      return { ...state, batteryLevel: action.payload };
    case 'UPDATE_ENERGY_DATA':
      return { ...state, energyConsumption: action.payload };
    case 'UPDATE_SENSOR_DATA':
      return { 
        ...state, 
        temperature: action.payload.temperature,
        humidity: action.payload.humidity
      };
    case 'ADD_SCHEDULE':
      return { 
        ...state, 
        schedules: [...state.schedules, action.payload]
      };
    case 'REMOVE_SCHEDULE':
      return { 
        ...state, 
        schedules: state.schedules.filter(s => s.id !== action.payload)
      };
    case 'TOGGLE_MANUAL_MODE':
      return { ...state, isManualMode: !state.isManualMode };
    case 'UPDATE_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  // Lazy initializer reads saved theme synchronously to avoid an initial flash
  const init = (initState) => {
    try {
      const saved = localStorage.getItem('themeChoice');
      if (saved) {
        return { ...initState, theme: saved };
      }
    } catch (e) {
      // ignore and fall back to defaults
    }
    return initState;
  };

  const [state, dispatch] = useReducer(appReducer, initialState, init);

  // Apply theme class to document root and persist choice
  useEffect(() => {
    const applyTheme = (themeChoice) => {
      let resolved = themeChoice;
      if (themeChoice === 'auto') {
        resolved = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }

      if (resolved === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      try {
        localStorage.setItem('themeChoice', themeChoice);
      } catch (e) {
        // ignore
      }
    };

    applyTheme(state.theme);
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}