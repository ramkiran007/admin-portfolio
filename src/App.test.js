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

  const linkElement = await screen.getByText(/learn react/i);

  
  expect(linkElement).toBeInTheDocument();
});
