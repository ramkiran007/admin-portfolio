// Mocking Typewriter component at the top of the file
jest.mock('typewriter-effect', () => () => 'Typewriter Mock');

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Your test case
test('renders App component', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // Now your tests here, the Typewriter component is mocked
  // Example test: Check for an element that exists when App is rendered
  const linkElement = await screen.findByText(/Typewriter Mock/i);
  expect(linkElement).toBeInTheDocument();
});
