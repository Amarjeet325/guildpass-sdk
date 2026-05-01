export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type HttpRequestOptions = {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string | number | boolean>;
  timeoutMs?: number;
};

export type HttpResponse<T = any> = {
  data: T;
  status: number;
  headers: Headers;
};
