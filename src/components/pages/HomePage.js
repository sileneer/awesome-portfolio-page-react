import React from 'react';
import '../Pages.css';

const HomePage = ({ data }) => {
  const { personalInfo } = data;

  return (
    <div className="page-content">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Hello, I'm {personalInfo.name}</h1>
            <h2 className="hero-title">{personalInfo.title}</h2>
            <p className="hero-bio">{personalInfo.bio}</p>
            <div className="hero-details">
              <p><strong>Location:</strong> {personalInfo.location}</p>
              <p><strong>Languages:</strong> {personalInfo.languages.join(', ')}</p>
              <p><strong>Website:</strong> <a href={personalInfo.website} target="_blank" rel="noopener noreferrer">{personalInfo.website}</a></p>
            </div>
            <div className="hero-actions">
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                View LinkedIn
              </a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                View GitHub
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img src="/profile_photo.png" alt={personalInfo.name} className="profile-photo" />
          </div>
        </div>
      </div>
      <div className="home-highlights">
        <div className="highlight-card">
          <h3>Experience</h3>
          <p>{data.resume.experience.length}+ years in software development</p>
        </div>
        <div className="highlight-card">
          <h3>Projects</h3>
          <p>{data.projects.length} completed projects</p>
        </div>
        <div className="highlight-card">
          <h3>Skills</h3>
          <p>{data.resume.skills.length}+ technologies mastered</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
