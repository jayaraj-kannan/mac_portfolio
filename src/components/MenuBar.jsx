import React, { useState, useEffect } from 'react';

export const MenuBar = ({ activeApp }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) + " " + now.toDateString().substring(0, 3));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="menu-bar">
      <div className="menu-bar-left">
        <div className="menu-item"><i className="mdi mdi-apple" style={{ fontSize: '1.2rem' }}></i></div>
        <div className="menu-item active">{activeApp || 'Finder'}</div>
        <div className="menu-item">File</div>
        <div className="menu-item">Edit</div>
        <div className="menu-item">View</div>
        <div className="menu-item">Go</div>
        <div className="menu-item">Window</div>
        <div className="menu-item">Help</div>
      </div>
      <div className="menu-bar-right">
        <div className="menu-item"><i className="mdi mdi-battery-80"></i></div>
        <div className="menu-item"><i className="mdi mdi-wifi"></i></div>
        <div className="menu-item"><i className="mdi mdi-magnify"></i></div>
        <div className="menu-item">{time}</div>
      </div>
    </div>
  );
};
