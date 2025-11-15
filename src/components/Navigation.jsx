import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : false);
  const location = useLocation();
  const { state } = useApp();
  const { logoutUser } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    const handleResize = () => {
      const desktopNow = window.innerWidth >= 1024;
      setIsDesktop(desktopNow);
      if (desktopNow) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    // Initialize on mount in case of SSR/hydration differences
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/logs', label: 'System Logs', icon: '📋' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  const getStatusColor = () => {
    switch (state.inverterStatus) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'standby': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <motion.div
              animate={{ 
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 6 : 0
              }}
              className="w-full h-0.5 bg-gray-600 origin-center"
            ></motion.div>
            <motion.div
              animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
              className="w-full h-0.5 bg-gray-600"
            ></motion.div>
            <motion.div
              animate={{ 
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -6 : 0
              }}
              className="w-full h-0.5 bg-gray-600 origin-center"
            ></motion.div>
          </div>
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isMobileMenuOpen || isDesktop) && (
          <motion.nav
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-40 lg:z-auto"
            role="navigation"
            aria-label="Primary"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  IG
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">InvertorGuard</h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
                    <span className="text-sm text-gray-600 capitalize">
                      {state.inverterStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        location.pathname === item.path
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700 shadow-sm'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      aria-current={location.pathname === item.path ? 'page' : undefined}
                    >
                      <span className="text-xl" aria-hidden="true">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* System Info */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">System Info</h3>
                
                {/* Logout Button */}
                  <div className="p-4 mt-6 border-t border-gray-200">
                    <button
                      onClick={async () => {
                        try {
                          await fetch("http://localhost:3000/api/logout", {
                            method: "POST",
                            credentials: "include",
                          });
                        } catch (err) {
                          console.error("Logout failed:", err);
                        }
                        logoutUser();
                        localStorage.removeItem("user");
                        navigate("/");
                      }}
                      className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-red-500 text-white font-semibold shadow-md hover:bg-red-600 transition-all duration-300"
                    >
                      🚪 Logout
                    </button>
                  </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Battery</span>
                    <span className="font-medium">{state.batteryLevel}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Power</span>
                    <span className={state.powerCut ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                      {state.powerCut ? 'Cut' : 'Stable'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Consumption</span>
                    <span className="font-medium">{state.energyConsumption}W</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;