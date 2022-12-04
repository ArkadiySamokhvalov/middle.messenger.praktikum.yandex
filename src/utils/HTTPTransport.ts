enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type HTTPMethod = (
  url: string,
  options?: OptionsWithoutMethod
) => Promise<XMLHttpRequest>;

type Options = {
  method: METHOD;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export default class HTTPTransport {
  public get: HTTPMethod = (url, options = {}) => {
    const { data } = options;
    const newURL = data ? this._queryStringify(url, data) : url;

    return this._request(newURL, { ...options, method: METHOD.GET });
  };

  public post: HTTPMethod = (url, options = {}) => {
    return this._request(url, { ...options, method: METHOD.POST });
  };

  public put: HTTPMethod = (url, options = {}) => {
    return this._request(url, { ...options, method: METHOD.PUT });
  };

  public putch: HTTPMethod = (url, options = {}) => {
    return this._request(url, { ...options, method: METHOD.PATCH });
  };

  public delete: HTTPMethod = (url, options = {}) => {
    return this._request(url, { ...options, method: METHOD.DELETE });
  };

  private _queryStringify(url: string, data: Record<string, unknown>): URL {
    if (typeof data !== 'object') {
      throw new Error('data должен быть объектом');
    }

    const newURL = new URL(url);

    Object.entries(data).forEach(([key, val]) => {
      newURL.searchParams.set(key, `${val}`);
    });

    return newURL;
  }

  private _request(
    url: string | URL,
    options: Options = { method: METHOD.GET }
  ): Promise<XMLHttpRequest> {
    const { method, data, headers, timeout } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.timeout = timeout ? timeout : 5000;
      xhr.onload = () =>
        (xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr);
          }
        });

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (headers) {
        Object.entries(headers).forEach(([key, val]) => {
          xhr.setRequestHeader(key, `${val}`);
        });
      }

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
