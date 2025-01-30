import { GET } from './route';

describe('GET', () => {
  it('should return status ok', async () => {
    const response = await GET();
    const data = await response.json();
    expect(data).toEqual({ status: 'ok' });
  });
});
