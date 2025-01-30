import { GET } from './route';
import { NextResponse } from 'next/server';
import { Version3Client } from 'jira.js';
import consola from 'consola';

jest.mock('jira.js');
jest.mock('consola');
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe('GET', () => {
  let clientMock;

  beforeEach(() => {
    clientMock = {
      issueSearch: {
        searchForIssuesUsingJql: jest.fn(),
      },
    };
    Version3Client.mockImplementation(() => clientMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and normalize data from Jira API', async () => {
    const mockIssues = [
      {
        id: '123',
        key: 'key123',
        fields: {
          summary: 'summary',
          description: 'description',
          labels: ['label1'],
        },
        url: 'url',
      },
    ];

    clientMock.issueSearch.searchForIssuesUsingJql.mockResolvedValue({
      issues: mockIssues,
    });

    await GET();

    expect(clientMock.issueSearch.searchForIssuesUsingJql).toHaveBeenCalledWith({
      jql: 'labels="acb-review"',
      maxResults: 100,
      fields: ['*navigable'],
    });

    expect(NextResponse.json).toHaveBeenCalledWith([
      {
        id: '123',
        itemId: '123',
        key: 'key123',
        url: `${process.env.CONFLUENCE_DOMAIN}/url`,
        title: 'summary',
        excerpt: 'summary',
        body: 'description',
        labels: [
          { name: 'label1', categoryId: 3 },
        ],
      },
    ]);
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Failed to fetch');
    clientMock.issueSearch.searchForIssuesUsingJql.mockRejectedValue(error);

    await GET();

    expect(consola.error).toHaveBeenCalledWith(
      new Error(`Failed to fetch from Jira API:`),
      error,
    );
  });
});
