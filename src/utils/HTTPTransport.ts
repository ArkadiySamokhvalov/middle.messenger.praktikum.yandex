enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get<Response>(
    path = '/',
    options: OptionsWithoutMethod = {}
  ): Promise<Response> {
    const { data = null } = options;
    const url = this.endpoint + path;
    const newURL = data ? this._queryStringify(url, data) : url;
    return this._request<Response>(newURL, { ...options, method: METHOD.GET });
  }

  public post<Response = void>(
    path = '/',
    options: OptionsWithoutMethod = {}
  ): Promise<Response> {
    const url = this.endpoint + path;
    return this._request<Response>(url, { ...options, method: METHOD.POST });
  }

  public put<Response = void>(path = '/', options = {}): Promise<Response> {
    const url = this.endpoint + path;
    return this._request<Response>(url, { ...options, method: METHOD.PUT });
  }

  public putch<Response = void>(path = '/', options = {}): Promise<Response> {
    const url = this.endpoint + path;
    return this._request<Response>(url, { ...options, method: METHOD.PATCH });
  }

  public delete<Response>(path = '/', options = {}): Promise<Response> {
    const url = this.endpoint + path;
    return this._request<Response>(url, { ...options, method: METHOD.DELETE });
  }

  private _queryStringify(url: string, data: Record<string, unknown>): URL {
    if (typeof data !== 'object') {
      throw new Error('data must be an object');
    }

    const newURL = new URL(url);

    Object.entries(data).forEach(([key, val]) => {
      newURL.searchParams.set(key, `${val}`);
    });

    return newURL;
  }

  private _request<Response>(
    url: string | URL,
    options: Options = { method: METHOD.GET }
  ): Promise<Response> {
    const { method, data, headers, timeout } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.timeout = timeout ? timeout : 5000;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (headers) {
        Object.entries(headers).forEach(([key, val]) => {
          xhr.setRequestHeader(key, `${val}`);
        });
      }

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        if (!(data instanceof FormData)) {
          xhr.send(JSON.stringify(data));
        } else {
          xhr.send(data);
        }
      }
    });
  }
}
