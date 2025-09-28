import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio homepage with name and title', () => {
  render(<App />);
  const nameElement = screen.getByText(/Hello, I'm Nagano/i);
  const titleElement = screen.getByText(/Full Stack Developer/i);
  expect(nameElement).toBeInTheDocument();
  expect(titleElement).toBeInTheDocument();
});
