import React from 'react';
import { render, screen } from '@testing-library/react';
import Article from './article';

describe('Article Component', () => {
  it('renders the article content', () => {
    const content = 'This is a test article';
    render(<Article>{content}</Article>);
    const articleElement = screen.getByText(content);
    expect(articleElement).toBeInTheDocument();
  });

  it('renders the article content with HTML tags', () => {
    const content = '<p>This is a <strong>test</strong> article</p>';
    render(<Article>{content}</Article>);
    const articleElement = screen.getByText('This is a test article');
    expect(articleElement).toBeInTheDocument();
  });

  it('renders the article content with line breaks', () => {
    const content = 'This is a test article\nwith line breaks';
    render(<Article>{content}</Article>);
    const articleElement = screen.getByText('This is a test article with line breaks');
    expect(articleElement).toBeInTheDocument();
  });
});
