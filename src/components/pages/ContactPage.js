import React from 'react';
import '../Pages.css';

const ContactPage = ({ data }) => {
  const { personalInfo, contact } = data;

  const handleEmailClick = () => {
    window.location.href = `mailto:${personalInfo.email}`;
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${personalInfo.phone}`;
  };

  return (
    <div className="page-content">
      <div className="contact-header">
        <h1>Contact Me</h1>
        <p className="contact-message">{contact.message}</p>
      </div>

      <div className="contact-content">
        <div className="contact-info-section">
          <h2>Get In Touch</h2>
          <div className="contact-methods">
            <div className="contact-method">
              <div className="contact-icon">📧</div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>
                  <button onClick={handleEmailClick} className="contact-link">
                    {personalInfo.email}
                  </button>
                </p>
                {contact.alternateEmail && (
                  <p>
                    <a href={`mailto:${contact.alternateEmail}`} className="contact-link">
                      {contact.alternateEmail}
                    </a>
                  </p>
                )}
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">📱</div>
              <div className="contact-details">
                <h3>Phone</h3>
                <p>
                  <button onClick={handlePhoneClick} className="contact-link">
                    {personalInfo.phone}
                  </button>
                </p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">📍</div>
              <div className="contact-details">
                <h3>Location</h3>
                <p>{personalInfo.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="social-links-section">
          <h2>Connect With Me</h2>
          <div className="social-links">
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin">
              <span className="social-icon">💼</span>
              <span>LinkedIn</span>
            </a>
            
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-link github">
              <span className="social-icon">🐱</span>
              <span>GitHub</span>
            </a>
            
            {personalInfo.website && (
              <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="social-link website">
                <span className="social-icon">🌐</span>
                <span>Website</span>
              </a>
            )}
            
            {contact.twitter && (
              <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="social-link twitter">
                <span className="social-icon">🐦</span>
                <span>Twitter</span>
              </a>
            )}
            
            {contact.facebook && (
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="social-link facebook">
                <span className="social-icon">📘</span>
                <span>Facebook</span>
              </a>
            )}
          </div>
        </div>

        {contact.calendly && (
          <div className="scheduling-section">
            <h2>Schedule a Meeting</h2>
            <p>Want to have a chat? Schedule a meeting with me:</p>
            <a href={contact.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Schedule Meeting
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
