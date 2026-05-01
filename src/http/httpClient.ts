import { GuildPassError } from '../errors/GuildPassError';
import { GuildPassErrorCode } from '../errors/errorCodes';
import { HttpRequestOptions, HttpResponse } from './http.types';

export class HttpClient {
  private readonly baseUrl: string;
  private readonly apiKey?: string;
  private readonly timeoutMs: number;

  constructor(baseUrl: string, apiKey?: string, timeoutMs = 10000) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    this.apiKey = apiKey;
    this.timeoutMs = timeoutMs;
  }

  public async get<T>(path: string, options?: Omit<HttpRequestOptions, 'method' | 'body'>): Promise<T> {
    const response = await this.request<T>(path, { ...options, method: 'GET' });
    return response.data;
  }

  public async post<T>(path: string, body?: any, options?: Omit<HttpRequestOptions, 'method' | 'body'>): Promise<T> {
    const response = await this.request<T>(path, { ...options, method: 'POST', body });
    return response.data;
  }

  private async request<T>(path: string, options: HttpRequestOptions = {}): Promise<HttpResponse<T>> {
    const { method = 'GET', headers = {}, body, params, timeoutMs = this.timeoutMs } = options;

    const url = new URL(`${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (this.apiKey) {
      requestHeaders['X-API-Key'] = this.apiKey;
    }

    try {
      const response = await fetch(url.toString(), {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = null;
        }
        throw GuildPassError.fromHttpError(response.status, errorData);
      }

      const data = await response.json();
      return {
        data,
        status: response.status,
        headers: response.headers,
      };
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw new GuildPassError(`Request timed out after ${timeoutMs}ms`, GuildPassErrorCode.TIMEOUT);
      }

      if (error instanceof GuildPassError) {
        throw error;
      }

      throw new GuildPassError(
        error.message || 'Unknown network error',
        GuildPassErrorCode.HTTP_ERROR,
        undefined,
        error
      );
    }
  }
}
