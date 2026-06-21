import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactPage from './ContactPage';

const personalInfo = {
  email: 'me@example.com',
  phone: '+1 555 0100',
  location: 'London, UK',
  linkedin: 'https://linkedin.com/in/me',
  github: 'https://github.com/me',
  website: 'https://me.dev',
};

const contact = {
  message: 'Reach out anytime.',
  responseTime: 'Within 24 hours',
  twitter: 'https://twitter.com/me',
  alternateEmail: 'alt@example.com',
  facebook: 'https://facebook.com/me',
};

describe('ContactPage', () => {
  it('uses a single h1 for the page title', () => {
    render(<ContactPage data={{ personalInfo, contact }} />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(/connect/i);
  });

  it('renders the primary email, alternate email and phone', () => {
    render(<ContactPage data={{ personalInfo, contact }} />);
    expect(screen.getByText('me@example.com')).toBeInTheDocument();
    expect(screen.getByText('alt@example.com')).toBeInTheDocument();
    expect(screen.getByText('+1 555 0100')).toBeInTheDocument();
  });

  it('omits the alternate email when it is not provided', () => {
    render(<ContactPage data={{ personalInfo, contact: { ...contact, alternateEmail: undefined } }} />);
    expect(screen.queryByText('alt@example.com')).not.toBeInTheDocument();
  });
});
