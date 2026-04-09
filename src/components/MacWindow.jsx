import React from 'react';
import { motion } from 'framer-motion';

export const MacWindow = ({ title, children, onClose, defaultPosition, zIndex = 10, bringToFront, width="600px", height="500px", isMobile=false }) => {
  
  // Base properties that change based on screen size
  const mobileStyle = {
    width: '95vw',
    height: '80vh',
    left: '2.5vw',
    top: '40px', // Right under the menu bar
    zIndex: zIndex
  };
  
  const desktopStyle = {
    width: width, 
    height: height, 
    left: defaultPosition?.x || 100, 
    top: defaultPosition?.y || 100,
    zIndex: zIndex
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      drag={!isMobile} // Disable dragging entirely on mobile phones
      dragConstraints={{ left: 0, right: typeof window !== 'undefined' ? window.innerWidth - parseInt(width) : 0, top: 28, bottom: typeof window !== 'undefined' ? window.innerHeight - 150 : 0 }}
      dragMomentum={false}
      onMouseDown={bringToFront}
      className="mac-window"
      style={isMobile ? mobileStyle : desktopStyle}
    >
      <div className="mac-header-drag" onPointerDown={(e) => { if(!isMobile) e.stopPropagation(); }}>
        <div className="mac-buttons" onPointerDownCapture={(e) => e.stopPropagation()}>
          <div className="mac-button btn-red" onClick={onClose}></div>
          <div className="mac-button btn-yellow"></div>
          <div className="mac-button btn-green"></div>
        </div>
        <div className="mac-title">{title}</div>
      </div>
      <div className="mac-content" onPointerDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </motion.div>
  );
};
