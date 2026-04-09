import React from 'react';

export const Dock = ({ toggleApp, appsState }) => {
  const dockApps = [
    { id: 'about', icon: 'mdi mdi-account-circle', color: '#0A84FF', label: 'About Me' },
    { id: 'skills', icon: 'mdi mdi-code-tags', color: '#FFBD2E', label: 'Skills' },
    { id: 'experience', icon: 'mdi mdi-briefcase', color: '#27C93F', label: 'Experience' },
    { id: 'projects', icon: 'mdi mdi-folder-star', color: '#FF5F56', label: 'Projects' },
    { id: 'tools', icon: 'mdi mdi-tools', color: '#ae52d4', label: 'Tools' },
  ];

  return (
    <div className="dock-container">
      {dockApps.map(app => (
        <div key={app.id} className="dock-item" onClick={() => toggleApp(app.id)} title={app.label}>
          <i className={app.icon} style={{ color: app.color }}></i>
          {appsState[app.id]?.isOpen && <div className="dock-dot"></div>}
        </div>
      ))}
    </div>
  );
};
