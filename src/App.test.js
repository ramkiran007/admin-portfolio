jest.mock('lottie-web', () => ({
  loadAnimation: jest.fn(),
}));
jest.mock('typewriter-effect', () => () => <div>Typewriter Effect</div>);

  import React from 'react';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

test('renders App component', async() => {
    render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );

      const typewriterText = await screen.findByText(/Typewriter Effect/i);

      expect(typewriterText).toBeInTheDocument();
});
