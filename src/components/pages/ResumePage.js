import React from 'react';
import '../Pages.css';

const ResumePage = ({ data }) => {
  const { resume } = data;

  return (
    <div className="page-content">
      <div className="resume-header">
        <h1>Resume</h1>
        <div className="resume-actions">
          <a href={resume.cvDownload} download className="btn btn-primary">
            Download CV
          </a>
        </div>
      </div>

      <div className="resume-section">
        <h2>Summary</h2>
        <p className="resume-summary">{resume.summary}</p>
      </div>

      <div className="resume-section">
        <h2>Experience</h2>
        <div className="experience-list">
          {resume.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <h3>{exp.role}</h3>
                <span className="experience-dates">{exp.dates}</span>
              </div>
              <div className="experience-company">
                <strong>{exp.company}</strong> - {exp.location}
              </div>
              <p className="experience-description">{exp.description}</p>
              <div className="experience-technologies">
                <strong>Technologies:</strong> {exp.technologies.join(', ')}
              </div>
              {exp.achievements && (
                <div className="experience-achievements">
                  <strong>Key Achievements:</strong>
                  <ul>
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="resume-section">
        <h2>Education</h2>
        <div className="education-list">
          {resume.education.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="education-header">
                <h3>{edu.degree}</h3>
                <span className="education-dates">{edu.dates}</span>
              </div>
              <div className="education-institution">
                <strong>{edu.institution}</strong>
              </div>
              {edu.gpa && <p><strong>GPA:</strong> {edu.gpa}</p>}
              {edu.coursework && (
                <div className="education-coursework">
                  <strong>Relevant Coursework:</strong> {edu.coursework.join(', ')}
                </div>
              )}
              {edu.extracurriculars && (
                <div className="education-activities">
                  <strong>Activities:</strong> {edu.extracurriculars.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="resume-section">
        <h2>Skills</h2>
        <div className="skills-grid">
          {resume.skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>

      <div className="resume-section">
        <h2>Certifications & Awards</h2>
        <div className="certifications-awards">
          <div className="certifications">
            <h3>Certifications</h3>
            <ul>
              {resume.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>
          <div className="awards">
            <h3>Awards</h3>
            <ul>
              {resume.awards.map((award, index) => (
                <li key={index}>{award}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="resume-section">
        <h2>Interests</h2>
        <div className="interests">
          {resume.interests.join(' • ')}
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
