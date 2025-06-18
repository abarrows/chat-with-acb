import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RootLayout from './layout';

describe('RootLayout', () => {
  test('renders children correctly', () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  test('sets the correct language attribute on the html element', () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    expect(document.documentElement.lang).toBe('en');
  });
});
