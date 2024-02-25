import { FetchError } from 'ofetch';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (error) => {
    if (!(error instanceof FetchError)) {
      throw error;
    }

    const status = error.response?.status ?? -1;

    if ([401, 419].includes(status)) {
      navigateTo('/login');
    }

    if ([409].includes(status)) {
      navigateTo('/verify-email');
    }
  });
});
