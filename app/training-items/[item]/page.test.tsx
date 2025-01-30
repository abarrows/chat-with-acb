import { render, screen } from '@testing-library/react';
import Page from './page';

describe('Training Item Page', () => {
  it('renders the page title', async () => {
    render(<Page />);
    const titleElement = await screen.findByText('Training Item Page');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the training item details', async () => {
    const mockTrainingItem = {
      id: 1,
      title: 'Training Item 1',
      description: 'Description of Training Item 1',
      content: 'Content of Training Item 1',
    };

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockTrainingItem),
    });

    render(<Page />);

    const titleElement = await screen.findByText(mockTrainingItem.title);
    expect(titleElement).toBeInTheDocument();

    const descriptionElement = await screen.findByText(mockTrainingItem.description);
    expect(descriptionElement).toBeInTheDocument();

    const contentElement = await screen.findByText(mockTrainingItem.content);
    expect(contentElement).toBeInTheDocument();
  });
});
