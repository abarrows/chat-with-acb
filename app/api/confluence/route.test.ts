import { GET } from './route';
import { NextResponse } from 'next/server';
import { ConfluenceClient } from 'confluence.js';
import consola from 'consola';
import trainingItems from '@/data/training/gpt-recommendations/data.json';

jest.mock('confluence.js');
jest.mock('consola');
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));
jest.mock('@/data/training/gpt-recommendations/data.json', () => ({
  items: [
    {
      itemId: '123',
      proficiencies: ['proficiency1'],
      tools: ['tool1'],
      advancedSkills: ['skill1'],
    },
  ],
}));

describe('GET', () => {
  let clientMock;

  beforeEach(() => {
    clientMock = {
      search: {
        searchByCQL: jest.fn(),
      },
      content: {
        getContentById: jest.fn(),
      },
    };
    ConfluenceClient.mockImplementation(() => clientMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and normalize data from Confluence API', async () => {
    const mockResults = [
      {
        content: { id: '123' },
        resultGlobalContainer: { displayUrl: 'displayUrl' },
        url: 'url',
        title: 'title',
        excerpt: 'excerpt',
      },
    ];
    const mockContent = {
      body: { view: { value: 'body' } },
      metadata: { labels: { results: [{ name: 'label' }] } },
    };

    clientMock.search.searchByCQL.mockResolvedValue({ results: mockResults });
    clientMock.content.getContentById.mockResolvedValue(mockContent);

    await GET();

    expect(clientMock.search.searchByCQL).toHaveBeenCalledWith({
      cql: `${process.env.CONFLUENCE_API_QUERY}`,
      limit: 210,
      expand: ['body.view', 'metadata.labels'],
    });

    expect(clientMock.content.getContentById).toHaveBeenCalledWith({
      id: '123',
      expand: ['body.view', 'metadata.labels'],
    });

    expect(NextResponse.json).toHaveBeenCalledWith([
      {
        id: 0,
        itemId: '123',
        key: 'displayUrl',
        url: `${process.env.CONFLUENCE_DOMAIN}/wiki/url`,
        title: 'title',
        excerpt: 'excerpt',
        body: 'body',
        labels: [
          { name: 'proficiency1', categoryId: 0 },
          { name: 'tool1', categoryId: 1 },
          { name: 'skill1', categoryId: 2 },
          { name: 'label', categoryId: 3 },
        ],
      },
    ]);
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Failed to fetch');
    clientMock.search.searchByCQL.mockRejectedValue(error);

    await GET();

    expect(consola.error).toHaveBeenCalledWith(
      new Error(`Failed to fetch from confluence API:`),
      error,
    );
  });
});
