enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
};

type Options = {
  method: METHOD;
  data?: any;
  headers?: Record<string, string>,
  timeout?: number;
  retries?: number;
}

type OptionsWithoutMethod = Omit<Options, 'method'>;

export default class HTTPTransport {
  public get(url: string,  options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    const { data } = options;
    const newURL = (data) ? this.queryStringify(url, data) : url;

    return this.request(newURL, {...options, method: METHOD.GET});
  }

  public post(url: string | URL,  options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.POST});
  }

  public put(url: string | URL,  options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.PUT});
  }

  public putch(url: string | URL,  options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.PATCH});
  }

  public delete(url: string | URL,  options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.DELETE});
  }

  // public fetchWithRetry(url: string | URL, options: Options = { method: METHOD.GET }) {
  //   const self = this;
  //   const { method, retries = 1 } = options;

  //   function onError(err) {
  //     const triesLeft = retries - 1;

  //     if (!triesLeft) {
  //       throw err;
  //     }

  //     return self.fetchWithRetry(url, { ...options, retries: triesLeft });
  //   }

  //   const fetch = new HTTPTransport();

  //   switch (method) {
  //     case METHOD.GET:
  //       return fetch.get(url, options).catch(onError);
  //     case METHOD.POST:
  //       return fetch.post(url, options).catch(onError);
  //     case METHOD.PUT:
  //       return fetch.put(url, options).catch(onError);
  //     case METHOD.DELETE:
  //       return fetch.delete(url, options).catch(onError);
  //   }
  // }

  private queryStringify(url: string, data: Record<string, any>): URL {
    if (typeof data !== "object") {
      throw new Error('data должен быть объектом');
    }

    const newURL = new URL(url);

    Object.entries(data).forEach(([key, val]) => {
      newURL.searchParams.set(key, `${val}`);
    });

    return newURL;

    // const parametres = Object.entries(data).reduce((acc, [key, val], index) => (`${acc}${index === 0 ? '' : '&'}${key}=${val}`), '');

    // return `${url}?${parametres}`;
  }

  private request(url: string | URL, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
    const { method, data, headers, timeout } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.timeout = (timeout) ? timeout : 5000;
      xhr.onload = () => xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        }
      }

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
