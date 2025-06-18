import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  it('renders the button with the correct text', () => {
    render(<Button href="#">Test Button</Button>);
    const buttonElement = screen.getByText(/Test Button/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('applies the correct intent class', () => {
    render(<Button href="#" intent="secondary">Test Button</Button>);
    const buttonElement = screen.getByText(/Test Button/i);
    expect(buttonElement).toHaveClass('bg-transparent');
  });

  it('applies the correct size class', () => {
    render(<Button href="#" size="sm">Test Button</Button>);
    const buttonElement = screen.getByText(/Test Button/i);
    expect(buttonElement).toHaveClass('min-w-20');
  });

  it('applies the underline class when underline prop is true', () => {
    render(<Button href="#" underline>Test Button</Button>);
    const buttonElement = screen.getByText(/Test Button/i);
    expect(buttonElement).toHaveClass('underline');
  });
});
