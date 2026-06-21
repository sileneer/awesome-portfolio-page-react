import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import ProjectsPage from './ProjectsPage';

const projects = [
  {
    name: 'ProjectConnect',
    description: 'A platform for developers to collaborate and network in real time.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'OAuth', 'Express'],
    link: 'https://github.com/example/connect',
    screenshots: ['/a.png', '/b.png'],
    role: 'Lead Developer',
    duration: '6 months',
  },
  {
    name: 'TaskManager',
    description: 'A productivity app for managing tasks and deadlines.',
    technologies: ['React', 'Redux'],
    link: 'https://taskmanager.example.com',
    screenshots: ['/c.png'],
    role: 'Full Stack Developer',
    duration: '4 months',
  },
];

describe('ProjectsPage', () => {
  it('uses a single h1 for the page title', () => {
    render(<ProjectsPage data={{ projects }} />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(/projects/i);
  });

  it('shows role and duration on each card', () => {
    render(<ProjectsPage data={{ projects }} />);
    expect(screen.getByText('Lead Developer')).toBeInTheDocument();
    expect(screen.getByText('6 months')).toBeInTheDocument();
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
    expect(screen.getByText('4 months')).toBeInTheDocument();
  });

  it('shows at-a-glance project and technology counts', () => {
    render(<ProjectsPage data={{ projects }} />);
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Technologies')).toBeInTheDocument();
  });

  it('has no separate "View details" button — the image opens the modal', () => {
    render(<ProjectsPage data={{ projects }} />);
    expect(screen.queryByRole('button', { name: /^View details for/ })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View screenshots of ProjectConnect' })).toBeInTheDocument();
  });

  it('opens a rich detail modal with description, role and link', () => {
    render(<ProjectsPage data={{ projects }} />);

    fireEvent.click(screen.getByRole('button', { name: 'View screenshots of ProjectConnect' }));

    const dialog = screen.getByRole('dialog');
    expect(
      within(dialog).getByText('A platform for developers to collaborate and network in real time.'),
    ).toBeInTheDocument();
    expect(within(dialog).getByText('Lead Developer')).toBeInTheDocument();
    const link = within(dialog).getByRole('link', { name: /view source code of ProjectConnect/i });
    expect(link).toHaveAttribute('href', 'https://github.com/example/connect');
  });
});
