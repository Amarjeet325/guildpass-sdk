import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HttpClient } from '../src/http/httpClient';
import { GuildPassErrorCode } from '../src/errors/errorCodes';

describe('HttpClient', () => {
  const baseUrl = 'https://api.test.com';
  let client: HttpClient;

  beforeEach(() => {
    client = new HttpClient(baseUrl);
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should make GET request with correct URL and headers', async () => {
    const mockResponse = { data: 'test' };
    (fetch as any).mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponse),
      headers: new Headers(),
    });

    const result = await client.get('/test-path', { params: { foo: 'bar' } });

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/test-path?foo=bar'),
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      })
    );
  });

  it('should include API key in headers if provided', async () => {
    const clientWithKey = new HttpClient(baseUrl, 'secret-key');
    (fetch as any).mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({}),
      headers: new Headers(),
    });

    await clientWithKey.get('/test');

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'X-API-Key': 'secret-key',
        }),
      })
    );
  });

  it('should throw GuildPassError on non-ok response', async () => {
    (fetch as any).mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ error: 'Not Found' }),
    });

    try {
      await client.get('/not-found');
    } catch (error: any) {
      expect(error.code).toBe(GuildPassErrorCode.NOT_FOUND);
      expect(error.status).toBe(404);
    }
  });

  it('should throw TIMEOUT error on abort', async () => {
    (fetch as any).mockImplementation(() => {
      const error = new Error('AbortError');
      error.name = 'AbortError';
      return Promise.reject(error);
    });

    try {
      await client.get('/timeout');
    } catch (error: any) {
      expect(error.code).toBe(GuildPassErrorCode.TIMEOUT);
    }
  });
});
