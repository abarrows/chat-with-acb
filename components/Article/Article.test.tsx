import React from 'react';
import { render } from '@testing-library/react';
import Article from './Article';

describe('Article Component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<Article>Test Article</Article>);
    expect(getByText('Test Article')).toBeInTheDocument();
  });

  it('renders multiple children correctly', () => {
    const { getByText } = render(
      <Article>
        <p>First Paragraph</p>
        <p>Second Paragraph</p>
      </Article>
    );
    expect(getByText('First Paragraph')).toBeInTheDocument();
    expect(getByText('Second Paragraph')).toBeInTheDocument();
  });

  it('renders HTML elements correctly', () => {
    const { container } = render(
      <Article>
        <h1>Heading</h1>
        <p>Paragraph</p>
      </Article>
    );
    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(container.querySelector('p')).toBeInTheDocument();
  });
});
