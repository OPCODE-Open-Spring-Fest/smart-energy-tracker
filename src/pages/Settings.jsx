// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import ScheduleManager from '../components/ScheduleManager';
// import { useApp } from '../context/AppContext';

// const Settings = () => {
//   const { state, dispatch } = useApp();

//   const [settings, setSettings] = useState(() => ({
//     notifications: true,
//     soundAlerts: false,
//     autoBackup: true,
//     dataRetention: '30days',
//     theme: state.theme || 'light',
//     language: 'en'
//   }));

//   const handleSettingChange = (key, value) => {
//     if (key === 'theme') {
//       dispatch({ type: 'SET_THEME', payload: value });
//       setSettings(prev => ({ ...prev, theme: value }));
//       return;
//     }

//     setSettings(prev => ({
//       ...prev,
//       [key]: value
//     }));
//   };

//   return (
//   <div className="min-h-screen bg-gray-50 p-4">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mb-8"
//       >
//         <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
//         <p className="text-gray-600 mt-2">Configure your InvertorGuard system preferences</p>
//       </motion.div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* General Settings */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.1 }}
//           className="space-y-6"
//         >
//           {/* Notification Settings */}
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Notification Settings</h3>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="font-medium text-gray-800">Push Notifications</p>
//                   <p className="text-sm text-gray-600">Receive alerts for important events</p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={settings.notifications}
//                     onChange={(e) => handleSettingChange('notifications', e.target.checked)}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                 </label>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="font-medium text-gray-800">Sound Alerts</p>
//                   <p className="text-sm text-gray-600">Play sounds for critical alerts</p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={settings.soundAlerts}
//                     onChange={(e) => handleSettingChange('soundAlerts', e.target.checked)}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Data Settings */}
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Data Settings</h3>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="font-medium text-gray-800">Auto Backup</p>
//                   <p className="text-sm text-gray-600">Automatically backup system data</p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={settings.autoBackup}
//                     onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                 </label>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Data Retention Period
//                 </label>
//                 <select
//                   value={settings.dataRetention}
//                   onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="7days">7 Days</option>
//                   <option value="30days">30 Days</option>
//                   <option value="90days">90 Days</option>
//                   <option value="1year">1 Year</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Appearance Settings */}
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Appearance</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Theme
//                 </label>
//                 <select
//                   value={state.theme || 'light'}
//                   onChange={(e) => handleSettingChange('theme', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="light">Light</option>
//                   <option value="dark">Dark</option>
//                   <option value="auto">Auto</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Language
//                 </label>
//                 <select
//                   value={settings.language}
//                   onChange={(e) => handleSettingChange('language', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="en">English</option>
//                   <option value="es">Español</option>
//                   <option value="fr">Français</option>
//                   <option value="de">Deutsch</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Schedule Manager */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           <ScheduleManager />
//         </motion.div>
//       </div>

//       {/* Action Buttons */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3 }}
//         className="mt-8 flex flex-col sm:flex-row gap-4 justify-end"
//       >
//         <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
//           Reset to Defaults
//         </button>
//         <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
//           Save Changes

//         </button>
//       </motion.div>
//     </div>
//   );
// };

// export default Settings;

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import ScheduleManager from '../components/ScheduleManager';
// import { useApp } from '../context/AppContext';

// const Settings = () => {
//   const { state, dispatch } = useApp();

//   // Define default settings with all toggles OFF
//   const defaultSettings = {
//     notifications: false, // OFF
//     soundAlerts: false,   // OFF
//     autoBackup: false,    // OFF
//     dataRetention: '30days',
//     theme: 'light',       // Always light on reset
//     language: 'en'        // Always English on reset
//   };

//   const [settings, setSettings] = useState(defaultSettings);

//   const handleSettingChange = (key, value) => {
//     if (key === 'theme') {
//       dispatch({ type: 'SET_THEME', payload: value });
//       setSettings(prev => ({ ...prev, theme: value }));
//       return;
//     }

//     setSettings(prev => ({
//       ...prev,
//       [key]: value
//     }));
//   };

