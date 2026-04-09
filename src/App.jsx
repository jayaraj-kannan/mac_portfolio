import React, { Suspense, useState, useCallback, useEffect } from 'react';
import { LiveWallpaper } from './components/LiveWallpaper';
import { MacWindow } from './components/MacWindow';
import { MenuBar } from './components/MenuBar';
import { Dock } from './components/Dock';
import { WidgetsLayer } from './components/WidgetsLayer';
import { SkillsSection, ExperienceSection, ProjectsSection, ToolsSection } from './components/SectionElements';
import userDetails, { actualYrsOfExp } from './data';
import { AnimatePresence } from 'framer-motion';

// Custom hook to track mobile viewport
const useWindowSize = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return isMobile;
};

const initialApps = {
  about: { isOpen: false, zIndex: 10, title: 'About Me', titleBar: 'Finder' },
  skills: { isOpen: false, zIndex: 5, title: 'Developer Skills', titleBar: 'Skills' },
  experience: { isOpen: false, zIndex: 4, title: 'Experience', titleBar: 'Experience' },
  projects: { isOpen: false, zIndex: 3, title: 'Projects Folder', titleBar: 'Projects' },
  tools: { isOpen: false, zIndex: 2, title: 'System Tools', titleBar: 'Tools' },
};

function App() {
  const [apps, setApps] = useState(initialApps);
  const [activeApp, setActiveApp] = useState('Finder');
  const isMobile = useWindowSize();
  
  const yrsExp = actualYrsOfExp();
  const welcomeStr = userDetails.personal.welcome;
  const descriptionStr = userDetails.personal.description
                            .replace('[YEAR1]', yrsExp)
                            .replace('[YEAR2]', 'several ');

  const bringToFront = useCallback((appId) => {
    setApps(prev => {
      const highestZ = Math.max(...Object.values(prev).map(app => app.zIndex), 0);
      if (prev[appId].zIndex === highestZ) return prev; 
      setActiveApp(prev[appId].titleBar);
      return { ...prev, [appId]: { ...prev[appId], zIndex: highestZ + 1 } };
    });
  }, []);

  const toggleApp = (appId) => {
    setApps(prev => {
      const highestZ = Math.max(...Object.values(prev).map(app => app.zIndex), 0);
      const isCurrentlyTop = prev[appId].isOpen && prev[appId].zIndex === highestZ;
      
      if (isCurrentlyTop) {
        setActiveApp('Finder');
        return { ...prev, [appId]: { ...prev[appId], isOpen: false } };
      }
      
      setActiveApp(prev[appId].titleBar);
      return { ...prev, [appId]: { ...prev[appId], isOpen: true, zIndex: highestZ + 1 } };
    });
  };

  const closeWindow = (appId) => {
    setApps(prev => ({ ...prev, [appId]: { ...prev[appId], isOpen: false } }));
    setActiveApp('Finder');
  };

  return (
    <>
      <LiveWallpaper />

      <MenuBar activeApp={activeApp} />
      
      {/* Desktop Widgets beneath windows */}
      <WidgetsLayer />

      <div className="desktop-area">
        <AnimatePresence>
          {apps.about.isOpen && (
            <MacWindow 
              key="about-win"
              title={apps.about.title} 
              zIndex={apps.about.zIndex}
              bringToFront={() => bringToFront('about')}
              onClose={() => closeWindow('about')}
              defaultPosition={{ x: (window.innerWidth/2) - 300, y: (window.innerHeight/2) - 250 }}
              isMobile={isMobile}
            >
              <div style={{ fontSize: '1.2rem', marginBottom: '1.2rem', fontWeight: '500' }}>
                <span dangerouslySetInnerHTML={{ __html: welcomeStr }}></span>
              </div>
              <div 
                 style={{ lineHeight: 1.7, opacity: 0.9, color: 'var(--color-text-muted)' }} 
                 dangerouslySetInnerHTML={{ __html: descriptionStr }}
              ></div>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  <div className="flex gap-2 items-center">
                     <i className="mdi mdi-email text-secondary" style={{ fontSize: '1.2rem' }}></i> 
                     <a href={`mailto:${userDetails.personal.email}`} style={{ textDecoration: 'none', color: 'var(--color-text)' }}>{userDetails.personal.email}</a>
                  </div>
                  <div className="flex gap-2 items-center">
                     <i className="mdi mdi-coffee text-secondary" style={{ fontSize: '1.2rem' }}></i> 
                     <a href={userDetails.personal.support} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'var(--color-text)' }}>Support my work</a>
                  </div>
              </div>
            </MacWindow>
          )}
          
          {apps.skills.isOpen && (
            <MacWindow 
              key="skills-win"
              title={apps.skills.title} 
              zIndex={apps.skills.zIndex}
              bringToFront={() => bringToFront('skills')}
              onClose={() => closeWindow('skills')}
              defaultPosition={{ x: 100, y: 150 }}
              isMobile={isMobile}
            >
               <SkillsSection skills={userDetails.skill} />
            </MacWindow>
          )}

          {apps.experience.isOpen && (
            <MacWindow 
              key="exp-win"
              title={apps.experience.title} 
              zIndex={apps.experience.zIndex}
              bringToFront={() => bringToFront('experience')}
              onClose={() => closeWindow('experience')}
              defaultPosition={{ x: window.innerWidth > 800 ? 400 : 50, y: 100 }}
              width="700px"
              height="600px"
              isMobile={isMobile}
            >
                <ExperienceSection experience={userDetails.experience} />
            </MacWindow>
          )}

          {apps.projects.isOpen && (
            <MacWindow 
              key="proj-win"
              title={apps.projects.title} 
              zIndex={apps.projects.zIndex}
              bringToFront={() => bringToFront('projects')}
              onClose={() => closeWindow('projects')}
              defaultPosition={{ x: window.innerWidth > 900 ? 550 : 20, y: 120 }}
              width="800px"
              height="650px"
              isMobile={isMobile}
            >
                <ProjectsSection projects={userDetails.projects} />
            </MacWindow>
          )}

          {apps.tools.isOpen && (
            <MacWindow 
              key="tools-win"
              title={apps.tools.title} 
              zIndex={apps.tools.zIndex}
              bringToFront={() => bringToFront('tools')}
              onClose={() => closeWindow('tools')}
              defaultPosition={{ x: 200, y: 300 }}
              width="500px"
              height="450px"
              isMobile={isMobile}
            >
                <ToolsSection tools={userDetails.tool} />
            </MacWindow>
          )}
        </AnimatePresence>
      </div>

      <Dock toggleApp={toggleApp} appsState={apps} />
    </>
  );
}

export default App;
