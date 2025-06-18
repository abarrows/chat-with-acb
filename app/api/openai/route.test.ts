import { GET } from './route';
import { NextResponse } from 'next/server';
import consola from 'consola';

jest.mock('consola');
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe('GET', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a successful response', async () => {
    await GET();

    expect(NextResponse.json).toHaveBeenCalledWith({
      message: 'OpenAI route is working!',
    });
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Failed to fetch');
    consola.error.mockImplementationOnce(() => {
      throw error;
    });

    await GET();

    expect(consola.error).toHaveBeenCalledWith(
      new Error('Failed to fetch from OpenAI API:'),
      error,
    );
  });
});
