import { fetch } from 'node-fetch';
import serviceRouteHandler from './serviceRouteHandler';

jest.mock('node-fetch', () => jest.fn());

describe('serviceRouteHandler', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return data when the request is successful', async () => {
    const mockData = { key: 'value' };
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockData,
    });

    const data = await serviceRouteHandler('api/test', 'query=test');
    expect(data).toEqual(mockData);
  });

  it('should return null when the request fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const data = await serviceRouteHandler('api/test', 'query=test');
    expect(data).toBeNull();
  });

  it('should return null when the response status is 204', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 204,
    });

    const data = await serviceRouteHandler('api/test', 'query=test');
    expect(data).toBeNull();
  });

  it('should throw an error when fetch throws an error', async () => {
    fetch.mockRejectedValueOnce(new Error('Fetch error'));

    await expect(serviceRouteHandler('api/test', 'query=test')).rejects.toThrow(
      'Fetch error',
    );
  });

  it('should return null if path is not provided', async () => {
    const data = await serviceRouteHandler('', 'query=test');
    expect(data).toBeNull();
  });
});
