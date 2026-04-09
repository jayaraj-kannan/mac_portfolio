import React, { useState, useEffect, useRef } from 'react';
import userDetails, { actualYrsOfExp } from '../data';
import aboutMeAudioEn from '../assets/audio/aboutme_english.wav';
import aboutMeAudioHi from '../assets/audio/aboutme_hindi.wav';
import aboutMeAudioTa from '../assets/audio/aboutme_tamil.wav';
import aboutMeAudioTe from '../assets/audio/aboutme_telugu.wav';

const LANGUAGES = [
  { id: 'en', label: 'English', file: aboutMeAudioEn },
  { id: 'hi', label: 'Hindi', file: aboutMeAudioHi },
  { id: 'ta', label: 'Tamil', file: aboutMeAudioTa },
  { id: 'te', label: 'Telugu', file: aboutMeAudioTe }
];

export const WidgetsLayer = () => {
  const [time, setTime] = useState(new Date());
  const yrsExp = parseFloat(actualYrsOfExp());
  const [isPlaying, setIsPlaying] = useState(false);
  const [langIndex, setLangIndex] = useState(0);
  const audioRef = useRef(null);

  const toggleLanguage = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    setLangIndex((prev) => (prev + 1) % LANGUAGES.length);
  };
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Battery percentage logic based on abstract 10 years "max charge"
  const batteryPercent = Math.min((yrsExp / 10) * 100, 100);
  
  // Battery color logic
  let batteryColor = "#27C93F"; // Green
  if (batteryPercent < 20) batteryColor = "#FF5F56"; // Red
  else if (batteryPercent < 50) batteryColor = "#FFBD2E"; // Yellow

  return (
    <>
      <div className="widgets-layer left-panel">
        {/* Clock Widget */}
        <div className="mac-widget">
          <div className="widget-title"><i className="mdi mdi-clock-outline"></i> Clock</div>
          <div className="widget-clock">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
          </div>
          <div className="widget-date">
            {time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
          </div>
        </div>

        {/* Spotify Widget */}
        <div className="mac-widget" style={{ padding: '15px' }}>
          <div className="widget-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div><i className="mdi mdi-spotify" style={{color: '#1DB954', fontSize: '1.2rem', marginRight: '5px'}}></i> Now Playing</div>
            <div onClick={toggleLanguage} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', opacity: 0.8, background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '12px' }} title="Change Language">
              <span>{LANGUAGES[langIndex].label}</span> <i className="mdi mdi-translate" style={{ fontSize: '1rem' }}></i>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div style={{ width: '50px', height: '50px', borderRadius: '4px', overflow: 'hidden' }}>
               <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop" alt="Album Art" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="flex-col">
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>about me chill</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>Voice Note</div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-4" style={{ marginTop: '15px' }}>
            <i className="mdi mdi-skip-previous" style={{ fontSize: '1.5rem', cursor: 'pointer', opacity: 0.8 }}></i>
            <div 
               onClick={togglePlay}
               style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#fff', color: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
            >
              <i className={isPlaying ? "mdi mdi-pause" : "mdi mdi-play"} style={{ fontSize: '1.5rem' }}></i>
            </div>
            <i className="mdi mdi-skip-next" style={{ fontSize: '1.5rem', cursor: 'pointer', opacity: 0.8 }}></i>
          </div>
          <audio ref={audioRef} src={LANGUAGES[langIndex].file} onEnded={() => setIsPlaying(false)} />
        </div>
      </div>

      <div className="widgets-layer right-panel">
        {/* Experience 'Battery' Widget */}
        <div className="mac-widget">
          <div className="widget-title"><i className="mdi mdi-battery-charging"></i> Development Experience</div>
          <div className="battery-container">
            <div className="battery-icon">
              <div className="battery-level" style={{ width: `${batteryPercent}%`, background: batteryColor }}></div>
            </div>
            <div className="battery-text">{yrsExp} Yrs</div>
          </div>
          <div style={{ marginTop: '10px', fontSize: '0.8rem', opacity: 0.7 }}>
            Current State: Fully Charged
          </div>
        </div>

        {/* Highlight Stats Widget */}
        <div className="mac-widget">
          <div className="widget-title"><i className="mdi mdi-chart-box-outline"></i> Portfolio Highlights</div>
          <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center p-2" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                  <span className="text-muted"><i className="mdi mdi-folder-star text-secondary"></i> Projects</span>
                  <span className="text-xl">{userDetails.projects.length}</span>
              </div>
              <div className="flex justify-between items-center p-2" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                  <span className="text-muted"><i className="mdi mdi-briefcase text-secondary"></i> Roles</span>
                  <span className="text-xl">{userDetails.experience.length}</span>
              </div>
              <div className="flex justify-between items-center p-2" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                  <span className="text-muted"><i className="mdi mdi-code-tags text-secondary"></i> Core Skills</span>
                  <span className="text-xl">{userDetails.skill.length}</span>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};
