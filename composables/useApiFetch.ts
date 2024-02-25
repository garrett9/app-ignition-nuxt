import { navigateTo, useFetch, type UseFetchOptions } from 'nuxt/app';

import { $apiFetch } from '../utils/$apiFetch';

export const useApiFetch = <T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {}
): ReturnType<typeof useFetch> => {
  return useFetch(url, {
    $fetch: $apiFetch,
    onResponseError({ response }) {
      const status = response.status;
      if ([500].includes(status)) {
        console.error('[Laravel Error]', response.statusText, response._data);
      }

      if ([401, 419].includes(status)) {
        navigateTo('/login');
      }

      if ([409].includes(status)) {
        navigateTo('/verify-email');
      }
    },
    ...options,
  });
};
