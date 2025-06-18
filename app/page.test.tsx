import { render, screen } from '@testing-library/react';
import Page from './page';

describe('Main Page', () => {
  it('renders the page title', async () => {
    render(<Page />);
    const titleElement = await screen.findByText('Next.js Enterprise Boilerplate');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the buttons', async () => {
    render(<Page />);
    const getStartedButton = await screen.findByText('Get started');
    const deployNowButton = await screen.findByText('Deploy Now');
    expect(getStartedButton).toBeInTheDocument();
    expect(deployNowButton).toBeInTheDocument();
  });

  it('renders the grid items', async () => {
    render(<Page />);
    const gridItems = [
      'Fast by default, with config optimized for performance',
      'A utility-first CSS framework for rapid UI development',
      'For clean, consistent, and error-free code',
      'With ultimate type safety',
      'Keep an eye on your bundle size',
      'For rock-solid unit and integration tests',
      'Write end-to-end tests like a pro',
      'Create, test, and showcase your components',
      'For confidence in your deployments',
      'Keep your commit history neat and tidy',
      'Open Telemetry integration for seamless monitoring',
      'No more spaghetti imports',
      'Kubernetes-compatible for robust deployments',
      'Headless UI components for endless customization',
      'Create a consistent, reusable, and atomic design system',
      'Auto-updating dependencies, so you can focus on coding',
      'Fix external dependencies without losing your mind',
      'A tool for managing component relationships',
      'Pre-configured actions for smooth workflows',
      'Stay on the cutting edge with AI-powered code reviews!',
      'Because performance matters',
      'For automatic changelog',
      'Manage your environment variables with ease',
    ];
    gridItems.forEach(async (item) => {
      const gridItemElement = await screen.findByText(item);
      expect(gridItemElement).toBeInTheDocument();
    });
  });
});