//   // Reset handler function - turns everything OFF
//   const handleReset = () => {
//     setSettings(defaultSettings);
//     // Also reset the theme in global state to light
//     dispatch({ type: 'SET_THEME', payload: 'light' });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mb-8"
//       >
//         <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
//         <p className="text-gray-600 mt-2">Configure your InvertorGuard system preferences</p>
//       </motion.div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* General Settings */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.1 }}
//           className="space-y-6"
//         >
//           {/* Notification Settings */}
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Notification Settings</h3>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="font-medium text-gray-800">Push Notifications</p>
//                   <p className="text-sm text-gray-600">Receive alerts for important events</p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={settings.notifications}
//                     onChange={(e) => handleSettingChange('notifications', e.target.checked)}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                 </label>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="font-medium text-gray-800">Sound Alerts</p>
//                   <p className="text-sm text-gray-600">Play sounds for critical alerts</p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={settings.soundAlerts}
//                     onChange={(e) => handleSettingChange('soundAlerts', e.target.checked)}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Data Settings */}
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Data Settings</h3>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="font-medium text-gray-800">Auto Backup</p>
//                   <p className="text-sm text-gray-600">Automatically backup system data</p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={settings.autoBackup}
//                     onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                 </label>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Data Retention Period
//                 </label>
//                 <select
//                   value={settings.dataRetention}
//                   onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="7days">7 Days</option>
//                   <option value="30days">30 Days</option>
//                   <option value="90days">90 Days</option>
//                   <option value="1year">1 Year</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Appearance Settings */}
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Appearance</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Theme
//                 </label>
//                 <select
//                   value={settings.theme}
//                   onChange={(e) => handleSettingChange('theme', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="light">Light</option>
//                   <option value="dark">Dark</option>
//                   <option value="auto">Auto</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Language
//                 </label>
//                 <select
//                   value={settings.language}
//                   onChange={(e) => handleSettingChange('language', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="en">English</option>
//                   <option value="es">Español</option>
//                   <option value="fr">Français</option>
//                   <option value="de">Deutsch</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Schedule Manager */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           <ScheduleManager />
//         </motion.div>
//       </div>

//       {/* Action Buttons */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3 }}
//         className="mt-8 flex flex-col sm:flex-row gap-4 justify-end"
//       >
//         <button
//           onClick={handleReset}
//           className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
//         >
//           Reset to Defaults
//         </button>
//         <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
//           Save Changes
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// export default Settings;

import React, { useState } from "react";
import { motion } from "framer-motion";
import ScheduleManager from "../components/ScheduleManager";
import { useApp } from "../context/AppContext";

