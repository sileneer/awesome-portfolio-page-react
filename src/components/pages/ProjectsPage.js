import React from 'react';
import '../Pages.css';

const ProjectsPage = ({ data }) => {
  const { projects } = data;

  return (
    <div className="page-content">
      <div className="projects-header">
        <h1>Projects</h1>
        <p>Here are some of the projects I've worked on that showcase my skills and experience.</p>
      </div>

      {projects.length === 0 ? (
        <div className="no-projects">
          <p>No projects added yet.</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <h3 className="project-name">{project.name}</h3>
                <div className="project-links">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      {project.link.includes('github.com') ? 'View Code' : 'Live Demo'}
                    </a>
                  )}
                </div>
              </div>

              <div className="project-content">
                <p className="project-description">{project.description}</p>

                <div className="project-details">
                  <div className="project-meta">
                    <span className="project-role"><strong>Role:</strong> {project.role}</span>
                    <span className="project-duration"><strong>Duration:</strong> {project.duration}</span>
                  </div>

                  <div className="project-technologies">
                    <strong>Technologies:</strong>
                    <div className="tech-tags">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {project.screenshots && project.screenshots.length > 0 && (
                  <div className="project-screenshots">
                    <strong>Screenshots:</strong>
                    <div className="screenshots-grid">
                      {project.screenshots.map((screenshot, screenshotIndex) => (
                        <div key={screenshotIndex} className="screenshot-placeholder">
                          <img
                            src={screenshot}
                            alt={`${project.name} screenshot ${screenshotIndex + 1}`}
                            className="project-screenshot"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
