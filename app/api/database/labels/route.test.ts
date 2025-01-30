import { GET } from './route';
import { NextResponse } from 'next/server';
import { DatabaseClient } from 'database.js';
import consola from 'consola';
import labelsData from '@/data/labels/data.json';

jest.mock('database.js');
jest.mock('consola');
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));
jest.mock('@/data/labels/data.json', () => ({
  labels: [
    {
      labelId: '123',
      name: 'label1',
    },
  ],
}));

describe('GET', () => {
  let clientMock;

  beforeEach(() => {
    clientMock = {
      labels: {
        getLabels: jest.fn(),
      },
    };
    DatabaseClient.mockImplementation(() => clientMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return labels from the database', async () => {
    const mockLabels = [
      {
        labelId: '123',
        name: 'label1',
      },
    ];

    clientMock.labels.getLabels.mockResolvedValue(mockLabels);

    await GET();

    expect(clientMock.labels.getLabels).toHaveBeenCalled();

    expect(NextResponse.json).toHaveBeenCalledWith(mockLabels);
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Failed to fetch');
    clientMock.labels.getLabels.mockRejectedValue(error);

    await GET();

    expect(consola.error).toHaveBeenCalledWith(
      new Error(`Failed to fetch labels from database:`),
      error,
    );
  });
});
