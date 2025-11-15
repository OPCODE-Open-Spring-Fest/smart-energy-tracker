import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  Maximize2, 
  Minimize2, 
  Settings, 
  X, 
  Move3D 
} from 'lucide-react';

const DashboardWidget = ({
  title,
  subtitle,
  icon,
  children,
  size = 'medium', // 'small'|'medium'|'large'|'full'
  collapsible = false,
  expandable = false,
  draggable = false,
  removable = false,
  initialCollapsed = false,
  headerActions = [],
  className = '',
  bodyClassName = '',
  headerClassName = '',
  theme = 'default', // 'default'|'dark'|'gradient'|'glass'
  onRemove = null,
  onExpand = null,
  onCollapse = null,
  onSettingsClick = null
}) => {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (newState && onCollapse) onCollapse();
    if (!newState && onExpand) onExpand();
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    if (onExpand) onExpand(!isExpanded);
  };

  const handleRemove = () => {
    if (onRemove) onRemove();
  };

  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 md:col-span-2 row-span-2',
    large: 'col-span-1 md:col-span-2 lg:col-span-3 row-span-3',
    full: 'col-span-full row-span-4'
  };

  const themeClasses = {
    default: 'bg-white border border-gray-200 shadow-sm hover:shadow-md',
    dark: 'bg-gray-800 border border-gray-700 shadow-sm hover:shadow-lg text-white',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 shadow-sm hover:shadow-md',
    glass: 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl'
  };

  const expandedClasses = isExpanded ? 'fixed inset-4 z-50' : '';

  return (
    <>
      {/* Backdrop for expanded widget */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleExpand}
          />
        )}
      </AnimatePresence>

      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: isDragging ? 0 : -2 }}
        drag={draggable}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        className={`
          relative rounded-xl transition-all duration-200 overflow-hidden
          ${themeClasses[theme]}
          ${isExpanded ? expandedClasses : sizeClasses[size]}
          ${isDragging ? 'rotate-2 scale-105 z-50' : ''}
          ${className}
        `}
      >
        {/* Header */}
        <div className={`
          flex items-center justify-between p-4 border-b border-gray-200/50
          ${draggable ? 'cursor-move' : ''}
          ${headerClassName}
        `}>
          <div className="flex items-center space-x-3 flex-1">
            {icon && (
              <div className="flex-shrink-0">
                <span className="text-xl">{icon}</span>
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {title}
              </h3>
              {subtitle && (
                <p className="text-sm text-gray-500 truncate mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-1 flex-shrink-0">
            {draggable && !isExpanded && (
              <button className="p-1 rounded-md hover:bg-gray-100 transition-colors">
                <Move3D className="w-4 h-4 text-gray-500" />
              </button>
            )}
            
            {headerActions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                title={action.tooltip}
              >
                <action.icon className="w-4 h-4 text-gray-500" />
              </button>
            ))}

            {onSettingsClick && (
              <button
                onClick={onSettingsClick}
                className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                title="Widget Settings"
              >
                <Settings className="w-4 h-4 text-gray-500" />
              </button>
            )}

            {expandable && (
              <button
                onClick={handleExpand}
                className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                title={isExpanded ? "Minimize" : "Expand"}
              >
                {isExpanded ? (
                  <Minimize2 className="w-4 h-4 text-gray-500" />
                ) : (
                  <Maximize2 className="w-4 h-4 text-gray-500" />
                )}
              </button>
            )}

            {collapsible && (
              <button
                onClick={handleCollapse}
                className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                title={isCollapsed ? "Expand" : "Collapse"}
              >
                {isCollapsed ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                )}
              </button>
            )}

            {removable && (
              <button
                onClick={handleRemove}
                className="p-1 rounded-md hover:bg-red-100 transition-colors group"
                title="Remove Widget"
              >
                <X className="w-4 h-4 text-gray-500 group-hover:text-red-500" />
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`overflow-hidden ${bodyClassName}`}
            >
              <div className={`p-4 ${isExpanded ? 'h-[calc(100vh-8rem)] overflow-y-auto' : ''}`}>
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drag Handle Indicator */}
        {draggable && isDragging && (
          <div className="absolute top-2 right-2 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded">
            Dragging...
          </div>
        )}

        {/* Loading State */}
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"
          />
        )}
      </motion.div>
    </>
  );
};

// Widget Container for Grid Layout
export const WidgetContainer = ({ 
  children, 
  columns = 'auto-fit', 
  minWidth = '300px',
  gap = '1.5rem',
  className = '' 
}) => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: columns === 'auto-fit' 
      ? `repeat(auto-fit, minmax(${minWidth}, 1fr))` 
      : columns,
    gap: gap,
    gridAutoRows: 'minmax(200px, auto)'
  };

  return (
    <div 
      style={gridStyle}
      className={`w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default DashboardWidget;