import React from 'react';

// Fallback images for placeholders
const FALLBACK_ICON = "https://placehold.co/100x100/00ff41/000000?text=ICON";
const FALLBACK_COVER = "https://placehold.co/600x300/00ff41/000000?text=PROJECT";

export const SkillsSection = ({ skills }) => {
  return (
    <div className="flex flex-wrap">
      {skills.map((skill, idx) => (
        <div key={idx} className="chip">
          <i className={skill.icon}></i>
          {skill.label}
        </div>
      ))}
    </div>
  );
};

export const ExperienceSection = ({ experience }) => {
  return (
    <div className="flex-col gap-4">
      {experience.map((job, idx) => (
        <div key={idx} className="item-card" style={{ marginBottom: '1.5rem' }}>
          <div className="flex items-center gap-4" style={{ marginBottom: '1rem' }}>
            <img 
              src={job.logo || FALLBACK_ICON} 
              alt={job.companyName}
              style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'contain', background: '#fff' }}
              onError={(e) => { e.target.src = FALLBACK_ICON }}
            />
            <div>
              <div className="item-title text-primary">{job.role}</div>
              <div className="item-meta">
                <span className="text-secondary">{job.companyName}</span> | {job.date} | {job.place}
              </div>
            </div>
          </div>
          
          <p style={{ opacity: 0.9, lineHeight: 1.6, marginBottom: '1rem', fontSize: '0.95rem' }}>
            {job.description}
          </p>
          
          <div style={{ marginBottom: '1rem' }}>
             <strong className="text-muted">Tech Stack:</strong>
             <div className="flex flex-wrap" style={{ marginTop: '0.5rem' }}>
               {job.skill?.map((s, i) => <span key={i} className="chip" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>{s}</span>)}
             </div>
          </div>

          {job.project && job.project.length > 0 && (
            <div>
              <strong className="text-muted">Key Projects:</strong>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
                {job.project.map((pj, pi) => (
                    <li key={pi} style={{ marginBottom: '0.5rem' }}>
                        <span className="text-secondary">{pj.title}</span>
                         {pj.domain && ` [${pj.domain}]`}
                         {pj.description && <div style={{ marginTop: '0.25rem', fontSize: '0.85rem' }}>{pj.description}</div>}
                    </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const ProjectsSection = ({ projects }) => {
  return (
    <div className="grid-2">
      {projects.map((project, idx) => (
        <div key={idx} className="item-card flex-col justify-between">
          <div>
            <div style={{ height: '140px', overflow: 'hidden', marginBottom: '1rem', borderRadius: '4px' }}>
              <img 
                src={project.cover || FALLBACK_COVER} 
                alt={project.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.src = FALLBACK_COVER }}
              />
            </div>
            <div className="item-title text-primary">
              <i className={project.icon}></i> {project.title}
            </div>
            <p style={{ opacity: 0.85, fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1rem' }}>
              {project.description}
            </p>
          </div>
          
          <div>
            <div className="flex flex-wrap" style={{ marginBottom: '1rem' }}>
               {project.tech?.map((t, i) => <span key={i} className="chip" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>{t}</span>)}
            </div>
            <div className="flex gap-2">
              {project.git && <a href={project.git} target="_blank" rel="noreferrer" className="chip" style={{ textDecoration: 'none', color: 'inherit' }}><i className="mdi mdi-github"></i> Source</a>}
              {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="chip" style={{ textDecoration: 'none', color: 'inherit' }}><i className="mdi mdi-open-in-new"></i> Live</a>}
              {project.blog && <a href={project.blog} target="_blank" rel="noreferrer" className="chip" style={{ textDecoration: 'none', color: 'inherit' }}><i className="mdi mdi-post"></i> Blog</a>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ToolsSection = ({ tools }) => {
  return (
    <div className="grid-2">
        {tools.map((tool, idx) => (
            <div key={idx} className="item-card flex items-center gap-4">
                <img 
                    src={tool.prependAvatar || FALLBACK_ICON}
                    alt={tool.title}
                    style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                    onError={(e) => { e.target.src = FALLBACK_ICON }}
                />
                <div>
                   <div className="item-title" style={{ fontSize: '1rem', marginBottom: 0 }}>{tool.title}</div>
                </div>
            </div>
        ))}
    </div>
  )
}
