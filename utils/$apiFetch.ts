import { parseCookies } from 'h3';
import { useCookie, useRequestHeaders, useRuntimeConfig } from 'nuxt/app';

const CSRF_COOKIE = 'XSRF-TOKEN';
const CSRF_HEADER = 'X-XSRF-TOKEN';

/**
 * $apiFetch is a utility that can be used for interacting with your back end server.
 * It is automatically configured to retrieve a CSRF cookie from your server and sent it
 * with each subsequent request.
 */
export const $apiFetch = $fetch.create({
  credentials: 'include',
  async onRequest({ options }) {
    const { backendUrl, frontendUrl } = useRuntimeConfig().public;
    const event = typeof useEvent === 'function' ? useEvent() : null;
    let token = event ? parseCookies(event)[CSRF_COOKIE] : useCookie(CSRF_COOKIE).value;

    // on client initiate a csrf request and get it from the cookie set by laravel
    if (
      process.client &&
      ['post', 'delete', 'put', 'patch'].includes(options?.method?.toLowerCase() ?? '')
    ) {
      token = await initCsrf();
    }

    let headers: HeadersInit = {
      accept: 'application/json',
      ...options?.headers,
      ...(token && {
        [CSRF_HEADER]: token,
      }),
    };

    if (process.server) {
      const cookieString = event
        ? event.headers.get('cookie')
        : useRequestHeaders(['cookie']).cookie;

      headers = {
        ...headers,
        ...(cookieString && {
          cookie: cookieString,
        }),
        referer: frontendUrl,
      };
    }

    options.headers = headers;
    options.baseURL = backendUrl;
  },
  onResponseError({ response }) {
    const status = response.status;
    if ([500].includes(status)) {
      console.error('[API Error]', response.statusText, response._data);
    }
  },
});

const initCsrf = async (): Promise<string | undefined> => {
  const { backendUrl } = useRuntimeConfig().public;
  const existingToken = useCookie(CSRF_COOKIE).value;

  if (existingToken) {
    return existingToken;
  }

  await $fetch('/sanctum/csrf-cookie', {
    baseURL: backendUrl,
    credentials: 'include',
  });

  return useCookie<string | undefined>(CSRF_COOKIE).value;
};
