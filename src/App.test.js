import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

test('renders App component', () => {
    render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
