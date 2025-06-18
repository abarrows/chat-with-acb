import { render, screen } from '@testing-library/react';
import Page from './page';

describe('LangChain Page', () => {
  it('renders the page title', async () => {
    render(<Page />);
    const titleElement = await screen.findByText('LangChain Articles List');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the table headers', async () => {
    render(<Page />);
    const headers = [
      'Index',
      'ID',
      'Key',
      'Title and Excerpt',
      'Url',
      'Original Labels',
      'Proficiencies',
      'Tools',
      'Advanced Skills',
      'Body',
    ];
    headers.forEach(async (header) => {
      const headerElement = await screen.findByText(header);
      expect(headerElement).toBeInTheDocument();
    });
  });

  it('renders the data items', async () => {
    const mockDataItems = [
      {
        id: 1,
        key: 'key1',
        title: 'Title 1',
        excerpt: 'Excerpt 1',
        url: 'http://example.com/1',
        body: 'Body 1',
        labels: [],
      },
      {
        id: 2,
        key: 'key2',
        title: 'Title 2',
        excerpt: 'Excerpt 2',
        url: 'http://example.com/2',
        body: 'Body 2',
        labels: [],
      },
    ];

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDataItems),
    });

    render(<Page />);

    mockDataItems.forEach(async (item) => {
      const titleElement = await screen.findByText(item.title);
      expect(titleElement).toBeInTheDocument();

      const excerptElement = await screen.findByText(item.excerpt);
      expect(excerptElement).toBeInTheDocument();

      const urlElement = await screen.findByText(item.url);
      expect(urlElement).toBeInTheDocument();

      const bodyElement = await screen.findByText(item.body);
      expect(bodyElement).toBeInTheDocument();
    });
  });
});