// Settings translations
const settingsTranslations = {
  en: {
    title: "Settings",
    subtitle: "Configure your InvertorGuard system preferences",
    notificationSettings: "Notification Settings",
    pushNotifications: "Push Notifications",
    pushDesc: "Receive alerts for important events",
    soundAlerts: "Sound Alerts",
    soundDesc: "Play sounds for critical alerts",
    dataSettings: "Data Settings",
    autoBackup: "Auto Backup",
    autoBackupDesc: "Automatically backup system data",
    dataRetention: "Data Retention Period",
    appearance: "Appearance",
    theme: "Theme",
    language: "Language",
    reset: "Reset to Defaults",
    save: "Save Changes",
  },
  es: {
    title: "Configuración",
    subtitle: "Configure las preferencias de su sistema InvertorGuard",
    notificationSettings: "Configuración de Notificaciones",
    pushNotifications: "Notificaciones Push",
    pushDesc: "Recibir alertas para eventos importantes",
    soundAlerts: "Alertas de Sonido",
    soundDesc: "Reproducir sonidos para alertas críticas",
    dataSettings: "Configuración de Datos",
    autoBackup: "Copia de Seguridad Automática",
    autoBackupDesc:
      "Hacer copia de seguridad automática de los datos del sistema",
    dataRetention: "Período de Retención de Datos",
    appearance: "Apariencia",
    theme: "Tema",
    language: "Idioma",
    reset: "Restablecer a Valores Predeterminados",
    save: "Guardar Cambios",
  },
  fr: {
    title: "Paramètres",
    subtitle: "Configurez les préférences de votre système InvertorGuard",
    notificationSettings: "Paramètres de Notification",
    pushNotifications: "Notifications Push",
    pushDesc: "Recevoir des alertes pour les événements importants",
    soundAlerts: "Alertes Sonores",
    soundDesc: "Jouer des sons pour les alertes critiques",
    dataSettings: "Paramètres des Données",
    autoBackup: "Sauvegarde Automatique",
    autoBackupDesc: "Sauvegarder automatiquement les données du système",
    dataRetention: "Période de Rétention des Données",
    appearance: "Apparence",
    theme: "Thème",
    language: "Langue",
    reset: "Réinitialiser aux Valeurs par Défaut",
    save: "Enregistrer les Modifications",
  },
  de: {
    title: "Einstellungen",
    subtitle: "Konfigurieren Sie Ihre InvertorGuard-Systemeinstellungen",
    notificationSettings: "Benachrichtigungseinstellungen",
    pushNotifications: "Push-Benachrichtigungen",
    pushDesc: "Benachrichtigungen für wichtige Ereignisse erhalten",
    soundAlerts: "Sound-Benachrichtigungen",
    soundDesc: "Sounds für kritische Benachrichtigungen abspielen",
    dataSettings: "Dateneinstellungen",
    autoBackup: "Automatische Sicherung",
    autoBackupDesc: "Systemdaten automatisch sichern",
    dataRetention: "Datenaufbewahrungsfrist",
    appearance: "Erscheinungsbild",
    theme: "Thema",
    language: "Sprache",
    reset: "Auf Standardwerte zurücksetzen",
    save: "Änderungen speichern",
  },
};

const Settings = () => {
  const { state, dispatch } = useApp();
  const currentLanguage = state.language || "en";
  const t = settingsTranslations[currentLanguage];

  // Define default settings with all toggles OFF
  const defaultSettings = {
    notifications: false,
    soundAlerts: false,
    autoBackup: false,
    dataRetention: "30days",
    theme: "light",
    language: "en",
  };

  const [settings, setSettings] = useState(defaultSettings);

  const handleSettingChange = (key, value) => {
    if (key === "theme") {
      dispatch({ type: "SET_THEME", payload: value });
      setSettings((prev) => ({ ...prev, theme: value }));
      return;
    }
    if (key === "language") {
      dispatch({ type: "SET_LANGUAGE", payload: value });
    }

    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Reset handler function - turns everything OFF
  const handleReset = () => {
    setSettings(defaultSettings);
    dispatch({ type: "SET_THEME", payload: "light" });
    dispatch({ type: "SET_LANGUAGE", payload: "en" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
        <p className="text-gray-600 mt-2">{t.subtitle}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Notification Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {t.notificationSettings}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">
                    {t.pushNotifications}
                  </p>
                  <p className="text-sm text-gray-600">{t.pushDesc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) =>
                      handleSettingChange("notifications", e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{t.soundAlerts}</p>
                  <p className="text-sm text-gray-600">{t.soundDesc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.soundAlerts}
                    onChange={(e) =>
                      handleSettingChange("soundAlerts", e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Data Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {t.dataSettings}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{t.autoBackup}</p>
                  <p className="text-sm text-gray-600">{t.autoBackupDesc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoBackup}
                    onChange={(e) =>
                      handleSettingChange("autoBackup", e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.dataRetention}
                </label>
                <select
                  value={settings.dataRetention}
                  onChange={(e) =>
                    handleSettingChange("dataRetention", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="7days">7 Days</option>
                  <option value="30days">30 Days</option>
                  <option value="90days">90 Days</option>
                  <option value="1year">1 Year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {t.appearance}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.theme}
                </label>
                <select
                  value={settings.theme}
                  onChange={(e) => handleSettingChange("theme", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.language}
                </label>
                <select
                  value={settings.language}
                  onChange={(e) =>
                    handleSettingChange("language", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Schedule Manager */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ScheduleManager />
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex flex-col sm:flex-row gap-4 justify-end"
      >
        <button
          onClick={handleReset}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          {t.reset}
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          {t.save}
        </button>
      </motion.div>
    </div>
  );
};

export default Settings;
