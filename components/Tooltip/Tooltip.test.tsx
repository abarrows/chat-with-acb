import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tooltip } from './Tooltip';

describe('Tooltip Component', () => {
  it('renders children correctly', () => {
    render(
      <Tooltip explainer="Test Tooltip">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('displays tooltip on hover', async () => {
    render(
      <Tooltip explainer="Test Tooltip">
        <button>Hover me</button>
      </Tooltip>
    );
    const button = screen.getByText('Hover me');
    button.focus();
    expect(await screen.findByText('Test Tooltip')).toBeInTheDocument();
  });

  it('applies the correct intent class', () => {
    render(
      <Tooltip explainer="Test Tooltip" intent="primary">
        <button>Hover me</button>
      </Tooltip>
    );
    const tooltip = screen.getByText('Test Tooltip');
    expect(tooltip).toHaveClass('bg-zinc-700');
  });

  it('applies the correct size class', () => {
    render(
      <Tooltip explainer="Test Tooltip" size="md">
        <button>Hover me</button>
      </Tooltip>
    );
    const tooltip = screen.getByText('Test Tooltip');
    expect(tooltip).toHaveClass('text-2xs');
  });

  it('renders tooltip arrow when withArrow is true', () => {
    render(
      <Tooltip explainer="Test Tooltip" withArrow>
        <button>Hover me</button>
      </Tooltip>
    );
    const arrow = screen.getByRole('tooltip');
    expect(arrow).toBeInTheDocument();
  });
});
