import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders welcome message', () => {
    render(<App />);

    const heading = screen.getByText(/Digital Voting System/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders home page content', () => {
    render(<App />);

    const welcomeText = screen.getByText(/Welcome to Digital Voting System/i);
    expect(welcomeText).toBeInTheDocument();
  });
});
